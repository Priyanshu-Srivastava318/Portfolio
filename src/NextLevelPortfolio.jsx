import React, { useState, useEffect, useRef } from 'react';
import { Shield, Github, Linkedin, Mail, ExternalLink, Menu, X, Code, Award, ArrowRight, Sparkles, Terminal, Database, Globe, Cpu, Zap, CheckCircle, Download, Briefcase, Calendar, ArrowUpRight } from 'lucide-react';

/* ─── SCROLL REVEAL ──────────────────────────────────────────────────────── */
function useReveal() {
  const [vis, setVis] = useState({});
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVis(p => ({ ...p, [e.target.dataset.rid]: true }));
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-rid]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return vis;
}

/* ─── TYPEWRITER ─────────────────────────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [txt, setTxt] = useState('');
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    const delay = del ? speed / 2 : ci === w.length ? pause : speed;
    const t = setTimeout(() => {
      if (!del && ci < w.length) { setTxt(w.slice(0, ci + 1)); setCi(c => c + 1); }
      else if (!del) setDel(true);
      else if (del && ci > 0) { setTxt(w.slice(0, ci - 1)); setCi(c => c - 1); }
      else { setDel(false); setWi(i => (i + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return txt;
}

/* ─── ANIMATED NUMBER ─────────────────────────────────────────────────────── */
function AnimNum({ n, suffix = '' }) {
  const [v, setV] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let cur = 0; const end = +n; const step = Math.max(1, Math.ceil(end / 50));
      const t = setInterval(() => { cur = Math.min(cur + step, end); setV(cur); if (cur >= end) clearInterval(t); }, 30);
      io.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [n]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ─── CUSTOM CURSOR ─────────────────────────────────────────────────────── */
function CustomCursor() {
  const dot = useRef(); const ring = useRef();
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const move = e => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
    };
    const lerp = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring.current) ring.current.style.transform = `translate(${rx - 20}px,${ry - 20}px)`;
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);
    window.addEventListener('mousemove', move);
    const grow = () => ring.current && (ring.current.style.width = '52px', ring.current.style.height = '52px', ring.current.style.borderColor = 'rgba(201,168,76,0.7)');
    const shrink = () => ring.current && (ring.current.style.width = '40px', ring.current.style.height = '40px', ring.current.style.borderColor = 'rgba(201,168,76,0.35)');
    document.addEventListener('mouseover', e => { if (e.target.closest('a,button')) grow(); else shrink(); });
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dot} style={{ position:'fixed',top:0,left:0,width:8,height:8,background:'#c9a84c',borderRadius:'50%',pointerEvents:'none',zIndex:9999,transition:'transform 0.05s linear' }} />
      <div ref={ring} style={{ position:'fixed',top:0,left:0,width:40,height:40,border:'1px solid rgba(201,168,76,0.35)',borderRadius:'50%',pointerEvents:'none',zIndex:9998,transition:'width 0.2s,height 0.2s,border-color 0.2s' }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSec, setActiveSec] = useState('hero');
  const vis = useReveal();
  const typed = useTypewriter(['Full Stack Developer', 'MERN Stack Engineer', 'GenAI Builder', 'Startup Thinker', 'Problem Solver']);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const ids = ['hero','experience','projects','skills','certifications'];
    const fn = () => { for (const id of [...ids].reverse()) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 120) { setActiveSec(id); break; } } };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* ── DATA ──────────────────────────────────────────────────────────────── */
  const experiences = [
    {
      role: "Web Development Intern (Laravel/PHP)",
      company: "TripLodge Universe", location: "Hotel Booking SaaS Platform", period: "Jul 2026 – Present",
      points: ["Configured a full local dev environment (XAMPP, MySQL/MariaDB, Composer, PHP) for an existing Laravel hotel-management SaaS, independently resolving environment and database migration conflicts","Designed and built admin panel modules — Hotels, Users, Bookings, OTA Monitoring, Settlements, Reports, Settings — using Laravel's MVC architecture, matching the existing Tailwind CSS design system","Implemented search/filter, approval workflows, and paginated data tables while debugging route, model, and view-resolution issues using Laravel's stack traces"]
    },
    {
      role: "MERN Stack with GenAI Intern",
      company: "ShapeMySkills by Ducat", location: "Noida", period: "Jul – Aug 2025",
      points: ["Built 3+ full-stack modules using React, Node.js, MongoDB & GenAI APIs — cut API response time by 30% through query optimisation and caching","Cut deployment debugging time by 35% via optimised build-pipeline checks","Automated Jest regression tests, saving roughly 4 QA hours per sprint"]
    },
    {
      role: "Data Analyst Trainee",
      company: "Skillrisers Infotech Pvt. Ltd.", location: "Ghaziabad", period: "Jan – Feb 2024",
      points: ["Migrated 4 spreadsheet-based reporting workflows to structured data pipelines, shrinking manual reporting time by 30% across 3 client projects","Conducted client requirement gathering, market mapping, and internal product testing","Delivered all engagements with zero post-launch defects"]
    }
  ];

  const projects = [
    { num:"01", title:"BHARAT-Freelance", tag:"Marketplace · MERN", desc:"Full-stack freelance marketplace with role-based JWT authentication, Razorpay escrow payments, and an ATS-style candidate ranking engine — benchmarked to sustain 100+ daily requests.", impact:["50% less screening effort","100+ daily requests","Escrow payments"], tech:["React","Node.js","MongoDB","Razorpay","REST APIs"], github:"https://github.com/Priyanshu-Srivastava318/Bharat-Freelance", live:"https://bharat-freelance.vercel.app/" },
    { num:"02", title:"INQUISITOR", tag:"SIEM · AI · Security", desc:"AI-powered SIEM assistant letting analysts query security logs in natural language. ElasticSearch-based indexing across 10,000+ daily log entries with real-time search.", impact:["10,000+ logs/day","30% faster response","Natural language search"], tech:["PostgreSQL","Express","React","Node.js","ElasticSearch","AI APIs"], github:"https://github.com/Priyanshu-Srivastava318/Inquisitor", live:"https://inquisitor-model.vercel.app/" },
    { num:"03", title:"LuminX", tag:"Image Enhancement · ML", desc:"Low-light image enhancement platform with a drag-drop workflow, real-time preview, and a modular Python ML backend for inference.", impact:["5x faster inference","<30s processing","Real-time preview"], tech:["React","Python","Tailwind","Vite"], github:"https://github.com/Priyanshu-Srivastava318/Lumin-X-Image-Enhancement-Model-", live:"https://lumin-x-eight.vercel.app/" },
    { num:"04", title:"HairCare-AI", tag:"Healthcare · Diagnostics", desc:"AI diagnostic platform with a trained ML model integrated into a modular MERN backend, generating personalised hair-care recommendations.", impact:["70% accuracy lift","ML diagnostics","Personalised reports"], tech:["React","Node.js","MongoDB","Python","AI/ML"], github:"https://github.com/Priyanshu-Srivastava318/Hairnet-AI", live:"https://haircare-ai.vercel.app/" },
    { num:"05", title:"U-Craft", tag:"E-Commerce · Artists", desc:"Live multi-vendor art marketplace with Razorpay checkout and real-time order tracking, validated through 30+ stakeholder interviews and built for multi-city expansion.", impact:["50+ users, 10+ artists","30+ interviews","Multi-city ready"], tech:["React","Node.js","MongoDB","Express"], github:"https://github.com/Priyanshu-Srivastava318/U-Craft-MERN-Based", live:"https://www.u-craft.in/" },
    { num:"06", title:"Jobify", tag:"Job Tracker · AI", desc:"Personalized job-application tracker with resume-to-job-description matching, a 100-point automated ATS scoring engine, and real-time application status tracking.", impact:["100-point ATS score","Real-time tracking","Resume matching"], tech:["React","Node.js","MongoDB","AI APIs"], github:"https://github.com/Priyanshu-Srivastava318/Jobify", live:"https://jobify-delta-three.vercel.app/" }
  ];

  const skills = [
    { cat:"Frontend", items:["React.js","Next.js","JavaScript ES6+","HTML5 / CSS3","Tailwind CSS","Responsive Design","SPA"] },
    { cat:"Backend", items:["Node.js","Express.js","MongoDB","PostgreSQL","MySQL","REST APIs","JWT / OAuth"] },
    { cat:"Languages", items:["JavaScript","Java","Python","SQL","C"] },
    { cat:"DevOps & Cloud", items:["Git / GitHub","Docker","AWS EC2 & S3","Vercel","Firebase","CI/CD","Render"] },
    { cat:"AI & Specialisations", items:["GenAI APIs","MERN Stack","ElasticSearch","AI/ML Integration","Performance Optimisation","Product Thinking"] },
    { cat:"Additional", items:["PHP","Laravel","Blade","MySQL/MariaDB"] },
  ];

  const certs = [
    { title:"React & Next.js with AI-Powered Projects", org:"Udemy", date:"Jul 2026" },
    { title:"AI for Business Essentials", org:"HP LIFE", date:"Jan 2026" },
    { title:"Docker & Kubernetes Fundamentals", org:"Scaler", date:"Dec 2025" },
    { title:"React Masterclass", org:"Scaler", date:"Dec 2025" },
    { title:"Full Stack Web Development", org:"Udemy", date:"2025" },
    { title:"DSA in Java (150+ LeetCode)", org:"Udemy", date:"2025" },
  ];

  const navLinks = [
    { href:'#experience', id:'experience', label:'Work' },
    { href:'#projects', id:'projects', label:'Projects' },
    { href:'#skills', id:'skills', label:'Skills' },
    { href:'#certifications', id:'certifications', label:'Certs' },
  ];

  const r = (id, extra='') =>
    `${extra} transition-all duration-700 ease-out ${vis[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  /* ── RENDER ─────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e0d0] overflow-x-hidden" style={{cursor:'none'}}>
      <CustomCursor />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root{--cream:#e8e0d0;--gold:#c9a84c;--dim:#6b6558;--surface:#111110;--border:rgba(232,224,208,0.08);}
        .serif{font-family:'Cormorant Garamond',Georgia,serif;}
        .mono{font-family:'DM Mono','Courier New',monospace;}

        /* grain */
        body::before{content:'';position:fixed;inset:0;opacity:.035;pointer-events:none;z-index:999;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
          background-size:200px 200px;}

        ::-webkit-scrollbar{width:2px;}
        ::-webkit-scrollbar-track{background:#0a0a0a;}
        ::-webkit-scrollbar-thumb{background:var(--gold);}

        /* typewriter blink */
        .blink::after{content:'_';animation:bl 1s step-end infinite;color:var(--gold);}
        @keyframes bl{0%,100%{opacity:1}50%{opacity:0}}

        /* underline anim */
        .ul-a{position:relative;}
        .ul-a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:var(--gold);transition:width .3s ease;}
        .ul-a:hover::after,.ul-a.act::after{width:100%;}

        /* hero fade */
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .fu1{animation:fadeUp .9s ease .05s both;}
        .fu2{animation:fadeUp .9s ease .18s both;}
        .fu3{animation:fadeUp .9s ease .32s both;}
        .fu4{animation:fadeUp .9s ease .48s both;}
        .fu5{animation:fadeUp .9s ease .62s both;}

        /* marquee */
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .marquee{animation:marquee 25s linear infinite;}

        /* project row */
        .proj-row{transition:all .35s cubic-bezier(.16,1,.3,1);border-bottom:1px solid var(--border);}
        .proj-row:hover{background:var(--surface);padding-left:1.5rem;padding-right:1.5rem;}
        .proj-row:hover .p-num{color:var(--gold);}
        .proj-row:hover .p-title{color:var(--gold);}
        .proj-row:hover .p-arrow{opacity:1;transform:translate(3px,-3px);}
        .p-arrow{transition:all .3s ease;opacity:.25;}

        /* skill row */
        .sk-row{border-bottom:1px solid var(--border);transition:all .25s ease;}
        .sk-row:hover{background:var(--surface);padding-left:1rem;}
        .sk-row:hover .sk-cat{color:var(--gold);}

        /* cert card */
        .c-card{border:1px solid var(--border);transition:all .3s ease;}
        .c-card:hover{border-color:rgba(201,168,76,.25);background:var(--surface);}
        .c-card:hover .c-num{color:var(--gold);}

        /* exp row */
        .ex-row{border-bottom:1px solid var(--border);transition:all .4s ease;}
        .ex-row:hover{background:var(--surface);padding-left:1.5rem;padding-right:1.5rem;}

        /* mag btn */
        .mag{transition:transform .2s ease,box-shadow .2s ease;}
        .mag:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(201,168,76,.18);}

        /* tag */
        .tg{transition:all .2s;}
        .tg:hover{background:rgba(201,168,76,.12);border-color:rgba(201,168,76,.35);color:var(--gold);}

        /* float */
        @keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .flt{animation:flt 5s ease-in-out infinite;}
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="fixed w-full z-50" style={{
        background: scrollY>50 ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrollY>50 ? 'blur(24px)' : 'none',
        borderBottom: scrollY>50 ? '1px solid rgba(232,224,208,0.06)' : 'none',
        transition:'all .4s ease'
      }}>
        {/* progress line */}
        <div style={{height:1,background:'linear-gradient(to right,#c9a84c,#e8c97a)',width:`${Math.min((scrollY/3500)*100,100)}%`,transition:'width .15s linear'}} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <a href="#hero" className="group">
            <div className="serif text-xl font-light tracking-wide text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors duration-300">
              Priyanshu<span className="italic"> Srivastava</span>
            </div>
            <div className="mono text-[9px] text-[var(--dim)] tracking-[.22em] uppercase mt-0.5">Full Stack Developer</div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l=>(
              <a key={l.id} href={l.href} className={`ul-a mono text-[10px] tracking-[.2em] uppercase text-[var(--dim)] hover:text-[var(--cream)] transition-colors ${activeSec===l.id?'act text-[var(--cream)]':''}`}>
                {l.label}
              </a>
            ))}
            <div style={{width:1,height:14,background:'var(--border)'}} />
            <a href="mailto:priyanshusrivastava318@gmail.com" className="mag mono text-[10px] tracking-[.2em] uppercase px-5 py-2.5 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#0a0a0a] transition-all duration-300 font-medium">
              Hire Me
            </a>
            <a href="/Priyanshu_Srivastava_CV.pdf" download className="mag flex items-center gap-2 mono text-[10px] tracking-[.2em] uppercase px-4 py-2.5 border border-[var(--border)] text-[var(--dim)] hover:border-[var(--cream)] hover:text-[var(--cream)] transition-all duration-300">
              <Download className="w-3 h-3"/> CV
            </a>
          </div>

          <button className="md:hidden p-2 text-[var(--cream)]" onClick={()=>setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0d0d0c] border-t border-[var(--border)]">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map(l=>(
                <a key={l.id} href={l.href} onClick={()=>setMenuOpen(false)} className="block py-3.5 mono text-xs tracking-[.2em] uppercase text-[var(--dim)] hover:text-[var(--cream)] transition-colors border-b border-[var(--border)]">
                  {l.label}
                </a>
              ))}
              <div className="pt-5 space-y-3">
                <a href="mailto:priyanshusrivastava318@gmail.com" className="block py-3 text-center mono text-xs tracking-[.2em] uppercase border border-[var(--gold)] text-[var(--gold)]">Hire Me</a>
                <a href="/Priyanshu_Srivastava_CV.pdf" download className="block py-3 text-center mono text-xs tracking-[.2em] uppercase border border-[var(--border)] text-[var(--dim)]">Download CV</a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 md:pb-28 pt-28">
        {/* ghost bg text */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 serif text-[22vw] font-light leading-none tracking-tighter select-none pointer-events-none" style={{color:'rgba(255,255,255,.018)'}}>
          DEV
        </div>
        {/* subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'linear-gradient(rgba(232,224,208,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(232,224,208,.015) 1px,transparent 1px)',backgroundSize:'80px 80px'}} />

        {/* available badge — top right */}
        <div className="absolute top-24 right-6 md:right-12 fu1">
          <div className="flex items-center gap-2 mono text-[10px] tracking-[.2em] uppercase text-[var(--dim)]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
            Available for work
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-14">

            {/* LEFT — headline */}
            <div className="lg:max-w-[60%]">
              <div className="mono text-[10px] text-[var(--gold)] tracking-[.3em] uppercase mb-8 fu1">
                — Ghaziabad, India · B.Tech CSE 2026
              </div>
              <div className="serif fu2" style={{fontSize:'clamp(3.5rem,10vw,9rem)',fontWeight:300,lineHeight:.88,letterSpacing:'-.02em'}}>
                <div className="text-[var(--cream)]">Priyanshu</div>
                <div className="italic" style={{color:'var(--dim)'}}>Srivastava</div>
              </div>
              <div className="mt-8 fu3 flex items-center gap-4">
                <div style={{width:48,height:1,background:'var(--gold)'}} />
                <span className="mono text-sm text-[var(--cream)] blink">{typed}</span>
              </div>
            </div>

            {/* RIGHT — description + stats + cta */}
            <div className="lg:max-w-[340px] space-y-8 fu4">
              <p className="text-sm leading-relaxed" style={{color:'var(--dim)'}}>
                I build scalable full-stack products — from freelance marketplaces to AI-powered security tools — that ship and actually matter.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[{n:'6',s:'+',l:'Projects'},{n:'3',s:'',l:'Positions'},{n:'50',s:'+',l:'Users served'},{n:'150',s:'+',l:'LeetCode'}].map((st,i)=>(
                  <div key={i}>
                    <div className="serif font-light" style={{fontSize:'2.4rem',color:'var(--cream)',lineHeight:1}}>
                      <AnimNum n={st.n} suffix={st.s}/>
                    </div>
                    <div className="mono text-[9px] tracking-[.2em] uppercase mt-1" style={{color:'var(--dim)'}}>{st.l}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a href="#projects" className="mag group flex items-center gap-2 px-6 py-3 mono text-[10px] tracking-[.2em] uppercase font-medium" style={{background:'var(--gold)',color:'#0a0a0a'}}>
                  View Work <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/>
                </a>
                <a href="https://github.com/Priyanshu-Srivastava318" target="_blank" rel="noopener noreferrer" className="mag p-3 border text-[var(--dim)] hover:text-[var(--cream)] hover:border-[var(--cream)] transition-all" style={{borderColor:'var(--border)'}}>
                  <Github className="w-4 h-4"/>
                </a>
                <a href="https://www.linkedin.com/in/priyanshu-srivastava-dev/" target="_blank" rel="noopener noreferrer" className="mag p-3 border text-[var(--dim)] hover:text-[var(--cream)] hover:border-[var(--cream)] transition-all" style={{borderColor:'var(--border)'}}>
                  <Linkedin className="w-4 h-4"/>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 fu5" style={{borderTop:'1px solid var(--border)'}}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
            <div className="mono text-[9px] tracking-[.18em] uppercase" style={{color:'var(--dim)'}}>
              IMS Engineering College · CGPA 7.88 · 2022–2026
            </div>
            <div className="mono text-[9px] tracking-[.18em] uppercase hidden md:block flt" style={{color:'var(--dim)'}}>
              ↓ Scroll
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ───────────────────────────────────────────────────── */}
      <div className="overflow-hidden py-4" style={{borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',background:'var(--surface)'}}>
        <div className="marquee flex gap-16 whitespace-nowrap" style={{width:'max-content'}}>
          {['React.js','Node.js','MongoDB','PostgreSQL','Docker','AWS','GenAI APIs','ElasticSearch','Razorpay','JWT','Tailwind CSS','Express.js','Python','REST APIs','Vercel','PHP','Laravel',
            'React.js','Node.js','MongoDB','PostgreSQL','Docker','AWS','GenAI APIs','ElasticSearch','Razorpay','JWT','Tailwind CSS','Express.js','Python','REST APIs','Vercel','PHP','Laravel'
          ].map((t,i)=>(
            <span key={i} className="mono text-[10px] tracking-[.2em] uppercase flex items-center gap-16" style={{color:'var(--dim)'}}>
              {t} <span style={{color:'var(--gold)'}}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── EXPERIENCE ──────────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div data-rid="exp-h" className={r('exp-h','flex items-end justify-between mb-16 pb-8')} style={{borderBottom:'1px solid var(--border)'}}>
            <div>
              <div className="mono text-[10px] tracking-[.3em] uppercase mb-3" style={{color:'var(--gold)'}}>02 / Work</div>
              <h2 className="serif font-light" style={{fontSize:'clamp(2.5rem,6vw,5.5rem)'}}>Experience</h2>
            </div>
            <div className="mono text-[10px] hidden md:block" style={{color:'var(--dim)'}}>3 Positions</div>
          </div>

          <div>
            {experiences.map((ex,i)=>(
              <div key={i} data-rid={`ex-${i}`} className={r(`ex-${i}`,'ex-row group py-10 md:py-14 px-0 hover:px-6 rounded-none')} style={{transitionDelay:`${i*.12}s`}}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="serif font-light text-2xl md:text-3xl">{ex.role}</h3>
                      <span className="mono text-[9px] px-3 py-1 tracking-widest uppercase" style={{border:'1px solid var(--border)',color:'var(--dim)'}}>{ex.period}</span>
                    </div>
                    <div className="mono text-xs mb-6" style={{color:'var(--gold)'}}>{ex.company} — {ex.location}</div>
                    <ul className="space-y-2.5">
                      {ex.points.map((p,j)=>(
                        <li key={j} className="flex items-start gap-3 text-sm" style={{color:'var(--dim)'}}>
                          <span style={{color:'var(--gold)',marginTop:2,flexShrink:0}}>→</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mono text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity md:mt-1.5" style={{color:'var(--dim)'}}>
                    {i===0?'Latest':'Prev'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-36 px-6 md:px-12" style={{background:'var(--surface)'}}>
        <div className="max-w-7xl mx-auto">
          <div data-rid="proj-h" className={r('proj-h','flex items-end justify-between mb-16 pb-8')} style={{borderBottom:'1px solid var(--border)'}}>
            <div>
              <div className="mono text-[10px] tracking-[.3em] uppercase mb-3" style={{color:'var(--gold)'}}>03 / Projects</div>
              <h2 className="serif font-light" style={{fontSize:'clamp(2.5rem,6vw,5.5rem)'}}>Selected Work</h2>
            </div>
            <div className="mono text-[10px] hidden md:block" style={{color:'var(--dim)'}}>6 Projects</div>
          </div>

          <div>
            {projects.map((p,i)=>(
              <div key={i} data-rid={`p-${i}`} className={r(`p-${i}`,'proj-row group py-8 md:py-12')} style={{transitionDelay:`${i*.07}s`}}>
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                  {/* number */}
                  <div className="p-num mono text-xs transition-colors duration-300 md:pt-1 md:w-8 flex-shrink-0" style={{color:'var(--dim)'}}>{p.num}</div>

                  {/* content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="p-title serif font-light transition-colors duration-300" style={{fontSize:'clamp(1.4rem,3vw,2.2rem)'}}>{p.title}</h3>
                        <div className="mono text-[9px] tracking-widest uppercase mt-1" style={{color:'var(--dim)'}}>{p.tag}</div>
                      </div>
                      <ArrowUpRight className="p-arrow w-5 h-5 flex-shrink-0 mt-1" style={{color:'var(--gold)'}}/>
                    </div>

                    <p className="text-sm leading-relaxed mb-5 max-w-2xl" style={{color:'var(--dim)'}}>{p.desc}</p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.map((t,j)=>(
                          <span key={j} className="tg mono text-[9px] px-2.5 py-1 border tracking-wider cursor-default" style={{borderColor:'var(--border)',color:'var(--dim)'}}>{t}</span>
                        ))}
                      </div>
                      <div className="flex gap-2.5 sm:ml-auto flex-shrink-0">
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="mag mono text-[9px] tracking-widest uppercase px-4 py-2 border flex items-center gap-1.5 transition-all" style={{borderColor:'var(--border)',color:'var(--dim)'}}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--cream)';e.currentTarget.style.color='var(--cream)'}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--dim)'}}>
                          <Github className="w-3 h-3"/> Code
                        </a>
                        {p.live&&(
                          <a href={p.live} target="_blank" rel="noopener noreferrer" className="mag mono text-[9px] tracking-widest uppercase px-4 py-2 flex items-center gap-1.5 font-medium transition-all" style={{background:'var(--gold)',color:'#0a0a0a'}}
                            onMouseEnter={e=>e.currentTarget.style.background='var(--cream)'}
                            onMouseLeave={e=>e.currentTarget.style.background='var(--gold)'}>
                            <ExternalLink className="w-3 h-3"/> Live
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3.5">
                      {p.impact.map((item,j)=>(
                        <span key={j} className="mono text-[9px] flex items-center gap-1.5" style={{color:'var(--dim)'}}>
                          <span style={{color:'#10b981'}}>✓</span> {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div data-rid="sk-h" className={r('sk-h','flex items-end justify-between mb-16 pb-8')} style={{borderBottom:'1px solid var(--border)'}}>
            <div>
              <div className="mono text-[10px] tracking-[.3em] uppercase mb-3" style={{color:'var(--gold)'}}>04 / Skills</div>
              <h2 className="serif font-light" style={{fontSize:'clamp(2.5rem,6vw,5.5rem)'}}>Tech Arsenal</h2>
            </div>
          </div>

          <div>
            {skills.map((sk,i)=>(
              <div key={i} data-rid={`sk-${i}`} className={r(`sk-${i}`,'sk-row group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-6 px-0 hover:px-4 cursor-default')} style={{transitionDelay:`${i*.08}s`}}>
                <div className="sk-cat mono text-[10px] tracking-[.2em] uppercase transition-colors duration-300 md:w-48 flex-shrink-0" style={{color:'var(--dim)'}}>{sk.cat}</div>
                <div className="flex flex-wrap gap-2">
                  {sk.items.map((item,j)=>(
                    <span key={j} className="tg mono text-[9px] px-3 py-1.5 border tracking-wider cursor-default" style={{borderColor:'var(--border)',color:'var(--dim)'}}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ──────────────────────────────────────────────────── */}
      <section id="certifications" className="py-24 md:py-36 px-6 md:px-12" style={{background:'var(--surface)'}}>
        <div className="max-w-7xl mx-auto">
          <div data-rid="cert-h" className={r('cert-h','flex items-end justify-between mb-16 pb-8')} style={{borderBottom:'1px solid var(--border)'}}>
            <div>
              <div className="mono text-[10px] tracking-[.3em] uppercase mb-3" style={{color:'var(--gold)'}}>05 / Learning</div>
              <h2 className="serif font-light" style={{fontSize:'clamp(2.5rem,6vw,5.5rem)'}}>Certifications</h2>
            </div>
            <div className="mono text-[10px] hidden md:block" style={{color:'var(--dim)'}}>{certs.length} Certificates</div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {certs.map((c,i)=>(
              <div key={i} data-rid={`c-${i}`} className={r(`c-${i}`,'c-card p-6 md:p-8 cursor-default')} style={{transitionDelay:`${i*.06}s`}}>
                <div className="c-num mono text-[10px] tracking-widest mb-6 transition-colors duration-300" style={{color:'var(--dim)'}}>{String(i+1).padStart(2,'0')}</div>
                <div className="serif font-light text-lg md:text-xl leading-snug mb-3" style={{color:'var(--cream)'}}>{c.title}</div>
                <div className="mono text-[9px] tracking-widest uppercase" style={{color:'var(--gold)'}}>{c.org}</div>
                <div className="mono text-[9px] tracking-widest mt-1" style={{color:'var(--dim)'}}>{c.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div data-rid="ach-h" className={r('ach-h','flex items-end justify-between mb-16 pb-8')} style={{borderBottom:'1px solid var(--border)'}}>
            <div>
              <div className="mono text-[10px] tracking-[.3em] uppercase mb-3" style={{color:'var(--gold)'}}>06 / Wins</div>
              <h2 className="serif font-light" style={{fontSize:'clamp(2.5rem,6vw,5.5rem)'}}>Achievements</h2>
            </div>
          </div>
          <div data-rid="ach-g" className={r('ach-g','grid md:grid-cols-3 gap-0')}>
            {[
              {n:'01',title:'AIR 2051 — NCAT 2026',sub:'Ranked among 8,00,000+ participants nationwide'},
              {n:'02',title:'Ideathon 2025 Winner',sub:'Melange Tech Fest — innovative tech-driven solution'},
              {n:'03',title:'National Top 10',sub:'Hackathon at COER Roorkee — among 105 competing teams'},
              {n:'04',title:'Vice President',sub:'Advitiya Cultural Society — promoted from Secretary, leading 50+ members across 5 clubs'},
              {n:'05',title:'Founder, U-Craft',sub:'Scaled a student-led marketplace startup to 50+ users and 10+ onboarded artists'},
              {n:'06',title:'Hackathon Participant',sub:'GL Bajaj Institute of Technology & Management'},
            ].map((a,i)=>(
              <div key={i} className="c-card p-8 md:p-10 cursor-default">
                <div className="c-num mono text-[10px] tracking-widest mb-6 transition-colors duration-300" style={{color:'var(--dim)'}}>{a.n}</div>
                <div className="serif font-light text-2xl md:text-3xl mb-3" style={{color:'var(--cream)'}}>{a.title}</div>
                <div className="mono text-xs leading-relaxed" style={{color:'var(--dim)'}}>{a.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12" style={{background:'var(--surface)',borderTop:'1px solid var(--border)'}}>
        <div className="max-w-7xl mx-auto">
          <div data-rid="cta" className={r('cta')}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-14">
              <div>
                <div className="mono text-[10px] tracking-[.3em] uppercase mb-6" style={{color:'var(--gold)'}}>07 / Let's Talk</div>
                <h2 className="serif font-light leading-[.9] tracking-tight" style={{fontSize:'clamp(3rem,9vw,8rem)'}}>
                  Got a project<br/><span className="italic" style={{color:'var(--dim)'}}>in mind?</span>
                </h2>
              </div>

              <div className="lg:max-w-sm space-y-8">
                <p className="text-sm leading-relaxed" style={{color:'var(--dim)'}}>
                  Open for freelance gigs, startup collaborations, and full-time engineering roles. Let's ship something worth talking about.
                </p>
                <div className="space-y-3">
                  <a href="mailto:priyanshusrivastava318@gmail.com" className="mag group flex items-center justify-between w-full px-6 py-4 border transition-all duration-300" style={{borderColor:'var(--gold)',color:'var(--gold)'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='var(--gold)';e.currentTarget.style.color='#0a0a0a'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--gold)'}}>
                    <span className="mono text-xs tracking-[.2em] uppercase">Email Me</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                  </a>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {href:"https://www.linkedin.com/in/priyanshu-srivastava-dev/",icon:<Linkedin className="w-3.5 h-3.5"/>},
                      {href:"https://github.com/Priyanshu-Srivastava318",icon:<Github className="w-3.5 h-3.5"/>},
                      {href:"/Priyanshu_Srivastava_CV.pdf",icon:<Download className="w-3.5 h-3.5"/>,download:true},
                    ].map((btn,i)=>(
                      <a key={i} href={btn.href} target={btn.download?undefined:"_blank"} rel="noopener noreferrer" download={btn.download} className="mag flex items-center justify-center py-3 border transition-all" style={{borderColor:'var(--border)',color:'var(--dim)'}}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--cream)';e.currentTarget.style.color='var(--cream)'}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--dim)'}}>
                        {btn.icon}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="mono text-[10px] tracking-widest" style={{color:'var(--dim)'}}>
                  priyanshusrivastava318@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="px-6 md:px-12 py-6" style={{borderTop:'1px solid var(--border)'}}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="serif text-sm italic" style={{color:'var(--dim)'}}>Priyanshu Srivastava — 2026</div>
          <div className="mono text-[9px] tracking-widest uppercase" style={{color:'var(--dim)'}}>Crafted with React · Deployed on Vercel</div>
          <div className="flex gap-5 mono text-[9px] tracking-widest uppercase">
            <a href="https://github.com/Priyanshu-Srivastava318" className="ul-a hover:text-[var(--cream)] transition-colors" style={{color:'var(--dim)'}}>GitHub</a>
            <a href="https://www.linkedin.com/in/priyanshu-srivastava-dev/" className="ul-a hover:text-[var(--cream)] transition-colors" style={{color:'var(--dim)'}}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}