import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
const IMGS = [g1, g3, g2, g1, g3, g2];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HidroTech — Bancadas de ensaio hidráulico sem trator" },
      {
        name: "description",
        content:
          "Bancadas de teste para sistemas hidráulicos fechados de implementos agrícolas, com controle de pressão, vazão e rotação, sem depender de trator.",
      },
      { property: "og:title", content: "HidroTech — Ensaios hidráulicos sem trator" },
      {
        property: "og:description",
        content: "Bancada de ensaio com motor elétrico, bomba L2F160, ~150 L/min e até 150 bar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATS = "https://wa.me/5500000000000"; // [EXEMPLO]
const NAV = [
  ["inicio", "Início"],
  ["sobre", "Sobre"],
  ["servicos", "Serviços"],
  ["diferenciais", "Diferenciais"],
  ["galeria", "Galeria"],
  ["depoimentos", "Depoimentos"],
  ["contato", "Contato"],
] as const;

function Ex() {
  return <span className="tag text-accent">[EXEMPLO]</span>;
}

function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2" aria-label="HidroTech — início">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden className="text-foreground">
        <rect x="1" y="1" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="17" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M17 8 L17 17 L24 21" stroke="var(--accent)" strokeWidth="2.5" fill="none" />
      </svg>
      <span className="font-display text-2xl font-bold uppercase tracking-wide">
        Hidro<span className="text-accent">Tech</span>
      </span>
    </a>
  );
}

function SectionHead({ n, id, title, kicker }: { n: string; id: string; title: string; kicker: string }) {
  return (
    <header className="mb-10 flex flex-col gap-2 border-b-2 border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
      <h2 id={`${id}-t`} className="text-4xl font-bold sm:text-5xl">
        <span className="tag mr-3 align-middle text-muted-foreground">{n}</span>
        {title}
      </h2>
      <p className="tag text-muted-foreground">{kicker}</p>
    </header>
  );
}

