import { prisma } from "@/lib/prisma";
import { leadWhere, parseLeadFilters } from "@/lib/lead-filters";

// Quote every cell, and neutralise leading = + - @ so spreadsheets don't run them as formulas
// (plain numbers like "+91 98765 43210" are left alone).
const cell = (value: string) => `"${value.replace(/^[=@]|^[+-](?![\d\s()-]+$)/, "'$&").replace(/"/g, '""')}"`;

export const dynamic = "force-dynamic";

// Exports the same leads the dashboard is currently filtered to.
export async function GET(request: Request) {
  const filters = parseLeadFilters(Object.fromEntries(new URL(request.url).searchParams));
  const leads = await prisma.lead.findMany({ where: leadWhere(filters), orderBy: { createdAt: "desc" } });
  const rows = [
    [
      "Date", "Name", "Phone", "City",
      "Hair loss concern", "Investment range", "Travel to Coimbatore",
      "Reason unable to travel", "Would consider travelling", "Wants information",
      "Considering for", "Stopping them", "Preferred date", "Preferred time", "Category", "Page URL",
    ],
    ...leads.map(lead => [
      lead.createdAt.toISOString(), lead.name, lead.phone, lead.city,
      lead.hairLoss, lead.budget, lead.travel,
      lead.travelReason ?? "", lead.travelConsider ?? "", lead.travelInfo ?? "",
      lead.considering ?? "", lead.barrier ?? "", lead.callDate ?? "", lead.callSlot ?? "", lead.category, lead.pageUrl ?? "",
    ]),
  ];
  const csv = "﻿" + rows.map(row => row.map(cell).join(",")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="sirpi-hair-transplant-leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
