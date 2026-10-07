import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'Sirpi-Aesthetics-Leads.csv');
const HEADERS = [
  'Timestamp',
  'Source',
  'Name',
  'Phone',
  'Email',
  'City',
  'Concern',
  'URL',
  'TeleCRM',
];

export const runtime = 'nodejs';

type SubmissionBody = {
  source: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  concern: string;
  pageUrl: string;
  rating: string;
  callback: string;
};

type TelecrmResponse = Record<string, unknown> & {
  synced?: boolean;
  statusCode?: number;
  leadId?: unknown;
  note?: string;
};

function toText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeSubmission(body: Record<string, unknown>): SubmissionBody {
  return {
    source: toText(body.source) || 'Sirpi Aesthetics Website',
    name: toText(body.name),
    phone: toText(body.phone),
    email: toText(body.email),
    city: toText(body.city),
    concern: toText(body.concern),
    pageUrl: toText(body.pageUrl),
    rating: toText(body.rating),
    callback: toText(body.callback),
  };
}

const REVIEW_SOURCE = 'Review Page';

// Column shape for the separate "review leads" tab in the Google Sheet.
const REVIEW_HEADERS = [
  'Timestamp',
  'Source',
  'Name',
  'Phone',
  'Rating',
  'Callback',
  'Message',
  'URL',
  'TeleCRM',
];

// The review page packs rating/callback into `concern`; strip that tail so the
// review tab can show the customer's message on its own.
function stripRatingSuffix(concern: string): string {
  return concern.split(' | Rating:')[0].trim();
}

