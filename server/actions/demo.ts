"use server";

import { z } from "zod";
import { capturarLeadDemo } from "@/lib/lead-capture";

const schema = z.object({
  nome: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z
    .string()
    .min(14, "WhatsApp inválido")
    .max(15, "WhatsApp inválido"),
  _hp: z.string().max(0, "Spam detectado"),
});

export async function submitDemoLead(formData: FormData) {
  const raw = {
    nome: formData.get("nome") as string,
    email: formData.get("email") as string,
    whatsapp: formData.get("whatsapp") as string,
    _hp: formData.get("_hp") as string,
  };

  const result = schema.safeParse(raw);
  if (!result.success) {
    return { ok: false, errors: result.error.flatten().fieldErrors };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _hp: _honeypot, ...lead } = result.data;
  await capturarLeadDemo(lead);
  return { ok: true, errors: null };
}
