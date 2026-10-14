import { NextResponse } from 'next/server'
import { z } from 'zod'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const schema = z.object({
  nome: z.string().min(2).max(120),
  email: z.string().email(),
  telefone: z.string().min(10).max(20),
  nome_clinica: z.string().max(200).optional().default(''),
  mensagem: z.string().max(1000).optional().default(''),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, erro: 'Dados inválidos', detalhes: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const { nome, email, telefone, nome_clinica, mensagem } = parsed.data

    const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseKey) {
      console.error('[demo] SUPABASE_URL ou SUPABASE_ANON_KEY não configurada')
      return NextResponse.json({ ok: false, erro: 'Serviço indisponível' }, { status: 503 })
    }

    const insertRes = await fetch(`${supabaseUrl}/rest/v1/demo_leads`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ nome, email, telefone, nome_clinica, mensagem }),
    })

    if (!insertRes.ok) {
      const errText = await insertRes.text()
      console.error('[demo] Supabase insert falhou:', insertRes.status, errText)
      return NextResponse.json({ ok: false, erro: 'Falha ao salvar' }, { status: 500 })
    }

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const notifTo = process.env.DEMO_NOTIFY_EMAIL ?? 'fernandoanhe@gmail.com'
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM ?? 'Clinvex <onboarding@resend.dev>',
          to: notifTo,
          subject: `[Demo] ${esc(nome)} — ${esc(nome_clinica || 'sem clínica')}`,
          html: `<h2>Novo pedido de demonstração</h2>
<p><strong>Nome:</strong> ${esc(nome)}</p>
<p><strong>Email:</strong> ${esc(email)}</p>
<p><strong>Telefone:</strong> ${esc(telefone)}</p>
<p><strong>Clínica:</strong> ${esc(nome_clinica || '—')}</p>
<p><strong>Mensagem:</strong> ${esc(mensagem || '—')}</p>
<p style="color:#888;font-size:12px">Enviado em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>`,
        }),
      }).catch(err => console.error('[demo] Email de notificação falhou:', err))
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[demo] Erro inesperado:', err)
    return NextResponse.json({ ok: false, erro: 'Erro interno' }, { status: 500 })
  }
}
