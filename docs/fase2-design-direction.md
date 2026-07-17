# Fase 2 — Design System & Direção Visual
**Projeto:** Site de Vendas — Gestão de Leads  
**Data:** 16 de julho de 2026

---

## BRIEFING DE DESIGN

**Sujeito:** Landing page de um SaaS WhatsApp-first para clínicas de estética.  
**Audiência:** Donas de clínicas de estética, 28-45 anos, valorizam beleza e sofisticação.  
**Job da página:** Converter visitante em signup (teste grátis) ou agendamento de demo.  
**Direção:** Movimento com propósito, disruptivo para o nicho, que pareça inovador.

**O mercado é visualmente genérico:** Backgrounds brancos/cinza, gradients azul/roxo, ícones flat, screenshots estáticas, layout grid SaaS padrão. Nenhum concorrente usa dark mode, nenhum tem demo interativa, nenhum tem micro-interações, nenhum tem tipografia com personalidade.

---

## DECISÃO ESTÉTICA: "NOITE DOURADA"

A metáfora visual é o contraste entre a sofisticação noturna (dark base) e o brilho quente do ouro (accent dourado). Remete ao universo da estética de alto padrão — clínicas premium, iluminação de consultório, elegância sem ostentação.

**Por que essa direção:**
- Nenhum concorrente usa dark mode → diferenciação imediata
- Dourado/âmbar evoca confiança, resultado, premium → conecta com o público de estética
- Dark + dourado é inerentemente sofisticado sem ser frio como azul tech
- Contraste alto facilita leitura e hierarquia
- Movimento sutil brilha mais em fundo escuro (efeito de "luzes na escuridão")

---

## 1. PALETA DE CORES

### Tokens de cor

```css
:root {
  /* Base (dark) */
  --bg-primary: #0A0A0B;        /* fundo principal */
  --bg-secondary: #111113;      /* cards, seções alternadas */
  --bg-elevated: #1A1A1E;       /* elementos elevados, hovers */
  --bg-surface: #222226;        /* inputs, tooltips */
  
  /* Accent (dourado/âmbar) */
  --accent-50: #FFF8E7;         /* texto em background accent */
  --accent-100: #FEECC0;        /* highlights suaves */
  --accent-200: #FDD889;        /* borders accent */
  --accent-400: #F5B731;        /* accent principal — botões, CTAs */
  --accent-500: #D4960A;        /* accent hover */
  --accent-600: #A67508;        /* accent pressed */
  --accent-900: #3D2B04;        /* badge backgrounds em contexto light */
  
  /* Texto */
  --text-primary: #F5F5F3;      /* títulos, corpo principal */
  --text-secondary: #A0A0A0;    /* subtítulos, descrições */
  --text-muted: #666666;        /* labels, metadata */
  --text-accent: #F5B731;       /* texto accent */
  
  /* Bordas */
  --border-default: #2A2A2E;    /* bordas sutis */
  --border-strong: #3A3A3E;     /* bordas em hover */
  --border-accent: #F5B731;     /* bordas accent */
  
  /* Semânticos */
  --success: #34D399;           /* verde WhatsApp/saúde boa */
  --warning: #FBBF24;           /* atenção/amarelo */
  --danger: #F87171;            /* erro/vermelho */
  --whatsapp: #25D366;          /* brand WhatsApp (preservado) */
  
  /* Gradients */
  --gradient-accent: linear-gradient(135deg, #F5B731 0%, #D4960A 100%);
  --gradient-glow: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 183, 49, 0.06) 0%, transparent 100%);
  --gradient-hero: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245, 183, 49, 0.12) 0%, transparent 70%);
}
```

### Uso das cores

| Contexto | Cor | Token |
|---|---|---|
| Fundo da página | Quase-preto | `--bg-primary` |
| Cards de feature | Cinza elevado | `--bg-secondary` |
| Botões CTA primário | Dourado sólido | `--accent-400` |
| Botões CTA secundário | Outline dourado | `border: --border-accent` |
| Headlines | Branco-creme | `--text-primary` |
| Corpo de texto | Cinza claro | `--text-secondary` |
| Badge "Verde" (qualidade) | Verde WhatsApp | `--success` |
| Glow no hero (ambiência) | Gradiente âmbar sutil | `--gradient-hero` |
| Mouse follow effect | Glow dourado | `--gradient-glow` |

---

## 2. TIPOGRAFIA

### Fontes

