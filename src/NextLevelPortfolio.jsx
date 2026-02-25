import React, { useState, useEffect, useRef } from 'react';
import { Shield, Github, Linkedin, Mail, ExternalLink, Menu, X, Code, Award, ArrowRight, Sparkles, Terminal, Database, Globe, Cpu, Zap, Star, CheckCircle, Download, Briefcase, Calendar } from 'lucide-react';

// ── Utility: Scroll-reveal hook ──────────────────────────────────────────────
function useScrollReveal() {
  const [revealed, setRevealed] = useState({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setRevealed(prev => ({ ...prev, [e.target.dataset.id]: true }));
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('[data-id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return revealed;
}

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(words, speed = 90, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === current.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(w => (w + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const end = parseInt(to);
        const step = Math.ceil(end / 40);
        const t = setInterval(() => {
          start += step;
          if (start >= end) { setVal(end); clearInterval(t); }
          else setVal(start);
        }, 40);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Particle Canvas ───────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth < 768 ? 30 : 70;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    // mouse glow
    let mx = -999, my = -999;
    const onMove = e => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(99,179,237,${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        // mouse interaction
        const dx = p.x - mx, dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) { p.x += dx / d * 0.8; p.y += dy / d * 0.8; }

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = `rgba(139,92,246,${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

// ── Glitch Text ───────────────────────────────────────────────────────────────
function GlitchText({ children, className }) {
  return (
    <span className={`relative inline-block glitch-wrapper ${className}`} data-text={children}>
      {children}
      <style>{`
        .glitch-wrapper { position: relative; }
        .glitch-wrapper::before,
        .glitch-wrapper::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          background: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }
        .glitch-wrapper::before {
          background: linear-gradient(to right, #60a5fa, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glitch1 3.5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
        }
        .glitch-wrapper::after {
          background: linear-gradient(to right, #60a5fa, #a78bfa, #ec4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glitch2 3.5s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        }
        @keyframes glitch1 {
          0%,94%,100% { transform: none; opacity: 1; }
          95% { transform: translate(-2px, -1px) skewX(-2deg); opacity: 0.8; }
          97% { transform: translate(2px, 1px) skewX(1deg); opacity: 0.9; }
        }
        @keyframes glitch2 {
          0%,94%,100% { transform: none; opacity: 1; }
          96% { transform: translate(2px, 1px) skewX(2deg); opacity: 0.8; }
          98% { transform: translate(-1px, -2px); opacity: 0.9; }
        }
      `}</style>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const revealed = useScrollReveal();
  const typewriter = useTypewriter(['Full Stack Developer', 'MERN Stack Engineer', 'GenAI Integrator', 'Problem Solver', 'Startup Builder']);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Nav active section tracker
  useEffect(() => {
    const sections = ['top', 'experience', 'projects', 'skills', 'certifications'];
    const handler = () => {
      for (const s of sections) {
        const el = document.getElementById(s);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) { setActiveSection(s); break; }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navProgress = Math.min(scrollY / 400, 1);

  // ── DATA ───────────────────────────────────────────────────────────────────

  const experiences = [
    {
      role: "MERN Stack with GenAI Intern",
      company: "ShapeMySkills by Ducat",
      location: "Noida, India",
      period: "Jul 2025 – Aug 2025",
      color: "from-blue-500 to-cyan-500",
      points: [
        "Developed and deployed 3+ Full-stack modules using React.js, Node.js, MongoDB, and GenAI APIs",
        "Optimized build workflows, reducing deployment debugging time by 35%",
        "Automated regression test cycles, cutting API integration errors by 25%",
      ]
    },
    {
      role: "Data Analyst Trainee",
      company: "Skillrisers Infotech Pvt. Ltd.",
      location: "Ghaziabad, India",
      period: "Jan 2024 – Feb 2024",
      color: "from-purple-500 to-pink-500",
      points: [
        "Conducted requirement gathering and market mapping, improving documentation accuracy by 20%",
        "Engineered reporting dashboards reducing manual reporting time by 30%",
        "Collaborated on UI workflows and product testing ensuring error-free releases",
      ]
    }
  ];

  const projects = [
    {
      title: "BHARAT-Freelance",
      tagline: "Eliminating Fraud in Freelancing",
      description: "Full-stack marketplace with escrow-based payment system, ATS-powered candidate ranking, and Razorpay integration. Optimized to handle 100+ daily requests with 99.9% uptime.",
      impact: ["95% fraud reduction", "40% less resume bias", "5-10L/month projected scale"],
      tech: ["React", "Node.js", "MongoDB", "Razorpay", "REST APIs"],
      github: "https://github.com/Priyanshu-Srivastava318/Bharat-Freelance",
      live: "https://bharat-freelance.vercel.app/",
      color: "from-blue-500 to-cyan-500",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "INQUISITOR",
      tagline: "AI-Powered SIEM Assistant",
      description: "AI-integrated SIEM model enabling security analysts to investigate logs using natural language queries. ElasticSearch-based log analysis with anomaly detection and real-time alert classification.",
      impact: ["AI-driven threat detection", "ElasticSearch log analysis", "Real-time alert classification"],
      tech: ["PostgreSQL", "Express", "React", "Node.js", "ElasticSearch", "AI APIs"],
      github: "https://github.com/Priyanshu-Srivastava318/Inquisitor",
      live: "https://inquisitor-model.vercel.app/",
      color: "from-indigo-500 to-blue-500",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "LuminX",
      tagline: "Low-Light Image Enhancement",
      description: "Premium image enhancement platform with drag-drop workflow, real-time preview, and modular ML-ready architecture. Processed 1000+ images with seamless UX. 35% improved user engagement.",
      impact: ["1000+ images processed", "Real-time preview", "ML-ready architecture"],
      tech: ["React", "Tailwind CSS", "Python", "Vite", "JavaScript"],
      github: "https://github.com/Priyanshu-Srivastava318/Lumin-X-Image-Enhancement-Model-",
      live: "https://lumin-x-eight.vercel.app/",
      color: "from-yellow-500 to-orange-500",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: "HairCare-AI",
      tagline: "AI-Powered Healthcare Diagnostics",
      description: "ML-ready diagnostic platform analyzing 50+ hair conditions with 85% accuracy. Features modular architecture and detailed personalized reports serving 200+ users.",
      impact: ["85% accuracy", "200+ users", "50+ conditions analyzed"],
      tech: ["React", "Node.js", "MongoDB", "Python", "AI/ML"],
      github: "https://github.com/Priyanshu-Srivastava318/Hairnet-AI",
      live: "https://haircare-ai.vercel.app/",
      color: "from-purple-500 to-pink-500",
      icon: <Cpu className="w-6 h-6" />
    },
    {
      title: "U-Craft",
      tagline: "Artist Marketplace Platform",
      description: "Custom art ordering platform validated through 30+ stakeholder interviews. Scalable MERN architecture supporting multi-city expansion with premium dark UI.",
      impact: ["30+ artist interviews", "Multi-city expansion ready", "Premium UI/UX"],
      tech: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/Priyanshu-Srivastava318",
      live: "https://u-craft.onrender.com",
      color: "from-green-500 to-emerald-500",
      icon: <Terminal className="w-6 h-6" />
    },
    {
      title: "HR Management System",
      tagline: "Enterprise HRMS Solution",
      description: "Comprehensive HRMS with attendance tracking, employee management, leave workflows, and role-based JWT authentication. Built during internship with 30% reduction in manual reporting.",
      impact: ["Role-based auth", "Attendance tracking", "Leave workflows"],
      tech: ["React", "Node.js", "MongoDB", "JWT"],
      github: "https://github.com/Priyanshu-Srivastava318",
      live: null,
      color: "from-red-500 to-rose-500",
      icon: <Database className="w-6 h-6" />
    }
  ];

  const skills = [
    {
      category: "Frontend",
      icon: <Code className="w-7 h-7" />,
      color: "from-blue-500 to-cyan-500",
      items: ["React.js", "Next.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design", "SPA"]
    },
    {
      category: "Backend",
      icon: <Database className="w-7 h-7" />,
      color: "from-purple-500 to-pink-500",
      items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "MySQL", "REST APIs", "JWT Auth", "OAuth"]
    },
    {
      category: "Languages",
      icon: <Terminal className="w-7 h-7" />,
      color: "from-green-500 to-emerald-500",
      items: ["JavaScript", "Java", "Python", "SQL", "C"]
    },
    {
      category: "DevOps & Cloud",
      icon: <Globe className="w-7 h-7" />,
      color: "from-orange-500 to-yellow-500",
      items: ["Git / GitHub", "Docker", "AWS (EC2, S3)", "Vercel", "Render", "Firebase", "CI/CD", "Postman"]
    },
    {
      category: "AI & Specializations",
      icon: <Cpu className="w-7 h-7" />,
      color: "from-red-500 to-pink-500",
      items: ["GenAI APIs", "MERN Stack", "AI/ML Integration", "ElasticSearch", "Performance Optimization", "Product Thinking"]
    }
  ];

  const certifications = [
    { title: "AI Tools Workshop", org: "Be10x", date: "Feb 2026", icon: <Sparkles className="w-5 h-5" />, color: "from-pink-500 to-rose-500" },
    { title: "AI for Business Essentials", org: "HP LIFE", date: "Jan 2026", icon: <Cpu className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { title: "Docker & Kubernetes Fundamentals", org: "Scaler", date: "Dec 2025", icon: <Database className="w-5 h-5" />, color: "from-indigo-500 to-blue-500" },
    { title: "REACT Masterclass", org: "Scaler", date: "Dec 2025", icon: <Code className="w-5 h-5" />, color: "from-cyan-500 to-teal-500" },
    { title: "Full Stack Web Development", org: "Udemy", date: "Jun 2025", icon: <Globe className="w-5 h-5" />, color: "from-green-500 to-emerald-500" },
    { title: "DSA in Java (150+ Leetcode)", org: "Udemy", date: "2025", icon: <Terminal className="w-5 h-5" />, color: "from-yellow-500 to-orange-500" },
    { title: "React Bootcamp", org: "LetsUpgrade", date: "2024", icon: <Code className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
    { title: "JavaScript & SQL Bootcamp", org: "LetsUpgrade", date: "2024", icon: <Database className="w-5 h-5" />, color: "from-red-500 to-rose-500" }
  ];

  const stats = [
    { label: "Production Projects", value: "6", suffix: "+", icon: <Zap className="w-5 h-5" /> },
    { label: "Internships", value: "2", suffix: "", icon: <Award className="w-5 h-5" /> },
    { label: "Users Served", value: "500", suffix: "+", icon: <Globe className="w-5 h-5" /> },
    { label: "Leetcode Solved", value: "150", suffix: "+", icon: <Code className="w-5 h-5" /> }
  ];

  const navLinks = [
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#certifications', label: 'Certs', id: 'certifications' },
  ];

  const reveal = (id, extra = '') =>
    `transition-all duration-700 ease-out ${extra} ${revealed[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans">

      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
        .display-font { font-family: 'Syne', sans-serif; }
        .cursor-blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        .float1 { animation: float1 6s ease-in-out infinite; }
        .float2 { animation: float2 8s ease-in-out infinite; }
        .float3 { animation: float3 7s ease-in-out infinite; }
        @keyframes float1 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(-2deg); } }
        @keyframes float3 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-24px); } }
        .shine { background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.07) 50%, transparent 75%); background-size: 200% 100%; animation: shine 2.5s infinite; }
        @keyframes shine { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .card-glow:hover { box-shadow: 0 0 40px rgba(99,102,241,0.25); }
        .nav-pill.active { color: #60a5fa; }
        .gradient-border { position:relative; }
        .gradient-border::before { content:''; position:absolute; inset:-1px; border-radius:inherit; background: linear-gradient(135deg,#3b82f6,#8b5cf6,#ec4899); z-index:-1; opacity:0; transition:opacity 0.3s; }
        .gradient-border:hover::before { opacity:1; }
        @keyframes slideInLeft { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInRight { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        .scroll-bar::-webkit-scrollbar { display: none; }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }
        .tag-hover { transition: all 0.2s; }
        .tag-hover:hover { background: rgba(99,102,241,0.3); border-color: rgba(99,102,241,0.6); transform: scale(1.05); }
        .timeline-line { background: linear-gradient(to bottom, #3b82f6, #8b5cf6); }
      `}</style>

      {/* ── Background ── */}
      <ParticleCanvas />
      <div className="noise fixed inset-0 pointer-events-none z-0 opacity-40" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-0 float1" />
      <div className="fixed top-1/3 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none z-0 float2" />
      <div className="fixed bottom-0 left-0 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl pointer-events-none z-0 float3" />

      {/* ── NAV ── */}
      <nav
        className="fixed w-full z-50 transition-all duration-500"
        style={{
          background: `rgba(2,6,23,${0.5 + navProgress * 0.45})`,
          backdropFilter: `blur(${8 + navProgress * 12}px)`,
          borderBottom: `1px solid rgba(255,255,255,${0.04 + navProgress * 0.06})`
        }}
      >
        {/* Scroll progress bar */}
        <div
          className="h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150"
          style={{ width: `${Math.min((scrollY / (document.body?.scrollHeight - window.innerHeight || 1)) * 100, 100)}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <a href="#top" className="group flex flex-col leading-tight cursor-pointer select-none">
              <span className="display-font text-sm md:text-base font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">
                Priyanshu Srivastava
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 tracking-wider uppercase">
                Full Stack Developer
              </span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`nav-pill px-4 py-2 text-sm rounded-full transition-all duration-200 hover:text-blue-400 hover:bg-white/5 ${activeSection === link.id ? 'active bg-white/5' : 'text-gray-400'}`}
                >
                  {link.label}
                </a>
              ))}
              <div className="w-px h-5 bg-white/10 mx-2" />
              <a
                href="mailto:priyanshusrivastava318@gmail.com"
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105"
              >
                Hire Me
              </a>
              <a
                href="/Priyanshu_Srivastava_CV.pdf"
                download
                className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2 hover:border-white/20"
              >
                <Download className="w-3.5 h-3.5" /> CV
              </a>
            </div>

            <button className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-2xl border-t border-white/5">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <a key={link.id} href={link.href} onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 text-sm hover:bg-white/5 rounded-xl transition-colors text-gray-300">
                  {link.label}
                </a>
              ))}
              <div className="pt-2 space-y-2">
                <a href="mailto:priyanshusrivastava318@gmail.com"
                  className="block py-3 px-4 text-sm text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium">
                  Hire Me
                </a>
                <a href="/Priyanshu_Srivastava_CV.pdf" download
                  className="block py-3 px-4 text-sm text-center bg-white/5 border border-white/10 rounded-xl font-medium">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="top" className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-20 pb-10">
        {/* Decorative floating code snippets */}
        <div className="absolute top-32 left-4 md:left-16 opacity-10 text-xs font-mono text-blue-300 float1 hidden lg:block select-none pointer-events-none">
          <div>const dev = {'{'}</div>
          <div>&nbsp;&nbsp;name: "Priyanshu",</div>
          <div>&nbsp;&nbsp;stack: "MERN",</div>
          <div>&nbsp;&nbsp;status: "🟢 Available"</div>
          <div>{'}'}</div>
        </div>
        <div className="absolute bottom-32 right-4 md:right-16 opacity-10 text-xs font-mono text-purple-300 float2 hidden lg:block select-none pointer-events-none">
          <div>$ npm run build</div>
          <div>✓ 6 projects shipped</div>
          <div>✓ 2 internships done</div>
          <div>✓ 500+ users served</div>
        </div>

        <div className="max-w-6xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs md:text-sm text-blue-400"
            style={{ animation: 'scaleIn 0.6s ease-out both' }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Open to Opportunities — Freelance & Full-time
          </div>

          {/* Main heading */}
          <div style={{ animation: 'slideInLeft 0.8s ease-out 0.1s both' }}>
            <h1 className="display-font text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight">
              <span className="block text-white mb-2">Building</span>
              <GlitchText className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Digital Magic
              </GlitchText>
            </h1>
          </div>

          {/* Typewriter */}
          <div
            className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-medium"
            style={{ animation: 'slideInRight 0.8s ease-out 0.2s both' }}
          >
            I am a{' '}
            <span className="text-blue-400 font-bold">
              {typewriter}
              <span className="cursor-blink text-blue-400">|</span>
            </span>
          </div>

          <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed" style={{ animation: 'slideInLeft 0.8s ease-out 0.3s both' }}>
            MERN Stack specialist with <span className="text-white font-semibold">6 production projects</span>, <span className="text-white font-semibold">2 internships</span>, and a passion for shipping things that <span className="text-blue-400 font-semibold">actually work</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto mt-10" style={{ animation: 'scaleIn 0.8s ease-out 0.4s both' }}>
            {stats.map((stat, i) => (
              <div key={i} className="group relative gradient-border rounded-2xl" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 hover:border-white/20 transition-all card-glow">
                  <div className="text-blue-400 mb-2 opacity-70">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-black display-font bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4" style={{ animation: 'slideInLeft 0.8s ease-out 0.5s both' }}>
            <a href="#projects"
              className="group px-8 py-4 text-sm md:text-base bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105 flex items-center justify-center gap-2">
              See My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://github.com/Priyanshu-Srivastava318" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 text-sm md:text-base bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-semibold hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/priyanshu-srivastava-dev/" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 text-sm md:text-base bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-semibold hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="pt-8 flex flex-col items-center gap-2 opacity-40" style={{ animation: 'float2 2s ease-in-out infinite' }}>
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-blue-400" />
            <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="relative py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div data-id="exp-head" className={reveal('exp-head', 'text-center mb-16')}>
            <p className="text-xs tracking-widest text-blue-400 uppercase mb-3">Where I've Worked</p>
            <h2 className="display-font text-4xl md:text-6xl font-black">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 timeline-line opacity-30 hidden sm:block" />

            <div className="space-y-8 md:space-y-10">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  data-id={`exp-${i}`}
                  className={reveal(`exp-${i}`, 'relative')}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 md:left-6 top-7 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} shadow-lg shadow-blue-500/30 hidden sm:block`} style={{ transform: 'translateX(-50%)' }} />

                  <div className="sm:ml-20 group relative gradient-border rounded-2xl md:rounded-3xl">
                    <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                    <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-white/20 transition-all card-glow shine">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Briefcase className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="text-blue-400 font-semibold text-sm md:text-base">{exp.company}</span>
                            <span className="text-gray-600">·</span>
                            <span className="text-gray-500 text-sm">{exp.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 w-fit">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </div>
                      </div>
                      <ul className="space-y-2.5">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm md:text-base text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div data-id="proj-head" className={reveal('proj-head', 'text-center mb-16')}>
            <p className="text-xs tracking-widest text-purple-400 uppercase mb-3">What I've Built</p>
            <h2 className="display-font text-4xl md:text-6xl lg:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Production Projects
              </span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg">Real solutions. Real impact. Real results.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 md:gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                data-id={`proj-${i}`}
                className={`group relative ${i === 0 ? 'lg:col-span-2' : ''} ${reveal(`proj-${i}`)}`}
                style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-white/20 transition-all h-full card-glow">
                  <div className={`flex ${i === 0 ? 'flex-col md:flex-row md:gap-8' : 'flex-col'} gap-5`}>

                    <div className={i === 0 ? 'md:flex-1' : ''}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 bg-gradient-to-r ${project.color} rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                          {project.icon}
                        </div>
                        {project.live && (
                          <span className="px-3 py-1 bg-green-500/15 border border-green-500/30 rounded-full text-xs text-green-400 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold mb-1.5 group-hover:text-blue-400 transition-colors display-font">
                        {project.title}
                      </h3>
                      <p className="text-sm text-blue-400 font-semibold mb-3">{project.tagline}</p>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed">{project.description}</p>
                    </div>

                    <div className={`${i === 0 ? 'md:flex-1' : ''} space-y-4`}>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, j) => (
                          <span key={j} className="tag-hover px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2">
                        {project.impact.map((item, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs md:text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all">
                          <Github className="w-4 h-4" /> Code
                        </a>
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2.5 text-sm bg-gradient-to-r ${project.color} rounded-xl hover:shadow-lg transition-all hover:scale-105`}>
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div data-id="skills-head" className={reveal('skills-head', 'text-center mb-16')}>
            <p className="text-xs tracking-widest text-pink-400 uppercase mb-3">What I Know</p>
            <h2 className="display-font text-4xl md:text-6xl lg:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Tech Arsenal
              </span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg">Tools & technologies I ship with daily</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skills.map((skill, i) => (
              <div
                key={i}
                data-id={`skill-${i}`}
                className={`group relative ${reveal(`skill-${i}`)}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
                onMouseEnter={() => setActiveSkill(i)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500`} />
                <div className={`relative bg-slate-900/60 backdrop-blur-xl border rounded-2xl md:rounded-3xl p-5 md:p-7 transition-all duration-300 card-glow ${activeSkill === i ? 'border-white/25 scale-[1.02]' : 'border-white/10'}`}>
                  <div className={`inline-flex p-3 bg-gradient-to-r ${skill.color} rounded-xl text-white mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-4 display-font">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, j) => (
                      <span
                        key={j}
                        className="tag-hover px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 cursor-default"
                        style={{ transitionDelay: `${j * 20}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="relative py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div data-id="cert-head" className={reveal('cert-head', 'text-center mb-16')}>
            <p className="text-xs tracking-widest text-green-400 uppercase mb-3">Always Learning</p>
            <h2 className="display-font text-4xl md:text-6xl lg:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-gray-500">Continuous upskilling, continuously shipping</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                data-id={`cert-${i}`}
                className={`group relative ${reveal(`cert-${i}`)}`}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} rounded-2xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-500`} />
                <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all h-full card-glow group-hover:scale-[1.03]">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 bg-gradient-to-r ${cert.color} rounded-xl text-white group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      {cert.icon}
                    </div>
                    <Award className="w-4 h-4 text-yellow-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-sm font-bold mb-1.5 group-hover:text-blue-400 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-1">{cert.org}</p>
                  <p className="text-gray-600 text-xs">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="relative py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div data-id="ach-head" className={reveal('ach-head', 'text-center mb-12')}>
            <p className="text-xs tracking-widest text-yellow-400 uppercase mb-3">Milestones</p>
            <h2 className="display-font text-3xl md:text-5xl font-black">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Achievements</span>
            </h2>
          </div>
          <div data-id="ach-cards" className={`grid sm:grid-cols-3 gap-4 ${reveal('ach-cards')}`}>
            {[
              { icon: <Star className="w-6 h-6 text-yellow-400" />, title: "Ideathon 2025 Winner", sub: "Melange Tech Fest", color: "from-yellow-500 to-orange-500" },
              { icon: <Award className="w-6 h-6 text-blue-400" />, title: "Top 10 Finalist", sub: "National Hackathon @ COER Roorkee 2023", color: "from-blue-500 to-indigo-500" },
              { icon: <Zap className="w-6 h-6 text-purple-400" />, title: "Cultural Secretary", sub: "Leading 50+ members, 5 clubs", color: "from-purple-500 to-pink-500" },
            ].map((a, i) => (
              <div key={i} className="group relative gradient-border rounded-2xl">
                <div className={`absolute inset-0 bg-gradient-to-r ${a.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity`} />
                <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-white/20 transition-all card-glow">
                  <div className="flex justify-center mb-3">{a.icon}</div>
                  <div className="font-bold text-sm mb-1">{a.title}</div>
                  <div className="text-xs text-gray-500">{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section className="relative py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div data-id="cta" className={reveal('cta')}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 animate-pulse" />
              <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-14 text-center overflow-hidden">
                {/* decorative grid */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />

                <div className="relative z-10">
                  <p className="text-xs tracking-widest text-blue-400 uppercase mb-4">Get In Touch</p>
                  <h2 className="display-font text-4xl md:text-6xl font-black mb-4 leading-tight">
                    Let's Build Something
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Amazing Together
                    </span>
                  </h2>
                  <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto">
                    Open for freelance gigs, startup collaborations, and full-time opportunities. Let's ship something great.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3">
                    <a href="mailto:priyanshusrivastava318@gmail.com"
                      className="group px-7 py-3.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email Me
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="https://www.linkedin.com/in/priyanshu-srivastava-dev/" target="_blank" rel="noopener noreferrer"
                      className="px-7 py-3.5 text-sm bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                    <a href="https://github.com/Priyanshu-Srivastava318" target="_blank" rel="noopener noreferrer"
                      className="px-7 py-3.5 text-sm bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2">
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                    <a href="/Priyanshu_Srivastava_CV.pdf" download
                      className="px-7 py-3.5 text-sm bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2">
                      <Download className="w-4 h-4" /> Download CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-8 px-4 md:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-gray-600 text-xs">
          <p>© 2026 Priyanshu Srivastava — Crafted with passion & React ⚡</p>
          <div className="flex gap-5">
            <a href="https://priyanshusrivastava-portfolio.vercel.app/" className="hover:text-blue-400 transition-colors">Portfolio</a>
            <a href="https://github.com/Priyanshu-Srivastava318" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/priyanshu-srivastava-dev/" className="hover:text-blue-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}