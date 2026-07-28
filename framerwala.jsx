import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Trophy,
  ExternalLink,
  Layers,
  LayoutGrid,
  Code2,
  Database,
  Cloud,
  BrainCircuit,
  ShieldCheck,
  Send,
} from "lucide-react";

/* ─── SCROLL REVEAL ──────────────────────────────────────────────────────── */
function useReveal() {
  const [vis, setVis] = useState({});
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVis((p) => ({ ...p, [e.target.dataset.rid]: true }));
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll("[data-rid]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return vis;
}

function AnimNum({ n }) {
  const [v, setV] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        let cur = 0;
        const end = +n;
        const step = Math.max(1, Math.ceil(end / 40));
        const t = setInterval(() => {
          cur = Math.min(cur + step, end);
          setV(cur);
          if (cur >= end) clearInterval(t);
        }, 25);
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [n]);
  return <span ref={ref}>+{v}</span>;
}

/* ─── DOTTED ORBIT DECORATION ────────────────────────────────────────────── */
function Orbit() {
  return (
    <svg
      viewBox="0 0 200 100"
      className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-20 pointer-events-none"
      style={{ opacity: 0.6 }}
    >
      <path
        d="M10,90 Q100,-20 190,90"
        fill="none"
        stroke="#ff5a1f"
        strokeWidth="2"
        strokeDasharray="1,10"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PortfolioBold() {
  const [menuOpen, setMenuOpen] = useState(false);
  const vis = useReveal();
  const r = (id) =>
    `transition-all duration-700 ease-out ${vis[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`;

  const stats = [
    { n: "3", l: "Internships Completed" },
    { n: "8", l: "Projects Shipped" },
    { n: "2051", l: "All India Rank · NCAT 2026" },
  ];

  const highlights = [
    {
      title: "U-CRAFT — LIVE STARTUP, 50+ USERS",
      tone: "orange",
      icon: Layers,
      live: "https://u-craft-mern-based.vercel.app/",
    },
    {
      title: "MERN + GENAI + AWS DEPLOYMENT",
      tone: "lime",
      icon: LayoutGrid,
      live: "https://github.com/Priyanshu-Srivastava318",
    },
  ];

  const projects = [
    {
      title: "U-Craft",
      tag: "Artist Marketplace · MERN",
      desc: "Founded and launched a live multi-vendor marketplace for personalised art ordering — Razorpay checkout, real-time order tracking, artist-buyer messaging.",
      stats: ["50+ users", "10+ artists", "Multi-city ready"],
      github: "https://github.com/Priyanshu-Srivastava318/U-Craft-MERN-Based",
      live: "https://u-craft-mern-based.vercel.app/",
      tone: "orange",
    },
    {
      title: "Jobify",
      tag: "Job Tracker · MERN + AI",
      desc: "Personalised job-application tracker with resume-to-JD matching, a 100-point automated ATS scoring engine, and real-time status updates.",
      stats: ["100-pt ATS score", "Resume-JD match", "Real-time status"],
      github: "https://github.com/Priyanshu-Srivastava318/Jobify",
      live: "https://jobify-delta-three.vercel.app/",
      tone: "lime",
    },
    {
      title: "INQUISITOR",
      tag: "AI-Powered SIEM · PERN + Elasticsearch",
      desc: "Security log analysis tool processing 10,000+ daily entries via Elasticsearch with natural-language querying and real-time anomaly classification.",
      stats: ["10,000+ logs/day", "30% faster response", "NL querying"],
      github: "https://github.com/Priyanshu-Srivastava318/Inquisitor",
      live: "https://inquisitor-model.vercel.app/",
      tone: "orange",
    },
    {
      title: "BHARAT-Freelance",
      tag: "Marketplace · MERN",
      desc: "Freelance platform with JWT auth, Razorpay escrow payments, and an ATS-style candidate ranking engine — sustains 100+ daily requests.",
      stats: ["50% less screening", "JWT + escrow", "100+ daily requests"],
      github: "https://github.com/Priyanshu-Srivastava318/Bharat-Freelance",
      live: "https://bharat-freelance.vercel.app/",
      tone: "lime",
    },
    {
      title: "LuminX",
      tag: "Image Enhancement · Python ML",
      desc: "Drag-and-drop React interface with real-time previews; optimised the ML inference pipeline from 1–2 min down to under 30 sec.",
      stats: ["5x faster inference", "Real-time preview", "Drag & drop UX"],
      github:
        "https://github.com/Priyanshu-Srivastava318/Lumin-X-Image-Enhancement-Model-",
      live: "https://lumin-x-eight.vercel.app/",
      tone: "orange",
    },
    {
      title: "HairNet (HairCare-AI)",
      tag: "Diagnostics · MERN + ML",
      desc: "AI diagnostic platform integrating a trained ML model into a modular MERN backend for personalised hair-care recommendations.",
      stats: ["70% accuracy gain", "Personalised reports", "ML-integrated"],
      github: "https://github.com/Priyanshu-Srivastava318/Hairnet-AI",
      live: "https://haircare-ai.vercel.app/",
      tone: "lime",
    },
  ];

  const experience = [
    {
      company: "TripLodge Universe",
      role: "Web Development Intern — Laravel/PHP",
      period: "Jul 2026 – Present",
      points: [
        "Configured a full local dev environment for an existing Laravel SaaS codebase",
        "Built admin panel modules — Hotels, Bookings, OTA Monitoring, Settlements, Reports",
      ],
    },
    {
      company: "ShapeMySkills by Ducat",
      role: "Full Stack & GenAI Intern",
      period: "Jul – Aug 2025",
      points: [
        "Engineered 3 full-stack modules using React, Node.js, MongoDB & GenAI APIs, cutting API response time by 30%",
        "Cut deployment debugging time by 35%",
      ],
    },
    {
      company: "Skillrisers Infotech",
      role: "Data Analyst Trainee",
      period: "Jan – Feb 2024",
      points: [
        "Migrated 4 reporting workflows to structured pipelines, cutting manual reporting time by 30%",
      ],
    },
    {
      company: "Independent Contractor",
      role: "Freelancer",
      period: "Jan – Aug 2022",
      points: [
        "Completed paid branding, design and web development projects independently",
      ],
    },
  ];

  const toolGroups = [
    {
      title: "Frontend",
      icon: Code2,
      items: "React.js · Next.js · TypeScript · Tailwind CSS",
    },
    {
      title: "Backend",
      icon: Layers,
      items: "Node.js · Express.js · REST APIs · GraphQL",
    },
    {
      title: "Data",
      icon: Database,
      items: "MongoDB · PostgreSQL · Elasticsearch · Firebase",
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      items: "AWS EC2/S3 · Docker · Kubernetes · Vercel",
    },
    {
      title: "AI & ML",
      icon: BrainCircuit,
      items: "GenAI APIs · Python · production ML integration",
    },
    {
      title: "Security & PHP",
      icon: ShieldCheck,
      items: "JWT/OAuth · Laravel · PHP · secure API design",
    },
  ];

  const certifications = [
    {
      title: "React & Next.js with AI-Powered Projects",
      org: "Udemy",
      date: "Jul 2026",
    },
    { title: "AI for Business Essentials", org: "HP LIFE", date: "Jan 2026" },
    {
      title: "Docker & Kubernetes Fundamentals",
      org: "Scaler",
      date: "Dec 2025",
    },
    { title: "React Masterclass", org: "Scaler", date: "Dec 2025" },
    { title: "Full Stack Web Development", org: "Udemy", date: "2025" },
    { title: "DSA in Java (150+ LeetCode)", org: "Udemy", date: "2025" },
  ];

  const achievements = [
    {
      title: "All India Rank 2051",
      sub: "NCAT 2026 — among 8,00,000+ participants nationwide",
    },
    {
      title: "Ideathon 2025 Winner",
      sub: "Melange Tech Fest — innovative tech-driven solution",
    },
    {
      title: "Top 10 Finalist",
      sub: "National Hackathon, COER Roorkee — among 105 teams",
    },
    {
      title: "Founder, U-Craft",
      sub: "Scaled a student-led marketplace to 50+ users, 10+ artists",
    },
  ];

  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#tools", label: "Tools" },
    { href: "#certifications", label: "Certs" },
    { href: "#achievements", label: "Wins" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div
      className="min-h-screen bg-[#0b0b0c] text-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .head{font-family:'Space Grotesk',sans-serif;}
        .ghost{color:rgba(255,255,255,0.06);}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#0b0b0c;}
        ::-webkit-scrollbar-thumb{background:#ff5a1f;}
        .pcard{transition:transform .3s ease, border-color .3s ease;}
        .pcard:hover{transform:translateY(-4px);border-color:rgba(255,255,255,0.22);}
        .tile{transition:transform .25s ease;}
        .tile:hover{transform:translateY(-3px);}
        .toolcard{transition:border-color .25s ease,background .25s ease;}
        .toolcard:hover{border-color:rgba(255,90,31,0.4);background:#141416;}
      `}</style>

      {/* ── MOBILE TOP BAR ─────────────────────────────────────────────── */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-5 py-4 bg-[#0b0b0c]/95 backdrop-blur border-b border-white/10">
        <span className="head font-bold text-lg">Priyanshu S.</span>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-[#0b0b0c] pt-20 px-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-4 text-xl head border-b border-white/10"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <div className="max-w-[1400px] mx-auto lg:flex lg:gap-12 px-5 sm:px-8 lg:px-12">
        {/* ── STICKY PROFILE SIDEBAR ───────────────────────────────────── */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="sticky top-10 space-y-6">
            <div className="bg-[#f5f5f4] rounded-2xl overflow-hidden relative">
              <Orbit />
              <div className="h-64 flex items-end justify-center relative">
                <img
                  src="src\PRofile.jpg"
                  alt="Priyanshu Srivastava"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[58%] w-9 h-9 rounded-full bg-[#ff5a1f] flex items-center justify-center text-lg">
                🔥
              </div>
              <div className="px-6 pb-6 pt-8 text-center">
                <div className="head text-2xl font-bold text-[#0b0b0c] leading-tight">
                  Priyanshu
                  <br />
                  Srivastava
                </div>
                <p className="text-sm text-[#0b0b0c]/60 mt-3 leading-relaxed">
                  MERN Full Stack Developer &amp; startup founder building real
                  products with AI/ML.
                </p>
                <div className="flex justify-center gap-4 mt-5">
                  <a
                    href="https://github.com/Priyanshu-Srivastava318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff5a1f] hover:opacity-70"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/priyanshu-srivastava-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff5a1f] hover:opacity-70"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="mailto:priyanshusrivastava318@gmail.com"
                    className="text-[#ff5a1f] hover:opacity-70"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
            <a
              href="mailto:priyanshusrivastava318@gmail.com"
              className="flex items-center gap-2 justify-center bg-[#ff5a1f] text-[#0b0b0c] font-semibold rounded-full py-3 px-4 text-sm head hover:brightness-110 transition"
            >
              <span className="w-2 h-2 rounded-full bg-[#0b0b0c] animate-pulse" />{" "}
              Available for Work
            </a>
            <nav className="space-y-1 pt-2 hidden xl:block">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-xs uppercase tracking-widest text-white/40 hover:text-white py-1.5 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 py-10 lg:py-16 space-y-28 lg:space-y-36">
          {/* HERO */}
          <section>
            <h1
              className="head font-bold leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)" }}
            >
              <span className="text-white">FULL STACK</span>
              <br />
              <span className="ghost">DEVELOPER</span>
            </h1>
            <p className="mt-6 max-w-lg text-white/60 leading-relaxed text-[15px]">
              Full Stack Developer skilled in the MERN stack, from REST API
              design and database schemas to responsive React interfaces and AWS
              deployment. Founder of a live startup with real users, and
              experienced integrating AI/ML into 6 production projects.
            </p>

            <div className="flex flex-wrap gap-x-14 gap-y-6 mt-12">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="head font-bold text-5xl sm:text-6xl">
                    <AnimNum n={s.n} />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-white/40 mt-2 max-w-[120px]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              {highlights.map((h, i) => (
                <a
                  key={i}
                  href={h.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tile rounded-2xl p-6 flex flex-col justify-between h-36"
                  style={{
                    background: h.tone === "orange" ? "#ff5a1f" : "#d4ff3f",
                    color: "#0b0b0c",
                  }}
                >
                  <h.icon size={22} />
                  <div className="flex items-end justify-between">
                    <span className="head font-bold text-sm leading-tight uppercase max-w-[75%]">
                      {h.title}
                    </span>
                    <ArrowUpRight size={18} />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" data-rid="projects" className={r("projects")}>
            <h2
              className="head font-bold"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
            >
              <span className="text-white">RECENT</span>
              <br />
              <span className="ghost">PROJECTS</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-5 mt-12">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="pcard rounded-2xl border border-white/10 bg-[#111113] p-6 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background:
                          p.tone === "orange"
                            ? "rgba(255,90,31,0.15)"
                            : "rgba(212,255,63,0.15)",
                      }}
                    >
                      <Layers
                        size={18}
                        color={p.tone === "orange" ? "#ff5a1f" : "#d4ff3f"}
                      />
                    </div>
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                  <h3 className="head font-bold text-xl">{p.title}</h3>
                  <div className="text-[11px] uppercase tracking-widest text-white/40 mt-1">
                    {p.tag}
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed mt-3 flex-1">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
                    {p.stats.map((s, j) => (
                      <span key={j} className="text-[11px] text-white/40">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-5">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-xs py-2.5 rounded-full border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Github size={13} /> Code
                    </a>
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-xs py-2.5 rounded-full font-semibold flex items-center justify-center gap-1.5"
                      style={{
                        background: p.tone === "orange" ? "#ff5a1f" : "#d4ff3f",
                        color: "#0b0b0c",
                      }}
                    >
                      <ExternalLink size={13} /> Live
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section
            id="experience"
            data-rid="experience"
            className={r("experience")}
          >
            <h2
              className="head font-bold"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
            >
              <span className="text-white">WORK</span>
              <br />
              <span className="ghost">EXPERIENCE</span>
            </h2>
            <div className="space-y-4 mt-12">
              {experience.map((e, i) => (
                <div
                  key={i}
                  className="pcard rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="head font-bold text-xl">{e.company}</h3>
                      <div className="text-sm text-white/50 mt-1">{e.role}</div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-[#ff5a1f] flex-shrink-0 mt-1"
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-white/35 mt-3">
                    {e.period}
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {e.points.map((pt, j) => (
                      <li key={j} className="text-sm text-white/55 flex gap-2">
                        <span className="text-[#ff5a1f]">—</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* TOOLS */}
          <section id="tools" data-rid="tools" className={r("tools")}>
            <h2
              className="head font-bold"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
            >
              <span className="text-white">PREMIUM</span>
              <br />
              <span className="ghost">TOOLS</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              {toolGroups.map((t, i) => (
                <div
                  key={i}
                  className="toolcard flex gap-4 items-start rounded-2xl border border-white/10 bg-[#111113] p-5"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <t.icon size={19} className="text-[#ff5a1f]" />
                  </div>
                  <div>
                    <div className="head font-bold text-base">{t.title}</div>
                    <div className="text-sm text-white/45 mt-1 leading-relaxed">
                      {t.items}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section id="certifications" data-rid="certs" className={r("certs")}>
            <h2
              className="head font-bold"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
            >
              <span className="text-white">CERTI</span>
              <span className="ghost">FICATIONS</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              {certifications.map((c, i) => (
                <div
                  key={i}
                  className="pcard rounded-2xl border border-white/10 bg-[#111113] p-6"
                >
                  <div className="text-[11px] head font-bold text-[#ff5a1f]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="head font-bold text-lg mt-3">{c.title}</div>
                  <div className="text-sm text-white/45 mt-2">
                    {c.org} · {c.date}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS */}
          <section id="achievements" data-rid="ach" className={r("ach")}>
            <h2
              className="head font-bold"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
            >
              <span className="text-white">KEY</span>
              <br />
              <span className="ghost">ACHIEVEMENTS</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              {achievements.map((a, i) => (
                <div
                  key={i}
                  className="pcard rounded-2xl border border-white/10 bg-[#111113] p-6 flex gap-4"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212,255,63,0.15)" }}
                  >
                    <Trophy size={18} color="#d4ff3f" />
                  </div>
                  <div>
                    <div className="head font-bold text-lg">{a.title}</div>
                    <div className="text-sm text-white/45 mt-1.5 leading-relaxed">
                      {a.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" data-rid="contact" className={r("contact")}>
            <h2
              className="head font-bold"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
            >
              <span className="text-white">LET'S WORK</span>
              <br />
              <span className="ghost">TOGETHER</span>
            </h2>
            <a
              href="mailto:priyanshusrivastava318@gmail.com"
              className="mt-10 inline-flex items-center gap-3 bg-[#ff5a1f] text-[#0b0b0c] font-semibold rounded-full py-4 px-8 head text-sm hover:brightness-110 transition"
            >
              <Send size={16} /> priyanshusrivastava318@gmail.com
            </a>
            <div className="text-white/40 text-sm mt-10 pb-10">
              Priyanshu Srivastava · +91 7006193940 · Noida, Uttar Pradesh,
              India
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
