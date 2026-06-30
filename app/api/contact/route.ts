import { NextResponse } from "next/server";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  topic?: string;
  message?: string;
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

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
  const payload = (await request.json().catch(() => null)) as ContactPayload | null;

  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const firstName = payload.firstName?.trim() ?? "";
  const lastName = payload.lastName?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const topic = payload.topic?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!firstName || !lastName || !email || !topic || !message) {
    return NextResponse.json({ error: "All contact fields are required." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const delivery = await forwardToWebhook("contact", { firstName, lastName, email, topic, message });
    return NextResponse.json({ ok: true, ...delivery });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit contact request." },
      { status: 502 }
    );
  }
}
