# PROMPT PARA CLAUDE CODE — Site de Vendas "Gestão de Leads"

Leia os 3 documentos em `docs/` antes de qualquer coisa:
- `docs/competitive-brief-gestao-leads.md` — posicionamento e diferenciação
- `docs/fase1-copy-landing-page.md` — copy completo de todas as seções
- `docs/fase2-design-direction.md` — design tokens, tipografia, paleta, animações, wireframe, estrutura

Esses documentos são a fonte de verdade do projeto. Todo o copy, cada cor, cada font e cada animação está definido ali. Siga-os fielmente.

---

## O que estamos construindo

Landing page de vendas do SaaS "Gestão de Leads" — plataforma WhatsApp-first para clínicas de estética. O site precisa converter visitantes em signup (teste grátis) ou agendamento de demo.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (animações de scroll, stagger, counters)
- Google Fonts: Instrument Serif (display/headlines) + Inter (body) + JetBrains Mono (dados/métricas)
- Deploy: Vercel

## Direção Visual: "Noite Dourada"

- Fundo dark (#0A0A0B) — nenhum concorrente do mercado usa dark mode
- Accent dourado (#F5B731) — botões, glow, highlights
- Tipografia serif nos headlines (Instrument Serif) — elegância e personalidade
- Mouse glow effect no hero (radial gradient dourado segue o cursor)
- Scroll-triggered animations em todas as seções (Framer Motion)
- Assinatura visual: "Scoring Pulse" — animação interativa do scoring de leads

## Estrutura de pastas

```
site-vendas/
├── app/
│   ├── page.tsx              # composição de todas as seções
│   ├── layout.tsx            # html, fonts, metadata SEO
│   └── globals.css           # tokens CSS custom properties
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
│   └── interactive/
│       ├── ScoringPulse.tsx   # assinatura visual animada
│       ├── ROICalculator.tsx  # calculadora interativa
│       └── MouseGlow.tsx      # efeito de glow no hero
├── lib/
│   └── fonts.ts
├── docs/                      # referências (não vai pro build)
├── public/
│   └── og-image.png
└── package.json
```

## Implementação em Etapas

Execute uma etapa por vez. Após cada etapa, tire screenshot com Playwright (375px, 768px e 1440px de largura) para validar antes de avançar. Espere meu OK para prosseguir.

### Etapa 1: Setup do projeto
- `pnpm create next-app@latest . --typescript --tailwind --app --src-no --import-alias "@/*"`
- Instalar Framer Motion: `pnpm add framer-motion`
- Configurar Google Fonts (Instrument Serif, Inter, JetBrains Mono) em `lib/fonts.ts`
- Criar `globals.css` com todos os tokens CSS definidos em `docs/fase2-design-direction.md` seção 1 (paleta)
- Configurar `layout.tsx` com fonts, metadata SEO (title, description, og tags) de `docs/fase1-copy-landing-page.md` seção META TAGS
- Background do body: `--bg-primary` (#0A0A0B)
- Validar: página vazia com fundo dark e fonts carregando

### Etapa 2: Componentes UI base + Navbar + Hero
- Criar Button.tsx (primário dourado + secundário outline) conforme spec
- Criar Badge.tsx conforme spec
- Criar Navbar.tsx: sticky, blur backdrop, links (Como funciona, Funcionalidades, Preços) + CTA "Testar grátis"
- Criar MouseGlow.tsx: radial gradient dourado que segue o cursor (--gradient-glow)
- Criar Hero.tsx com:
  - Glow ambiental no topo (--gradient-hero)
  - Headline em Instrument Serif: "Pare de perder os leads que você pagou pra captar."
  - Subheadline em Inter
  - 2 CTAs (primário + secundário)
  - Linha de suporte: "Grátis por 14 dias. Sem cartão. Sem compromisso."
- Scroll reveal animation (Framer Motion) no hero
- Screenshot pra validar

### Etapa 3: PainPoints + HowItWorks
- PainPoints.tsx:
  - Eyebrow "O problema" em badge accent
  - Headline serif: "Você investe em tráfego. Os leads chegam. E depois?"
  - 3 cards com borda-esquerda vermelha (pain cards)
  - Copy exato de `docs/fase1-copy-landing-page.md` seção 3
  - Frase de transição
  - Stagger animation nos cards
- HowItWorks.tsx:
  - Eyebrow "A plataforma"
  - Headline serif: "Do anúncio ao pacote fechado, sem sair do WhatsApp."
  - 4 passos visuais com números, ícones e texto
  - Copy exato da seção 4
  - Stagger animation nos passos
- Screenshot pra validar

### Etapa 4: Features (com Scoring Pulse)
- Features.tsx:
  - Eyebrow "Funcionalidades"
  - Headline serif: "Tudo que o WhatsApp da sua clínica precisa. Nada que ele não precisa."
  - Grid 3×2 de feature cards com hover glow dourado
  - 6 features com copy exato da seção 5
  - Stagger animation
- ScoringPulse.tsx (elemento destaque no card de Scoring):
  - Nome do lead + dot verde + score animado (counter 0→92)
  - Barra de progresso com gradient dourado animando de 0% a 92%
  - 3 eventos aparecendo em sequência (stagger) com pontos (+5, +8, +12)
  - Badge "★ OURO — prioridade máxima" com pulse sutil
  - Trigger: quando o card entra no viewport
- Screenshot pra validar

### Etapa 5: Comparison + SocialProof
- Comparison.tsx:
  - Eyebrow "Diferente de tudo que você já testou"
  - Headline serif
  - 3 colunas: Sistemas de clínica | CRMs WhatsApp | Nós
  - Coluna "Nós" com border accent e glow
  - ❌ e ✅ nos itens de comparação
  - Copy exato da seção 6
  - Slide-in animation (colunas entram lateralmente)
- SocialProof.tsx:
  - Eyebrow "Resultados"
  - 3 metric cards com counter animation (47s, -71%, +X%)
  - JetBrains Mono nos números grandes
  - Bloco de depoimento (usar template da seção 7, placeholder por enquanto)
- Screenshot pra validar

### Etapa 6: Pricing (com ROI Calculator)
- ROICalculator.tsx:
  - Card com background elevado
  - 3 sliders: leads/mês (20-500), valor/avaliação (R$100-R$1000), leads perdidos (5-50)
  - Resultado calculado em tempo real: "Você está deixando R$ X.XXX na mesa todo mês."
  - CTA: "Quero parar de perder →"
  - Números formatados com Intl.NumberFormat('pt-BR')
- Pricing.tsx:
  - Eyebrow "Investimento"
  - Headline serif: "Quanto custa perder 5 leads por mês?"
  - Texto introdutório
  - ROI Calculator no topo
  - Grid de 3 planos (Starter, Pro destacado, Clínica+)
  - Plano Pro com border accent (destaque)
  - Copy e estrutura da seção 8
- Screenshot pra validar

### Etapa 7: FAQ + FinalCTA + Footer
- FAQ.tsx:
  - Eyebrow "Perguntas"
  - Headline serif: "Perguntas que toda dona de clínica faz."
  - Accordion com as 7 perguntas da seção 9
  - Animação de abertura suave
- FinalCTA.tsx:
  - Headline serif: "Seu próximo lead já está esperando resposta."
  - Subheadline
  - 2 CTAs
  - Glow ambiental (similar ao hero)
- Footer.tsx:
  - Logo + links + copyright
  - Simples, clean, dark
- Screenshot pra validar

### Etapa 8: Animações globais
- Revisar todas as seções e garantir:
  - ScrollReveal (fade up) em cada seção
  - Stagger nos cards/itens
  - Counter animation nas métricas (SocialProof)
  - Hover effects nos cards de feature (glow dourado)
  - Smooth scroll nos links da navbar
  - Respeitar prefers-reduced-motion
- Screenshot pra validar (scroll completo)

### Etapa 9: Responsividade
- Testar e ajustar para 375px (mobile), 768px (tablet), 1440px (desktop)
- Hero: headline menor em mobile, CTAs empilhados
- Cards: 1 coluna em mobile, 2 em tablet, 3 em desktop
- Navbar: hamburger menu em mobile
- Pricing: cards empilhados em mobile
- ROI Calculator: sliders full-width em mobile
- Screenshot nos 3 breakpoints pra validar

### Etapa 10: SEO + Meta + Performance
- Meta tags completas (title, description, og:title, og:description, og:image)
- Favicon
- `robots.txt` e `sitemap.xml` básicos
- Verificar Lighthouse score (target: >90 em Performance e Accessibility)
- Build final: `pnpm build` sem erros
- Screenshot final nos 3 viewports

---

## Regras gerais

- Todo o copy vem de `docs/fase1-copy-landing-page.md` — não invente texto
- Todas as cores, fonts e tokens vêm de `docs/fase2-design-direction.md` — não use cores fora da paleta
- Usar a Opção A do Hero (headline: "Pare de perder os leads que você pagou pra captar.")
- Componentes como Client Components ("use client") quando usam Framer Motion, useState, ou event handlers
- Imagens: por enquanto usar placeholders — o foco é copy + design + animações
- Não instalar bibliotecas além das definidas (next, react, framer-motion, tailwindcss)
- Idioma da interface: pt-BR