function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className={`mx-auto max-w-6xl px-4 py-20 sm:px-6 ${className}`}>
      {children}
    </section>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    try {
      localStorage.setItem("ht-theme", d ? "dark" : "light");
    } catch {}
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-5">
            {NAV.map(([id, l]) => (
              <li key={id}>
                <a href={`#${id}`} className="tag hover:text-accent">{l}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="tag border border-line px-2 py-1.5 hover:bg-muted" aria-label={dark ? "Ativar modo prancheta (claro)" : "Ativar modo cianótipo (escuro)"}>
            {dark ? "☀ Papel" : "◐ Cianótipo"}
          </button>
          <a href="#contato" className="tag hidden bg-accent px-3 py-2 font-semibold text-accent-foreground sm:inline-block">
            Solicite um orçamento
          </a>
          <button className="tag border border-line px-2 py-1.5 lg:hidden" aria-expanded={open} aria-controls="menu-movel" onClick={() => setOpen(!open)}>
            {open ? "✕ Fechar" : "☰ Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-movel" aria-label="Menu móvel" className="border-t border-line bg-background lg:hidden">
          <ul className="flex flex-col px-4 py-2">
            {NAV.map(([id, l]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="tag block border-b border-border py-3">{l}</a>
              </li>
            ))}
            <li>
              <a href="#contato" onClick={() => setOpen(false)} className="tag my-3 block bg-accent py-3 text-center font-semibold text-accent-foreground">Solicite um orçamento</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/* ---------- Esquema hidráulico animado ---------- */
function Gauge({ x, y, tag }: { x: number; y: number; tag: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="13" fill="var(--card)" stroke="var(--line)" strokeWidth="1.5" />
      <line x1={x} y1={y} x2={x + 7} y2={y - 7} stroke="var(--accent)" strokeWidth="2" />
      <text x={x} y={y - 19} textAnchor="middle" className="tag" fill="var(--line)" fontSize="9">{tag}</text>
    </g>
  );
}
function Schematic() {
  const L = { stroke: "var(--line)", strokeWidth: 1.5, fill: "none" };
  const F = { stroke: "var(--fluid)", strokeWidth: 2.5, fill: "none", className: "flow" };
  const t = (x: number, y: number, s: string, a: "start" | "middle" = "middle") => (
    <text x={x} y={y} textAnchor={a} fontSize="9" fill="var(--line)" fontFamily="var(--font-mono)">{s}</text>
  );
  return (
    <svg viewBox="0 0 560 380" className="h-auto w-full" role="img" aria-labelledby="sch-t sch-d">
      <title id="sch-t">Esquema de princípio da bancada HidroTech</title>
      <desc id="sch-d">Reservatório, filtro, motor elétrico com redução acionando a bomba L2F160, válvula de alívio, manômetros, medidor de vazão e dois motores hidráulicos em paralelo.</desc>
      <rect x="4" y="4" width="552" height="372" {...L} />
      {/* reservatório */}
      <rect x="30" y="290" width="110" height="55" {...L} />
      <path d="M30 312 H140" stroke="var(--fluid)" strokeWidth="1" strokeDasharray="3 3" />
      {t(85, 337, "T-001 RESERV.")}
      {/* filtro */}
      <path d="M85 290 V250" {...F} />
      <polygon points="85,215 100,232 85,249 70,232" {...L} />
      <line x1="72" y1="232" x2="98" y2="232" stroke="var(--line)" strokeDasharray="2 2" />
      {t(110, 236, "F-101", "start")}
      {/* motor elétrico + redução */}
      <circle cx="40" cy="120" r="20" {...L} />
      {t(40, 124, "M")}
      {t(40, 155, "ME-001")}
      <rect x="70" y="108" width="24" height="24" {...L} />
      {t(82, 100, "RED.")}
      <line x1="60" y1="120" x2="70" y2="120" {...L} />
      <line x1="94" y1="120" x2="110" y2="120" stroke="var(--line)" strokeWidth="3" />
      {/* bomba */}
      <circle cx="130" cy="120" r="20" {...L} />
      <polygon points="130,103 120,118 140,118" fill="var(--line)" />
      <path d="M118 108 L142 132" stroke="var(--line)" strokeWidth="1.5" />
      <g className="spin-slow"><line x1="130" y1="112" x2="130" y2="128" stroke="var(--accent)" strokeWidth="2" /></g>
      {t(130, 160, "B-101 L2F160")}
      <path d="M85 215 V180 H130 V140" {...F} />
      {/* linha de pressão */}
      <path d="M130 100 V60 H470" {...F} />
      <Gauge x={200} y={60} tag="PI-101" />
      {/* válvula de alívio */}
      <path d="M260 60 V100" {...F} />
      <rect x="248" y="100" width="24" height="34" {...L} />
      <path d="M254 126 L266 108 M262 108 h4 v4" stroke="var(--line)" strokeWidth="1.5" fill="none" />
      {t(280, 120, "V-101 ALÍVIO", "start")}
      <path d="M260 134 V318 H140" {...F} />
      {/* medidor de vazão */}
      <rect x="320" y="48" width="34" height="24" fill="var(--card)" stroke="var(--line)" strokeWidth="1.5" />
      {t(337, 64, "FT")}
      {t(337, 40, "FT-101")}
      {/* motores hidráulicos */}
      <path d="M410 60 V150" {...F} />
      <path d="M470 60 V150" {...F} />
      {[410, 470].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="170" r="20" {...L} />
          <polygon points={`${x},187 ${x - 10},172 ${x + 10},172`} fill="var(--line)" />
          <g className="spin-slow"><line x1={x - 9} y1="170" x2={x + 9} y2="170" stroke="var(--accent)" strokeWidth="2" /></g>
          {t(x, 205, `M-20${i + 1}`)}
          <Gauge x={x} y={250} tag={`PI-20${i + 1}`} />
          <path d={`M${x} 190 V237`} {...F} />
          <path d={`M${x} 263 V318`} {...F} />
        </g>
      ))}
      <path d="M470 318 H260" {...F} />
      {/* carimbo */}
      <g transform="translate(330 330)">
        <rect width="222" height="42" fill="var(--card)" stroke="var(--line)" strokeWidth="1.5" />
        <line x1="0" y1="20" x2="222" y2="20" stroke="var(--line)" />
        <line x1="130" y1="0" x2="130" y2="42" stroke="var(--line)" />
        <text x="6" y="14" fontSize="9" fill="var(--line)" fontFamily="var(--font-mono)">HIDROTECH · ESQ. PRINCÍPIO</text>
        <text x="136" y="14" fontSize="9" fill="var(--accent)" fontFamily="var(--font-mono)">DES. HT-001</text>
        <text x="6" y="34" fontSize="9" fill="var(--line)" fontFamily="var(--font-mono)">150 L/min · 150 bar</text>
        <text x="136" y="34" fontSize="9" fill="var(--line)" fontFamily="var(--font-mono)">ESC. S/E · REV. A</text>
      </g>
    </svg>
  );
}

function Hero() {
  const facts = [
    ["Atendimento", "Seg–Sex, 8h–18h [EXEMPLO]"],
    ["Visita técnica", "Sob agendamento [EXEMPLO]"],
    ["Orçamento", "Por escrito, detalhado"],
    ["Garantia", "Conforme proposta [EXEMPLO]"],
  ];
  return (
    <section id="inicio" aria-labelledby="inicio-t" className="mx-auto max-w-6xl px-4 pb-12 pt-28 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="tag mb-4 text-accent">DOC. HT-001 · Ensaios hidráulicos sem trator</p>
          <h1 id="inicio-t" className="text-5xl font-bold sm:text-7xl">
            Teste o sistema hidráulico. Deixe o trator no galpão.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Bancadas de ensaio para sistemas hidráulicos fechados de implementos agrícolas, acionadas por motor elétrico, com controle de pressão, vazão e rotação em ambiente controlado.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contato" className="tag bg-accent px-5 py-3 font-semibold text-accent-foreground">Solicite um orçamento →</a>
            <a href={WHATS} target="_blank" rel="noopener noreferrer" className="tag border-2 border-line px-5 py-3 font-semibold hover:bg-muted">WhatsApp</a>
          </div>
        </div>
        <div className="frame p-2"><Schematic /></div>
      </div>
      <dl className="mt-12 grid grid-cols-2 border-2 border-line lg:grid-cols-4">
        {facts.map(([k, v], i) => (
          <div key={k} className={`p-4 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
            <dt className="tag text-muted-foreground">{k}</dt>
            <dd className="mt-1 font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function About() {
  return (
    <Section id="sobre">
      <SectionHead n="01" id="sobre" title="Sobre nós" kicker="Problema → proposta" />
      <div className="grid gap-px border-2 border-line bg-line md:grid-cols-2">
        <div className="bg-card p-6">
          <h3 className="mb-3 text-2xl font-semibold">O problema</h3>
          <p className="text-muted-foreground">Testes de sistemas hidráulicos de implementos podem depender de um trator para fornecer potência e rotação. Isso gera custo de combustível, manutenção, desgaste de componentes e depende da disponibilidade da máquina.</p>
        </div>
        <div className="bg-card p-6">
          <h3 className="mb-3 text-2xl font-semibold">A proposta</h3>
          <ul className="space-y-1 text-muted-foreground">
            {["Controle de pressão, vazão e rotação", "Mais segurança e repetibilidade dos ensaios", "Menor custo de implantação e operação", "Dimensionamento adequado às condições reais, sem superdimensionamento", "Base para automação e monitoramento futuros"].map((s) => (
              <li key={s} className="flex gap-2"><span className="tag pt-1 text-accent">▸</span>{s}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          ["Missão", "Oferecer bancadas de ensaio hidráulico seguras e econômicas, que eliminem a dependência do trator nos testes de implementos."],
          ["Visão", "Ser referência regional em bancadas de ensaio para implementos agrícolas. [EXEMPLO]"],
          ["Valores", "Rigor técnico, segurança, transparência no orçamento e dimensionamento honesto."],
        ].map(([k, v]) => (
          <div key={k} className="border-l-4 border-accent pl-4">
            <h3 className="text-2xl font-semibold">{k}</h3>
            <p className="mt-2 text-muted-foreground">{v}</p>
          </div>
        ))}
      </div>
      <p className="tag mt-8 text-muted-foreground">Projeto desenvolvido no âmbito do Projeto Integrador 2026/02 — Escola SENAI Engº Octávio Marcondes Ferraz (SP). <Ex /></p>
    </Section>
  );
}

const SERVICES = [
  ["SV-01", "Bancada de teste completa", "Bancada para sistema hidráulico fechado, do acionamento à instrumentação.", "Fabricantes, centros de ensaio"],
  ["SV-02", "Acionamento", "Motor elétrico, redução, acoplamentos, eixo e mancais.", "Substituição da TDP do trator"],
  ["SV-03", "Sistema hidráulico", "Bomba (L2F160, 160 cm³/volta), válvulas, filtros e reservatório.", "Ensaios estáticos até 150 bar"],
  ["SV-04", "Controle de rotação", "Inversor de frequência para ajuste da rotação de acionamento.", "Variação de vazão nos ensaios"],
  ["SV-05", "Proteção e segurança", "Proteção elétrica e dispositivos de segurança.", "Operação em ambiente controlado"],
  ["SV-06", "Instrumentação", "Monitoramento de pressão, temperatura, vazão e rotação.", "Registro e base para automação"],
];
function Services() {
  return (
    <Section id="servicos">
      <SectionHead n="02" id="servicos" title="Serviços" kicker="Lista de equipamentos / escopo" />
      <div className="overflow-hidden border-2 border-line">
        <div className="tag hidden grid-cols-[90px_1fr_1.4fr_1fr] bg-primary text-primary-foreground md:grid">
          <div className="p-3">Tag</div><div className="p-3">Serviço</div><div className="p-3">Descrição</div><div className="p-3">Aplicações</div>
        </div>
        {SERVICES.map(([tag, t, d, a]) => (
          <div key={tag} className="grid gap-1 border-t border-line bg-card p-4 first:border-t-0 md:grid-cols-[90px_1fr_1.4fr_1fr] md:gap-0 md:p-0 md:first:border-t">
            <div className="tag text-accent md:p-3">{tag}</div>
            <h3 className="text-xl font-semibold md:p-3">{t}</h3>
            <p className="text-muted-foreground md:p-3">{d}</p>
            <p className="text-sm md:p-3"><span className="tag text-muted-foreground md:hidden">Aplicação: </span>{a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Calculadora ---------- */
export function calc(q: number, p: number, vb: number, vm: number, n: number, eta: number) {
  const pumpRpm = (q * 1000) / vb;
  const qMotor = q / n;
  const motorRpm = (qMotor * 1000) / vm;
  const hydKw = (p * q) / 600;
  const shaftKw = hydKw / eta;
  return { pumpRpm, qMotor, motorRpm, hydKw, shaftKw, shaftCv: shaftKw * 1.35962 };
}

function Slider({ label, unit, value, set, min, max, step = 1 }: { label: string; unit: string; value: number; set: (n: number) => void; min: number; max: number; step?: number }) {
  const id = label.replace(/\W/g, "");
  return (
    <div>
      <div className="flex justify-between">
        <label htmlFor={id} className="text-sm font-medium">{label}</label>
        <output htmlFor={id} className="tag text-accent">{value} {unit}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
    </div>
  );
}

function Calculator() {
  const [q, setQ] = useState(150);
  const [p, setP] = useState(150);
  const [vb, setVb] = useState(160);
  const [vm, setVm] = useState(250);
  const [n, setN] = useState(2);
  const [eta, setEta] = useState(85);
  const r = useMemo(() => calc(q, p, vb, vm, n, eta / 100), [q, p, vb, vm, n, eta]);
  const angle = -120 + (Math.min(p, 300) / 300) * 240;
  const f = (x: number, d = 1) => x.toLocaleString("pt-BR", { maximumFractionDigits: d });
  const out = [
    ["Rotação teórica da bomba", `${f(r.pumpRpm, 0)} rpm`],
    ["Vazão por motor", `${f(r.qMotor)} L/min`],
    ["Rotação de cada motor", `${f(r.motorRpm, 0)} rpm`],
    ["Potência hidráulica", `${f(r.hydKw)} kW`],
    ["Potência no eixo estimada", `${f(r.shaftKw)} kW · ${f(r.shaftCv)} cv`],
  ];
  return (
    <Section id="calculadora">
      <SectionHead n="03" id="calculadora" title="Dimensionamento rápido da bancada" kicker="Memória de cálculo" />
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="frame space-y-5 p-6">
          <Slider label="Vazão (Q)" unit="L/min" value={q} set={setQ} min={10} max={300} />
          <Slider label="Pressão (p)" unit="bar" value={p} set={setP} min={10} max={300} />
          <Slider label="Deslocamento da bomba" unit="cm³/volta" value={vb} set={setVb} min={20} max={500} />
          <Slider label="Deslocamento do motor hidráulico" unit="cm³/volta" value={vm} set={setVm} min={20} max={800} />
          <Slider label="Número de motores" unit="" value={n} set={setN} min={1} max={6} />
          <Slider label="Rendimento global" unit="%" value={eta} set={setEta} min={50} max={100} />
          <p className="tag text-muted-foreground">Rendimento inicial de 85%: valor de referência <Ex /></p>
        </div>
        <div className="frame p-6">
          <svg viewBox="0 0 200 130" className="mx-auto w-64" role="img" aria-label={`Manômetro indicando ${p} bar`}>
            <path d="M30 110 A70 70 0 1 1 170 110" fill="none" stroke="var(--line)" strokeWidth="2" />
            {Array.from({ length: 7 }).map((_, i) => {
              const a = ((-120 + i * 40 - 90) * Math.PI) / 180;
              return (
                <g key={i}>
                  <line x1={100 + 62 * Math.cos(a)} y1={80 + 62 * Math.sin(a)} x2={100 + 70 * Math.cos(a)} y2={80 + 70 * Math.sin(a)} stroke="var(--line)" strokeWidth="2" />
                  <text x={100 + 50 * Math.cos(a)} y={83 + 50 * Math.sin(a)} textAnchor="middle" fontSize="8" fill="var(--line)" fontFamily="var(--font-mono)">{i * 50}</text>
                </g>
              );
            })}
            <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 80px", transition: "transform .5s cubic-bezier(.3,1.4,.6,1)" }}>
              <line x1="100" y1="80" x2="100" y2="22" stroke="var(--accent)" strokeWidth="3" />
            </g>
            <circle cx="100" cy="80" r="5" fill="var(--line)" />
            <text x="100" y="124" textAnchor="middle" fontSize="11" fill="var(--line)" fontFamily="var(--font-mono)">{p} bar · PI-101</text>
          </svg>
          <dl className="mt-4 divide-y divide-border border-y border-line">
            {out.map(([k, v]) => (
              <div key={k} className="flex flex-wrap justify-between gap-2 py-2.5">
                <dt className="text-sm">{k}</dt>
                <dd className="font-mono font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 border-l-4 border-accent bg-muted p-3 text-sm" role="note">
            <strong>Aviso:</strong> estimativa teórica, sem perdas por rendimento volumétrico e de tubulação. O dimensionamento final exige projeto.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Differentials() {
  const items = [
    ["Redução de custo", "Sem combustível nem desgaste de trator nos ensaios.", "–40%", "custo por ensaio"],
    ["Segurança", "Proteção elétrica e dispositivos de segurança em ambiente controlado.", "0", "trator em operação"],
    ["Repetibilidade", "Mesmas condições de pressão, vazão e rotação a cada ensaio.", "±2%", "variação de vazão"],
    ["Controle preciso", "Rotação ajustada por inversor de frequência.", "150", "bar de pressão máx."],
    ["Preparo para automação", "Base para monitoramento de pressão, temperatura, vazão e rotação.", "4", "variáveis monitoráveis"],
  ];
  return (
    <Section id="diferenciais">
      <SectionHead n="04" id="diferenciais" title="Diferenciais" kicker="Indicadores" />
      <ol className="grid gap-px border-2 border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {items.map(([t, d, num, u], i) => (
          <li key={t} className="flex flex-col bg-card p-5">
            <span className="tag text-muted-foreground">D-0{i + 1}</span>
            <span className="mt-3 font-display text-5xl font-bold text-accent">{num}</span>
            <span className="tag">{u} {i === 0 || i === 2 ? <Ex /> : null}</span>
            <h3 className="mt-4 text-xl font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Gallery() {
  const figs = ["Vista geral da bancada", "Conjunto motor elétrico + redução", "Bomba L2F160 e acoplamento", "Motores hidráulicos M-201 / M-202", "Painel elétrico e inversor", "Desenho de conjunto"];
  return (
    <Section id="galeria">
      <SectionHead n="05" id="galeria" title="Galeria" kicker="Pranchas e fotos" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {figs.map((c, i) => (
          <figure key={c} className="frame p-2">
            <img src={IMGS[i]} alt={`${c} (imagem provisória)`} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full border border-line object-cover" />
            <figcaption className="mt-2 flex justify-between gap-2 text-sm">
              <span><strong className="tag">Fig. {i + 1}</strong> — {c}</span>
              <span className="tag text-accent">[EXEMPLO]</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

const TESTI = [
  ["Conseguimos testar o sistema hidráulico das plantadeiras sem tirar o trator da lavoura.", "Gerente de produção", "Fabricante de implementos"],
  ["Os ensaios ficaram repetíveis; a mesma pressão e vazão em todos os lotes.", "Técnico de qualidade", "Centro de ensaios"],
  ["Bancada usada em aulas práticas de hidráulica com segurança.", "Coordenador de curso", "Escola técnica"],
];
function Testimonials() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((i + d + TESTI.length) % TESTI.length);
  const [q, who, org] = TESTI[i];
  return (
    <Section id="depoimentos">
      <SectionHead n="06" id="depoimentos" title="Depoimentos" kicker="Exemplos fictícios" />
      <div className="frame relative p-8" aria-roledescription="carrossel" aria-live="polite">
        <span className="tag absolute right-4 top-4 text-accent">[EXEMPLO — depoimento fictício]</span>
        <blockquote className="font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl">“{q}”</blockquote>
        <p className="tag mt-6 text-muted-foreground">{who} · {org}</p>
        <div className="mt-6 flex items-center gap-3">
          <button onClick={() => go(-1)} className="tag border border-line px-3 py-2 hover:bg-muted" aria-label="Depoimento anterior">←</button>
          <span className="tag">{i + 1} / {TESTI.length}</span>
          <button onClick={() => go(1)} className="tag border border-line px-3 py-2 hover:bg-muted" aria-label="Próximo depoimento">→</button>
        </div>
      </div>
    </Section>
  );
}

function Faq() {
  const qs = [
    ["Preciso de um trator para testar?", "Não. A bancada é acionada por motor elétrico com redução, que aciona a bomba hidráulica L2F160. O trator deixa de ser a fonte de potência e rotação."],
    ["Quais variáveis posso controlar?", "Pressão, vazão e rotação. A rotação é ajustada por inversor de frequência; a referência de projeto é cerca de 150 L/min e até 150 bar nos testes estáticos."],
    ["A bancada aceita monitoramento e automação?", "Sim. O projeto prevê base para automação futura e monitoramento de pressão, temperatura, vazão e rotação."],
    ["Como funciona o orçamento?", "Você envia as condições do ensaio (vazão, pressão, tipo de implemento). Avaliamos o dimensionamento e enviamos um orçamento por escrito. Prazos e valores dependem do projeto. [EXEMPLO]"],
  ];
  return (
    <Section id="faq">
      <SectionHead n="07" id="faq" title="Perguntas frequentes" kicker="FAQ" />
      <div className="border-2 border-line">
        {qs.map(([q, a]) => (
          <details key={q} className="group border-t border-line bg-card first:border-t-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-medium">
              {q}<span className="tag text-accent group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="px-5 pb-5 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().regex(/^[\d\s()+-]{8,20}$/, "Telefone inválido"),
  mensagem: z.string().trim().min(10, "Mensagem muito curta").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = contactSchema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      setOk(false);
      return;
    }
    setErrors({});
    setOk(true);
  };
  const field = (name: string, label: string, type = "text") => (
    <div>
      <label htmlFor={name} className="tag">{label}</label>
      {type === "textarea" ? (
        <textarea id={name} name={name} rows={5} aria-invalid={!!errors[name]} aria-describedby={`${name}-e`} className="mt-1 w-full border-2 border-input bg-background p-3" />
      ) : (
        <input id={name} name={name} type={type} aria-invalid={!!errors[name]} aria-describedby={`${name}-e`} className="mt-1 w-full border-2 border-input bg-background p-3" />
      )}
      <p id={`${name}-e`} className="mt-1 text-sm text-destructive">{errors[name]}</p>
    </div>
  );
  return (
    <Section id="contato">
      <SectionHead n="08" id="contato" title="Contato" kicker="Solicite um orçamento" />
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={submit} noValidate className="frame space-y-4 p-6">
          <p className="border-l-4 border-accent bg-muted p-3 text-sm" role="note">
            Formulário de demonstração: ainda não há serviço de envio configurado. Nenhuma mensagem será enviada.
          </p>
          {field("nome", "Nome")}
          {field("email", "E-mail", "email")}
          {field("telefone", "Telefone", "tel")}
          {field("mensagem", "Mensagem", "textarea")}
          <button type="submit" className="tag bg-accent px-5 py-3 font-semibold text-accent-foreground">Validar dados</button>
          {ok && (
            <p role="status" className="text-sm font-medium">
              Dados válidos. Esta é uma demonstração: a mensagem <strong>não foi enviada</strong>. Use o WhatsApp ou o e-mail ao lado.
            </p>
          )}
        </form>
        <dl className="frame space-y-4 p-6">
          {[
            ["Telefone", "(00) 0000-0000 [EXEMPLO]", "tel:+550000000000"],
            ["E-mail", "contato@hidrotech.com.br [EXEMPLO]", "mailto:contato@hidrotech.com.br"],
            ["Endereço", "Rua Exemplo, 123 — Cidade/UF [EXEMPLO]", "https://maps.google.com/?q=Rua+Exemplo+123"],
          ].map(([k, v, h]) => (
            <div key={k}>
              <dt className="tag text-muted-foreground">{k}</dt>
              <dd><a href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="underline decoration-accent underline-offset-4">{v}</a></dd>
            </div>
          ))}
          <a href="https://maps.google.com/?q=Rua+Exemplo+123" target="_blank" rel="noopener noreferrer" className="tag inline-block border-2 border-line px-4 py-2 hover:bg-muted">Abrir no mapa ↗</a>
        </dl>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t-2 border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">Tecnologia que move a água. Ensaios hidráulicos sem trator.</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-2">
            {NAV.map(([id, l]) => <li key={id}><a href={`#${id}`} className="tag hover:text-accent">{l}</a></li>)}
          </ul>
        </nav>
        <div>
          <p className="tag text-muted-foreground">Redes sociais <Ex /></p>
          <ul className="mt-2 flex gap-4">
            {["Instagram", "LinkedIn", "YouTube"].map((s) => <li key={s}><a href="#" className="tag hover:text-accent">{s}</a></li>)}
          </ul>
        </div>
      </div>
      <p className="tag border-t border-border px-4 py-4 text-center text-muted-foreground">© {new Date().getFullYear()} HidroTech. Todos os direitos reservados.</p>
    </footer>
  );
}

function Index() {
  return (
    <>
      <a href="#sobre" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:bg-accent focus:p-2">Pular para o conteúdo</a>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Calculator />
        <Differentials />
        <Gallery />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <a href={WHATS} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp" className="tag fixed bottom-4 right-4 z-40 border-2 border-line bg-accent px-4 py-3 font-semibold text-accent-foreground shadow-lg">
        WhatsApp
      </a>
    </>
  );
}
