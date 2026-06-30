import { NextResponse } from "next/server";

type DataDeletionPayload = {
  name?: string;
  accountType?: string;
  phone?: string;
  email?: string;
  scope?: string;
  reason?: string;
  details?: string;
};

async function forwardToWebhook(kind: string, payload: Record<string, unknown>) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return { delivered: false };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, payload, submittedAt: new Date().toISOString() })
  });

  if (!response.ok) {
    throw new Error("Configured contact webhook rejected the request.");
  }

  return { delivered: true };
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as DataDeletionPayload | null;

  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const accountType = payload.accountType?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const scope = payload.scope?.trim() ?? "";

  if (!name || !accountType || !phone || !scope) {
    return NextResponse.json({ error: "Name, account type, phone, and deletion scope are required." }, { status: 400 });
  }

  const reference = `TRD-DEL-${Date.now().toString().slice(-8).toUpperCase()}`;

  try {
    const delivery = await forwardToWebhook("data-deletion", { ...payload, reference });
    return NextResponse.json({ ok: true, reference, ...delivery });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit data deletion request." },
      { status: 502 }
    );
  }
}
