export interface LeadDemo {
  nome: string;
  email: string;
  whatsapp: string;
}

// TODO: trocar adapter (Supabase / Resend / entrada como lead no sistema)
export async function capturarLeadDemo(input: LeadDemo): Promise<{ ok: boolean }> {
  console.log("[lead-capture] Demo lead:", input);

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "demo_tour", ...input, ts: new Date().toISOString() }),
      });
    } catch (e) {
      console.error("[lead-capture] Webhook error:", e);
    }
  }

  return { ok: true };
}