```css
:root {
  /* Display — serif editorial, elegante, com personalidade */
  --font-display: 'Instrument Serif', Georgia, serif;
  
  /* Body — sans geométrica limpa, legível */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Mono — para dados, métricas, badges */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Escala tipográfica

```css
:root {
  --text-hero: 4.5rem;      /* 72px — headline do hero */
  --text-h1: 3rem;          /* 48px — títulos de seção */
  --text-h2: 2rem;          /* 32px — subtítulos */
  --text-h3: 1.5rem;        /* 24px — títulos de card */
  --text-body: 1.125rem;    /* 18px — corpo */
  --text-small: 0.875rem;   /* 14px — labels, captions */
  --text-xs: 0.75rem;       /* 12px — badges, metadata */
  
  /* Tracking */
  --tracking-tight: -0.03em;  /* headlines */
  --tracking-normal: -0.01em; /* corpo */
  --tracking-wide: 0.08em;    /* eyebrows, labels uppercase */
}
```

### Uso tipográfico

| Elemento | Fonte | Size | Weight | Tracking | Transform |
|---|---|---|---|---|---|
| Hero headline | Instrument Serif | 72px | 400 | -0.03em | — |
| Eyebrow (label de seção) | Inter | 14px | 500 | 0.08em | uppercase |
| Título de seção (H1) | Instrument Serif | 48px | 400 | -0.03em | — |
| Subtítulo de seção | Inter | 18px | 400 | -0.01em | — |
| Título de card | Inter | 24px | 600 | -0.02em | — |
| Corpo de card | Inter | 18px | 400 | -0.01em | — |
| CTA (botão) | Inter | 16px | 500 | 0.01em | — |
| Métrica (número grande) | JetBrains Mono | 48px | 700 | -0.03em | — |
| Badge | Inter | 12px | 500 | 0.02em | uppercase |
| Navbar | Inter | 15px | 400 | — | — |

**Decisão chave:** Instrument Serif nos headlines cria personalidade e elegância sem parecer "artigo de blog". O contraste serif/sans é o que separa de todo design SaaS genérico.

---

## 3. LAYOUT

### Grid

```css
:root {
  --max-width: 1200px;       /* container máximo */
  --padding-x: 1.5rem;       /* padding lateral mobile */
  --padding-x-md: 3rem;      /* padding lateral tablet */
  --padding-x-lg: 4rem;      /* padding lateral desktop */
  
  --section-gap: 8rem;       /* espaço entre seções */
  --section-gap-mobile: 5rem;
}
```

### Breakpoints

```
Mobile:  < 768px  (1 coluna)
Tablet:  768-1024px (2 colunas)
Desktop: > 1024px (grid completo)
```

### Estrutura de seção

Cada seção segue o pattern:

```
[Eyebrow — label uppercase, cor accent, 14px]
[Headline — Instrument Serif, grande, branca]
[Subtexto — Inter, secondary, max-width 600px]
[Gap 3-4rem]
[Conteúdo da seção]
```

---

## 4. COMPONENTES

### Botão primário (CTA)
```css
.btn-primary {
  background: var(--accent-400);
  color: var(--bg-primary);
  font-weight: 500;
  padding: 14px 32px;
  border-radius: 12px;
  transition: all 0.2s ease;
  /* hover: scale(1.02), background: --accent-500 */
  /* active: scale(0.98) */
}
```

### Botão secundário
```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
  padding: 14px 32px;
  border-radius: 12px;
  /* hover: border-color: --accent-400, color: --accent-400 */
}
```

### Card de feature
```css
.feature-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  padding: 2rem;
  /* hover: border-color: --border-accent, 
     transform: translateY(-4px),
     box-shadow: 0 0 30px rgba(245, 183, 49, 0.05) */
}
```

### Card de dor (cenário)
```css
.pain-card {
  background: var(--bg-secondary);
  border-left: 3px solid var(--danger);
  border-radius: 0 12px 12px 0;
  padding: 2rem;
}
```

### Badge / Tag
```css
.badge {
  background: rgba(245, 183, 49, 0.1);
  color: var(--accent-400);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 999px;
}
```

### Navbar
```css
.navbar {
  background: rgba(10, 10, 11, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-default);
  position: sticky;
  top: 0;
  z-index: 50;
}
```

---

## 5. ANIMAÇÕES (Framer Motion)

### Princípio
Cada animação tem propósito. Nada se move por decoração.

### Padrões de animação

#### Scroll reveal (seções)
```tsx
// Cada seção aparece ao entrar no viewport
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}
```

#### Stagger (cards de feature, itens de lista)
```tsx
// Cards aparecem em sequência
const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.12 }
  }
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.5 }
  }
}
```

#### Glow follow (hero)
```tsx
// Glow dourado sutil segue o mouse no hero
// CSS: --gradient-glow com custom properties --mouse-x, --mouse-y
// JS: atualiza as custom properties no mousemove
```

#### Counter (métricas de prova social)
```tsx
// Números contam de 0 até o valor real
// Trigger: quando a seção entra no viewport
// Duração: 1.5s, easing: ease-out
// Formato: usa Intl.NumberFormat para separador de milhares
```

#### Slide-in (comparação nós vs mercado)
```tsx
// Colunas deslizam lateralmente em sequência
// Coluna 1 (concorrente): vem da esquerda, 0.4s
// Coluna 2 (concorrente): vem da esquerda, 0.4s, delay 0.15s
// Coluna 3 (nós): vem da direita, 0.5s, delay 0.3s, com glow accent
```

#### Typing effect (headline do hero — OPCIONAL)
```tsx
// A headline aparece como se estivesse sendo digitada
// Velocidade: 40ms por caractere
// Cursor piscando no final
// CUIDADO: pode parecer genérico se mal executado
// Alternativa: split por palavra com stagger
```

### Animações proibidas
- Parallax em todo o background (pesado, enjoativo)
- Partículas flutuando (genérico, "template")
- Texto que gira/rotaciona (distrai)
- Animações que duram mais de 1.5s
- Qualquer animação que bloqueie interação

---

## 6. ASSINATURA VISUAL: "SCORING PULSE"

**O elemento memorável que nenhum outro site tem.**

Na seção de Scoring de Leads, um visualizador animado mostra como o score de um lead muda em tempo real:

```
┌─────────────────────────────────────────┐
│  ● Maria Santos                         │
│  Score: ████████░░ 78 → ██████████ 92   │
│                                         │
│  [mensagem lida]     +5                 │
│  [clicou no link]    +8                 │
│  [respondeu em 2min] +12                │
│                                         │
│  Quadrante: ★ OURO → prioridade máxima  │
└─────────────────────────────────────────┘
```

Animação: os eventos aparecem em sequência com stagger, o score sobe como um counter, a barra preenche com gradiente dourado, e o badge "OURO" faz um pulse sutil. Isso funciona como demo interativa inline — mostra o produto em ação sem precisar de video.

---

## 7. WIREFRAME ASCII

```
┌────────────────────────────────────────────────────────┐
│ NAVBAR                                                  │
│ [Logo]     Como funciona  Funcionalidades  Preços  [CTA]│
├────────────────────────────────────────────────────────┤
│                                                          │
│                    ✦ GLOW AMBIENTAL ✦                    │
│                                                          │
│              Pare de perder os leads                     │
│              que você pagou pra captar.                  │
│                                                          │
│     [  Subheadline — 2 linhas, Inter, secondary  ]       │
│                                                          │
│     [Quero testar grátis]    [Ver funcionando ↓]        │
│                                                          │
│     Grátis por 14 dias. Sem cartão.                     │
│                                                          │
├────────────── scroll ──────────────────────────────────┤
│                                                          │
│  ● O PROBLEMA                                           │
│                                                          │
│  Você investe em tráfego.                               │
│  Os leads chegam. E depois?                             │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ 🔴 Leads │  │ 🔴 Follow│  │ 🔴 Dispar│              │
│  │ somem    │  │ up que   │  │ os que   │              │
│  │ no chat  │  │ ninguém  │  │ queimam  │              │
│  │          │  │ faz      │  │ número   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                          │
├────────────── scroll ──────────────────────────────────┤
│                                                          │
│  ● A PLATAFORMA                                         │
│                                                          │
│  Do anúncio ao pacote fechado,                          │
│  sem sair do WhatsApp.                                  │
│                                                          │
│  [1] Lead chega ──→ [2] Score classifica                │
│         │                    │                           │
│  [3] Automação ──→ [4] Disparo seguro                   │
│                                                          │
│  (cada step com ícone + texto + animação stagger)        │
│                                                          │
├────────────── scroll ──────────────────────────────────┤
│                                                          │
│  ● FUNCIONALIDADES                                      │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Chat     │  │ Scoring  │  │ Disparos │              │
│  │          │  │ ★ PULSE  │  │          │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │Automação │  │Dashboard │  │ Listas   │              │
│  │          │  │          │  │          │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                          │
│  (grid 3×2, cards com hover glow dourado)                │
│                                                          │
├────────────── scroll ──────────────────────────────────┤
│                                                          │
│  ● DIFERENTE DE TUDO QUE VOCÊ JÁ TESTOU                │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Sistemas │  │ CRMs de  │  │ ★ NÓS   │              │
│  │ de       │  │ WhatsApp │  │ (glow    │              │
│  │ clínica  │  │ genérico │  │  accent) │              │
│  │ ❌ ❌ ❌ │  │ ❌ ❌ ❌ │  │ ✅ ✅ ✅ │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                          │
├────────────── scroll ──────────────────────────────────┤
│                                                          │
│  ● RESULTADOS                                           │
│                                                          │
│  ┌─────┐  ┌─────┐  ┌─────┐                             │
│  │ 47s │  │ -71%│  │ +X% │    ← counter animation      │
│  │tempo│  │leads│  │conv.│                              │
│  │resp.│  │perd.│  │rate │                              │
│  └─────┘  └─────┘  └─────┘                             │
│                                                          │
│  [ Depoimento em card com aspas ]                       │
│                                                          │
├────────────── scroll ──────────────────────────────────┤
│                                                          │
│  ● INVESTIMENTO                                         │
│                                                          │
│  Quanto custa perder 5 leads por mês?                   │
│                                                          │
│  ┌─────────────────────────────────────┐                │
│  │ CALCULADORA DE ROI                  │                │
│  │                                     │                │
│  │ Leads/mês:    [━━━━━●━━━━━] 80      │                │
│  │ Valor/aval:   [━━●━━━━━━━━] R$300   │                │
│  │ Leads perdidos:[━━━━●━━━━━] 15      │                │
│  │                                     │                │
│  │ Você está deixando R$ 4.500         │                │
│  │ na mesa todo mês.                   │                │
│  │                                     │                │
│  │ [Quero parar de perder →]           │                │
│  └─────────────────────────────────────┘                │
│                                                          │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐               │
│  │ Starter │  │ ★ Pro    │  │ Clínica+ │               │
│  │ R$ X/mês│  │ R$ X/mês │  │ R$ X/mês │               │
│  └─────────┘  └──────────┘  └──────────┘               │
│                                                          │
├────────────── scroll ──────────────────────────────────┤
│                                                          │
│  ● PERGUNTAS                                            │
│                                                          │
│  [ Accordion com 7 FAQs ]                               │
│                                                          │
├────────────── scroll ──────────────────────────────────┤
│                                                          │
│  Seu próximo lead já está                               │
│  esperando resposta.                                    │
│                                                          │
│  [Começar teste grátis]  [Agendar demo]                 │
│                                                          │
│  ────────────────────────────────────                   │
│  FOOTER: Logo + links + social                          │
└────────────────────────────────────────────────────────┘
```

---

## 8. SPEC DE IMPLEMENTAÇÃO PARA CLAUDE CODE

### Stack
```
Next.js 15 (App Router)
TypeScript
Tailwind CSS v4
Framer Motion
Google Fonts: Instrument Serif + Inter + JetBrains Mono
```

### Estrutura de pastas
```
site-vendas/
├── app/
│   ├── page.tsx              # landing page (composição de seções)
│   ├── layout.tsx            # html, fonts, metadata
│   └── globals.css           # tokens CSS, reset
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── PainPoints.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── Comparison.tsx
│   │   ├── SocialProof.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── interactive/
│   │   ├── ScoringPulse.tsx   # ← assinatura visual
│   │   ├── ROICalculator.tsx
│   │   └── MouseGlow.tsx
│   └── animations/
│       ├── ScrollReveal.tsx
│       ├── StaggerChildren.tsx
│       └── CounterAnimation.tsx
├── lib/
│   └── fonts.ts              # configuração Google Fonts
├── public/
│   └── og-image.png
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