function csvEscape(value: string): string {
  const safeValue = value.replace(/\r?\n/g, ' ');
  if (/[",\n]/.test(safeValue)) return `"${safeValue.replace(/"/g, '""')}"`;
  return safeValue;
}

function rowToCsv(row: string[]) {
  return row.map(csvEscape).join(',');
}

function ensureCsvFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, `${rowToCsv(HEADERS)}\n`, 'utf8');
  }
}

function appendLocalRow(row: string[]) {
  ensureCsvFile();
  fs.appendFileSync(FILE_PATH, `${rowToCsv(row)}\n`, 'utf8');
}

function getSheetWebhookUrl() {
  return (
    process.env.GOOGLE_SHEETS_URL ||
    process.env.GOOGLE_APPS_SCRIPT_URL ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_GAS_URL ||
    process.env.YOUR_GOOGLE_SHEET_ID ||
    ''
  ).trim();
}

async function pushToSheet(body: SubmissionBody, timestamp: string, telecrmStatus: string) {
  const url = getSheetWebhookUrl();
  if (!url) return null;

  const isReview = body.source === REVIEW_SOURCE;

  const row = [
    timestamp,
    body.source,
    body.name,
    body.phone,
    body.email,
    body.city,
    body.concern,
    body.pageUrl,
    telecrmStatus,
  ];

  // Review leads land on their own tab, so they get their own column shape.
  const reviewRow = [
    timestamp,
    body.source,
    body.name,
    body.phone,
    body.rating,
    body.callback,
    stripRatingSuffix(body.concern),
    body.pageUrl,
    telecrmStatus,
  ];

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      timestamp,
      source: body.source,
      name: body.name,
      phone: body.phone,
      email: body.email,
      city: body.city,
      concern: body.concern,
      message: stripRatingSuffix(body.concern),
      pageUrl: body.pageUrl,
      url: body.pageUrl,
      telecrm: telecrmStatus,
      rating: body.rating,
      callback: body.callback,
      isReview,
      headers: HEADERS,
      reviewHeaders: REVIEW_HEADERS,
      row,
      reviewRow,
    }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Google Apps Script failed with ${res.status}: ${text}`);
  return text;
}

function normalizePhoneForTeleCRM(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function isTelecrmConfirmed(data: unknown) {
  if (!data || typeof data !== 'object') return false;

  const record = data as Record<string, unknown>;
  if (Array.isArray(record.modifiedLeadIds) && record.modifiedLeadIds.length > 0) return true;
  if (Array.isArray(record.leadIds) && record.leadIds.length > 0) return true;
  if (record.leadId || record.id || record.LeadID) return true;

  // nested data object (e.g. { success: true, data: { leadId: "..." } })
  if (record.data && typeof record.data === 'object') {
    const nested = record.data as Record<string, unknown>;
    if (nested.leadId || nested.id || nested.LeadID) return true;
  }

  // boolean success flag
  if (record.success === true) return true;

  const status = String(record.status || '').toLowerCase();
  return status === 'created' || status === 'updated' || status === 'success' || status === '200';
}

async function pushToTeleCRM(body: SubmissionBody): Promise<TelecrmResponse | null> {
  const url = process.env.TELECRM_API_URL;
  const key = process.env.TELECRM_API_KEY;
  if (!url || !key) return null;

  const phone = normalizePhoneForTeleCRM(body.phone);
  if (!phone) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const fields: Record<string, string> = { phone, name: body.name };

  const isReview = body.source === REVIEW_SOURCE;
  const ratingText = body.rating ? `${body.rating}/5` : 'Not specified';
  const callbackText = body.callback || 'Not specified';

  const details = [
    `Form Name: ${body.source || 'Website'}`,
    `Name: ${body.name || 'Not specified'}`,
    `Phone: ${body.phone || 'Not specified'}`,
    ...(isReview
      ? [`Rating: ${ratingText}`, `Callback Requested: ${callbackText}`]
      : [`Email: ${body.email || 'Not specified'}`, `City: ${body.city || 'Not specified'}`]),
    `Concern: ${body.concern || 'Not specified'}`,
    `URL: ${body.pageUrl || 'Not specified'}`,
  ].join(' | ');

  const payload = {
    fields,
    actions: [
      { type: 'SYSTEM_NOTE', text: `Details: ${details}` },
      { type: 'SYSTEM_NOTE', text: `Form Name: ${body.source || 'Website'}` },
      { type: 'SYSTEM_NOTE', text: `Name: ${body.name || 'Not specified'}` },
      { type: 'SYSTEM_NOTE', text: `Phone: ${body.phone || 'Not specified'}` },
      ...(isReview
        ? [
            { type: 'SYSTEM_NOTE', text: `Rating: ${ratingText}` },
            { type: 'SYSTEM_NOTE', text: `Callback Requested: ${callbackText}` },
          ]
        : [
            { type: 'SYSTEM_NOTE', text: `Email: ${body.email || 'Not specified'}` },
            { type: 'SYSTEM_NOTE', text: `City: ${body.city || 'Not specified'}` },
          ]),
      { type: 'SYSTEM_NOTE', text: `Condition: ${body.concern || 'Not specified'}` },
      { type: 'SYSTEM_NOTE', text: `URL: ${body.pageUrl || 'Not specified'}` },
    ],
  };

  console.log('[TeleCRM] Sending payload:', JSON.stringify(payload));

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        Accept: 'application/json',
        'X-Client-ID': 'nextjs-website-integration',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.status === 204) {
      console.log('[TeleCRM] Response: 204 No Content (lead accepted)');
      return {
        synced: true,
        statusCode: 204,
        note: 'TeleCRM accepted lead (204)',
      };
    }

    const text = await res.text();
    if (!text.trim()) {
      return { synced: false, statusCode: res.status, note: 'Empty TeleCRM response' };
    }

    let data: TelecrmResponse;
    try {
      data = JSON.parse(text) as TelecrmResponse;
    } catch {
      console.warn('[TeleCRM] Non-JSON response:', res.status, text.slice(0, 300));
      return {
        synced: false,
        statusCode: res.status,
        note: 'Non-JSON TeleCRM response',
      };
    }

    console.log('[TeleCRM] Response:', res.status, JSON.stringify(data));
    const confirmed = res.ok && isTelecrmConfirmed(data);
    return {
      ...data,
      synced: confirmed,
      statusCode: res.status,
      leadId: data.leadId || data.id || data.LeadID || null,
      note: confirmed ? 'TeleCRM did not confirm lead creation' : 'TeleCRM lead confirmed',
    };
  } catch (err) {
    clearTimeout(timeout);
    const message = err instanceof Error ? err.message : String(err);
    return { synced: false, note: 'TeleCRM fetch failed', error: message };
  }
}

function getTelecrmStatus(result: TelecrmResponse | null) {
  if (!result) return 'Not configured';
  if (result.synced) return `Synced${result.leadId ? ` (${String(result.leadId)})` : ''}`;
  return result.note || `Failed${result.statusCode ? ` (${result.statusCode})` : ''}`;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const body = normalizeSubmission(rawBody);

    if (!body.name || !body.phone || !body.concern) {
      return NextResponse.json(
        { success: false, error: 'Name, phone, and concern are required' },
        { status: 400 },
      );
    }

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const telecrmResult = await pushToTeleCRM(body);
    const telecrmStatus = getTelecrmStatus(telecrmResult);
    const row = [
      timestamp,
      body.source,
      body.name,
      body.phone,
      body.email,
      body.city,
      body.concern,
      body.pageUrl,
      telecrmStatus,
    ];

    try {
      appendLocalRow(row);
    } catch (csvErr) {
      console.warn('Local CSV save skipped:', (csvErr as Error).message);
    }

    let excelStatus = getSheetWebhookUrl() ? 'failed' : 'not_configured';
    let excelError = '';
    try {
      const sheetResult = await pushToSheet(body, timestamp, telecrmStatus);
      if (sheetResult !== null) excelStatus = 'synced';
    } catch (gasErr) {
      excelError = (gasErr as Error).message;
      console.warn('Google Apps Script sync skipped:', excelError);
    }

    return NextResponse.json({
      success: true,
      excel: excelStatus,
      excelError,
      telecrm: telecrmResult,
    });
  } catch (err) {
    console.error('Submission error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    ensureCsvFile();
    const buffer = fs.readFileSync(FILE_PATH);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="submissions_${Date.now()}.csv"`,
      },
    });
  } catch (err) {
    console.error('Download error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}