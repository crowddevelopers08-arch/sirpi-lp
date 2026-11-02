import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { dateRanges, filterQuery, leadWhere, parseLeadFilters, startOfDayInIndia } from "@/lib/lead-filters";
import { NOT_INTERESTED_CATEGORY, OUTSTATION_CATEGORY } from "@/lib/form-options";
import AutoRefresh from "./AutoRefresh";

export const metadata: Metadata = { title: "Leads | Sirpi Aesthetics Hair Transplant", robots: { index: false, follow: false } };

// Always read fresh rows — this page is a live view of the database.
export const dynamic = "force-dynamic";

const BASE = "/hair-transplant/admin";
const PAGE_SIZE = 50;
const dateFormat = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric" });
const timeFormat = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });

const fieldClass = "h-10 w-full rounded-lg border border-[#1f0a14]/15 bg-white px-3 text-sm outline-none transition-colors focus:border-[#6A113D] focus:ring-3 focus:ring-[#6A113D]/15";
const labelClass = "mb-1.5 block text-xs font-medium text-[#1f0a14]/60";

const COLUMNS = ["Date", "Name", "Phone", "City", "Hair loss concern", "Investment range", "Travel to Coimbatore", "Considering for", "Stopping them", "Preferred call", "Category"];

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // Without a connection string the pg driver fails with a cryptic SASL
  // "password must be a string" error — say what is actually missing instead.
  if (!process.env.DATABASE_URL) {
    return (
      <main className="grid min-h-svh place-items-center bg-[#f7f5f6] px-6 text-center text-[#1f0a14]">
        <div className="max-w-md rounded-2xl border border-[#1f0a14]/10 bg-white p-8 shadow-[0_1px_2px_#0000000a]">
          <p className="text-lg font-semibold text-[#6A113D]">Database not connected</p>
          <p className="mt-2 text-sm leading-relaxed text-[#1f0a14]/70">
            Set <code className="rounded bg-[#1f0a14]/5 px-1">DATABASE_URL</code> in <code className="rounded bg-[#1f0a14]/5 px-1">.env</code> (and in
            Vercel&rsquo;s environment variables), run <code className="rounded bg-[#1f0a14]/5 px-1">npm run db:push</code> once, then restart the server.
          </p>
        </div>
      </main>
    );
  }

  const params = await searchParams;
  const filters = parseLeadFilters(params);
  const where = leadWhere(filters);
  const page = Math.max(1, Number(params.page) || 1);
  const activeFilters = [...filterQuery(filters).keys()].length;

  const [total, today, comfortable, outstationCount, notInterestedCount, matching, leads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: startOfDayInIndia() } } }),
    prisma.lead.count({ where: { locationComfortable: true } }),
    prisma.lead.count({ where: { category: OUTSTATION_CATEGORY } }),
    prisma.lead.count({ where: { category: NOT_INTERESTED_CATEGORY } }),
    prisma.lead.count({ where }),
    prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE }),
  ]);
  const pages = Math.max(1, Math.ceil(matching / PAGE_SIZE));
  const query = filterQuery(filters);
  const pageLink = (target: number) => `${BASE}?${new URLSearchParams([...query, ["page", String(target)]])}`;
  const exportHref = `${BASE}/export${query.size ? `?${query}` : ""}`;

  const stats = [
    { label: "Total leads", value: total, accent: "bg-[#1f0a14]" },
    { label: "Today", value: today, accent: "bg-[#6A113D]" },
    { label: "Can travel to Coimbatore", value: comfortable, accent: "bg-green-500" },
    { label: "Outstation – interested", value: outstationCount, accent: "bg-[#ED575C]" },
    { label: "Not interested", value: notInterestedCount, accent: "bg-[#1f0a14]/40" },
  ];
  const selects = [
    { name: "range", label: "Date", value: filters.range, all: "All time", options: dateRanges },
    { name: "location", label: "Travel", value: filters.location, all: "All", options: [["yes", "Can travel"], ["no", "Outstation"]] as const },
  ];

  return (
    <main className="min-h-svh bg-[#f7f5f6] text-[#1f0a14]">
      <header className="sticky top-0 z-20 bg-[#6A113D]">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-8">
          <div className="flex items-center gap-4">
            <Image src="/CIRCLE-STICKER-LOGO.png" alt="Sirpi Aesthetics" width={1029} height={402} priority className="h-11 w-auto" />
            <span className="hidden border-l border-white/25 pl-4 text-sm font-semibold text-white/80 lg:block">Hair transplant leads</span>
          </div>
          <div className="flex items-center gap-3 [&_.text-\[\#1f0a14\]\/60]:text-white/70">
            <AutoRefresh seconds={15} />
            <a href={exportHref} className="flex h-10 items-center gap-2 rounded-full bg-[#ED575C] px-4 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-[#F48286]" aria-label="Download CSV">
              <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
              <span className="max-sm:sr-only">Download CSV</span>
            </a>
          </div>
        </div>
      </header>

      <div className="space-y-6 px-4 py-8 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Hair transplant consultation leads</h1>
          <p className="mt-1 text-sm text-[#1f0a14]/60">Every submission from the Sirpi Aesthetics hair transplant form.</p>
        </div>

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-5" aria-label="Summary">
          {stats.map(stat => <div key={stat.label} className="relative overflow-hidden rounded-2xl border border-[#1f0a14]/8 bg-white p-5 shadow-[0_1px_2px_#0000000a]">
            <span className={`absolute inset-y-0 left-0 w-1 ${stat.accent}`} aria-hidden="true" />
            <p className="text-sm text-[#1f0a14]/60">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">{stat.value}</p>
          </div>)}
        </section>

        <form action={BASE} className="flex flex-wrap items-end gap-3 rounded-2xl border border-[#1f0a14]/8 bg-white p-4 shadow-[0_1px_2px_#0000000a]" aria-label="Filter leads">
          <label className="min-w-[220px] flex-1">
            <span className={labelClass}>Search</span>
            <span className="relative block">
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 fill-none stroke-[#1f0a14]/40 stroke-2 [stroke-linecap:round]" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input name="q" defaultValue={filters.q} placeholder="Name, phone or city" className={`${fieldClass} pl-9`} />
            </span>
          </label>
          {selects.map(select => <label key={select.name} className="w-full sm:w-48">
            <span className={labelClass}>{select.label}</span>
            <select name={select.name} defaultValue={select.value} className={`${fieldClass} cursor-pointer pr-8`}>
              <option value="">{select.all}</option>
              {select.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>)}
          <div className="flex gap-2">
            <button type="submit" className="h-10 cursor-pointer rounded-lg bg-[#6A113D] px-5 text-sm font-semibold text-white hover:bg-[#571032]">Apply</button>
            {activeFilters > 0 && <Link href={BASE} className="flex h-10 items-center rounded-lg border border-[#1f0a14]/15 px-4 text-sm font-medium hover:border-[#6A113D] hover:text-[#6A113D]">Clear</Link>}
          </div>
        </form>

        <section className="overflow-hidden rounded-2xl border border-[#1f0a14]/8 bg-white shadow-[0_1px_2px_#0000000a]" aria-label="Leads">
          <div className="flex items-center justify-between gap-3 border-b border-[#1f0a14]/8 px-5 py-3.5">
            <h2 className="text-sm font-semibold">{activeFilters ? `${matching} of ${total} leads` : `${total} leads`}</h2>
            {pages > 1 && <span className="text-xs text-[#1f0a14]/50">Page {page} of {pages}</span>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px] text-left text-sm">
              <thead className="bg-[#1f0a14]/[.025] text-xs text-[#1f0a14]/55">
                <tr>{COLUMNS.map(h => <th key={h} className="max-w-[220px] px-4 py-3 align-bottom font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-[#1f0a14]/[.06]">
                {leads.map(lead => {
                  const outstation = lead.category === OUTSTATION_CATEGORY;
                  const notInterested = lead.category === NOT_INTERESTED_CATEGORY;
                  const badge = notInterested
                    ? { text: "Not interested", pill: "bg-[#1f0a14]/[.06] text-[#1f0a14]/70", dot: "bg-[#1f0a14]/40" }
                    : outstation
                      ? { text: "Outstation – interested", pill: "bg-[#FDEEEE] text-[#A52D5B]", dot: "bg-[#ED575C]" }
                      : { text: "Standard", pill: "bg-green-50 text-green-700", dot: "bg-green-500" };
                  return <tr key={lead.id} className="align-top transition-colors hover:bg-[#FFF8FA]">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="block font-medium">{dateFormat.format(lead.createdAt)}</span>
                      <span className="text-xs text-[#1f0a14]/50">{timeFormat.format(lead.createdAt)}</span>
                    </td>
                    <td className="px-4 py-3.5 font-medium">{lead.name}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap"><a href={`tel:${lead.phone}`} className="font-medium text-[#6A113D] hover:underline">{lead.phone}</a></td>
                    <td className="px-4 py-3.5">{lead.city || <span className="text-[#1f0a14]/30">—</span>}</td>
                    <td className="max-w-[220px] px-4 py-3.5 text-[#1f0a14]/80">{lead.hairLoss}</td>
                    <td className="max-w-[220px] px-4 py-3.5 text-[#1f0a14]/80">{lead.budget}</td>
                    <td className="max-w-[240px] px-4 py-3.5 text-[#1f0a14]/80">
                      {lead.travel}
                      {lead.travelReason && <span className="mt-1 block text-xs text-[#1f0a14]/55">Reason: {lead.travelReason} · Consider: {lead.travelConsider}</span>}
                    </td>
                    <td className="max-w-[200px] px-4 py-3.5 text-[#1f0a14]/80">{lead.considering ?? <span className="text-[#1f0a14]/30">—</span>}</td>
                    <td className="max-w-[220px] px-4 py-3.5 text-[#1f0a14]/80">{lead.barrier ?? <span className="text-[#1f0a14]/30">—</span>}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-[#1f0a14]/80">{lead.callDate ?? "—"}<span className="block text-xs text-[#1f0a14]/55">{lead.callSlot ?? ""}</span></td>
                    <td className="px-4 py-3.5"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${badge.pill}`}><span className={`size-1.5 rounded-full ${badge.dot}`} aria-hidden="true" />{badge.text}</span></td>
                  </tr>;
                })}
                {leads.length === 0 && <tr><td colSpan={COLUMNS.length} className="px-4 py-16 text-center">
                  <p className="font-medium">{activeFilters ? "No leads match these filters" : "No leads yet"}</p>
                  <p className="mt-1 text-sm text-[#1f0a14]/50">{activeFilters ? "Try removing a filter or widening the dates." : "New form submissions will appear here automatically."}</p>
                </td></tr>}
              </tbody>
            </table>
          </div>
          {pages > 1 && <nav className="flex items-center justify-between gap-3 border-t border-[#1f0a14]/8 px-5 py-3 text-sm" aria-label="Pagination">
            <span className="text-[#1f0a14]/60">Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, matching)} of {matching}</span>
            <div className="flex gap-2">
              {page > 1 && <Link href={pageLink(page - 1)} className="rounded-lg border border-[#1f0a14]/15 px-3 py-1.5 font-medium hover:border-[#6A113D] hover:text-[#6A113D]">← Previous</Link>}
              {page < pages && <Link href={pageLink(page + 1)} className="rounded-lg border border-[#1f0a14]/15 px-3 py-1.5 font-medium hover:border-[#6A113D] hover:text-[#6A113D]">Next →</Link>}
            </div>
          </nav>}
        </section>
      </div>
    </main>
  );
}