### Dependências
```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "framer-motion": "^12",
    "tailwindcss": "^4"
  }
}
```

### Instrução para o Claude Code

> **Contexto:** Estamos construindo a landing page de vendas do SaaS "Gestão de Leads" — uma plataforma WhatsApp-first para clínicas de estética.
>
> **Referências:** Use os 3 documentos anexos como fonte de verdade:
> - `competitive-brief-gestao-leads.md` — posicionamento e diferenciação
> - `fase1-copy-landing-page.md` — copy completo de todas as seções
> - `fase2-design-direction.md` — design tokens, tipografia, animações, wireframe
>
> **Stack:** Next.js 15 App Router + TypeScript + Tailwind CSS v4 + Framer Motion
> **Fontes:** Instrument Serif (display) + Inter (body) + JetBrains Mono (dados)
> **Paleta:** Dark mode (#0A0A0B base) + accent dourado (#F5B731)
>
> **Implementação em etapas:**
> 1. Setup do projeto (next, tailwind, fonts, tokens CSS)
> 2. Navbar + Hero (com mouse glow effect)
> 3. PainPoints + HowItWorks
> 4. Features (com Scoring Pulse interativo)
> 5. Comparison + SocialProof
> 6. Pricing (com ROI Calculator interativo)
> 7. FAQ + FinalCTA + Footer
> 8. Animações de scroll (Framer Motion em todas as seções)
> 9. Responsividade (mobile-first)
> 10. Meta tags, OG image, SEO
>
> **Valide cada etapa com screenshot antes de avançar.**
