import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, Code, Award, ArrowRight, Sparkles, Terminal, Database, Globe, Cpu, Zap, Star, CheckCircle , Download } from 'lucide-react';

export default function NextLevelPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  //const [cursorVariant, setCursorVariant] = useState('default');
  const [activeSkill, setActiveSkill] = useState(null);
  const canvasRef = useRef(null);

 useEffect(() => {
    //const handleMouseMove = (e) => {
     // setMousePosition({ x: e.clientX, y: e.clientY });
    //};
    //window.addEventListener('mousemove', handleMouseMove);

    // Particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    animate();

    //return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      title: "HairCare-AI",
      tagline: "AI-Powered Healthcare Diagnostics",
      description: "ML-ready diagnostic platform analyzing 50+ hair conditions with 85% accuracy. Features modular architecture and detailed personalized reports serving 200+ users.",
      impact: ["85% accuracy", "200+ users", "50+ conditions analyzed"],
      tech: ["React", "Node.js", "MongoDB", "Python", "AI/ML"],
      github: "https://github.com/Priyanshu-Srivastava318/Haircare-AI",
      live: "https://hairnet-webapp.vercel.app/",
      color: "from-purple-500 to-pink-500",
      icon: <Cpu className="w-6 h-6" />
    },
    {
      title: "LuminX",
      tagline: "Low-Light Image Enhancement",
      description: "Premium image enhancement platform with drag-drop workflow, real-time preview, and modular ML-ready architecture. Processed 1000+ images with seamless UX.",
      impact: ["1000+ images processed", "Real-time preview", "ML-ready architecture"],
      tech: ["React", "Tailwind CSS", "Vite", "JavaScript"],
      github: "https://github.com/Priyanshu-Srivastava318/lightboost-ai",
      live: null,
      color: "from-yellow-500 to-orange-500",
      icon: <Sparkles className="w-6 h-6" />
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
      description: "Comprehensive HRMS with attendance tracking, employee management, leave workflows, and role-based JWT authentication. Built during internship project.",
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
      icon: <Code className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      items: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Responsive Design"]
    },
    {
      category: "Backend",
      icon: <Database className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "API Design"]
    },
    {
      category: "Languages",
      icon: <Terminal className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      items: ["JavaScript", "Java", "Python", "SQL", "TypeScript (Learning)"]
    },
    {
      category: "Tools & Cloud",
      icon: <Globe className="w-8 h-8" />,
      color: "from-orange-500 to-yellow-500",
      items: ["Git/GitHub", "Docker", "AWS (EC2, S3)", "Vercel", "Postman", "VS Code", "Firebase"]
    },
    {
      category: "Specializations",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      items: ["MERN Stack", "Full Stack Dev", "AI/ML Integration", "Performance Optimization", "Debugging", "Product Thinking"]
    }
  ];

  const certifications = [
    { title: "AI for Business Essentials", org: "HP LIFE", date: "Jan 2026", icon: <Cpu className="w-5 h-5" /> },
    { title: "Docker and DevOps Fundamentals", org: "Scaler", date: "Dec 2025", icon: <Database className="w-5 h-5" /> },
    { title: "REACT Masterclass", org: "Scaler", date: "Dec 2025", icon: <Code className="w-5 h-5" /> },
    { title: "Full Stack Web Development", org: "Udemy", date: "2025", icon: <Globe className="w-5 h-5" /> },
    { title: "DSA in Java (150+ Leetcode)", org: "Udemy", date: "2025", icon: <Terminal className="w-5 h-5" /> },
    { title: "React Bootcamp", org: "LetsUpgrade", date: "2024", icon: <Code className="w-5 h-5" /> },
    { title: "JavaScript & SQL Bootcamp", org: "LetsUpgrade", date: "2024", icon: <Database className="w-5 h-5" /> }
  ];

  const stats = [
    { label: "Production Projects", value: "5", icon: <Zap className="w-6 h-6" /> },
    { label: "Users Served", value: "500+", icon: <Globe className="w-6 h-6" /> },
    { label: "Leetcode Solved", value: "150+", icon: <Code className="w-6 h-6" /> },
    { label: "CGPA", value: "7.41", icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Custom Cursor */}
      {/*<div 
        className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorVariant === 'hover' ? 2 : 1})`
        }}
      />*/ }

      {/* Gradient Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Navbar */}
      <nav className="fixed w-full z-40 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl overflow-hidden group">
              <span className="relative z-10">PS</span>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="font-bold">Priyanshu Srivastava</div>
              <div className="text-xs text-gray-400">Full Stack Developer</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
            <a href="#certifications" className="hover:text-blue-400 transition-colors">Certifications</a>
            <a href="mailto:priyanshusrivastava318@gmail.com" 
               className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all">
              Contact             
            </a>
            <a
  href="/Priyanshu_Srivastava_CV.pdf"
  download
  className="px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
>
  <Download className="w-4 h-4" />
  CV
</a>

          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/5">
            <div className="px-6 py-4 space-y-3">
              <a href="#projects" className="block py-2 hover:text-blue-400">Projects</a>
              <a href="#skills" className="block py-2 hover:text-blue-400">Skills</a>
              <a href="#certifications" className="block py-2 hover:text-blue-400">Certifications</a>
              <a href="mailto:priyanshusrivastava318@gmail.com" className="block py-2 hover:text-blue-400">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 animate-bounce">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400">Available for Freelance & Full-time</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-tight">
            Crafting Digital
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Experiences
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Full Stack Developer specializing in <span className="text-blue-400 font-semibold">MERN stack</span> with 5 production-ready projects solving real-world problems
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {stats.map((stat, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
                  <div className="text-blue-400 mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <a href="#projects" 
               className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-2">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://github.com/Priyanshu-Srivastava318" target="_blank" rel="noopener noreferrer"
               className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Production Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400">Real solutions. Real impact. Real results.</p>
          </div>

          <div className="space-y-8">
            {projects.map((project, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`} />
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all overflow-hidden">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-start justify-between">
                        <div className={`p-4 bg-gradient-to-r ${project.color} rounded-2xl text-white`}>
                          {project.icon}
                        </div>
                        {project.live && (
                          <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-blue-400 font-semibold mb-4">{project.tagline}</p>
                        <p className="text-gray-300 leading-relaxed">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, j) => (
                          <span key={j} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {project.impact.map((item, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-4 pt-4">
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                          <Github className="w-5 h-5" />
                          Code
                        </a>
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer"
                             className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.color} rounded-xl hover:shadow-lg transition-all`}>
                            <ExternalLink className="w-5 h-5" />
                            Live Demo
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

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Tech Arsenal
              </span>
            </h2>
            <p className="text-xl text-gray-400">Tools & technologies I work with daily</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="group relative"
                onMouseEnter={() => setActiveSkill(i)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`} />
                <div className={`relative bg-slate-900/50 backdrop-blur-xl border rounded-3xl p-8 transition-all ${activeSkill === i ? 'border-white/30 scale-105' : 'border-white/10'}`}>
                  <div className={`inline-flex p-4 bg-gradient-to-r ${skill.color} rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {skill.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6">{skill.category}</h3>
                  
                  <div className="space-y-3">
                    {skill.items.map((item, j) => (
                      <div 
                        key={j} 
                        className="flex items-center gap-3 text-gray-300 group/item hover:text-white transition-colors"
                        style={{ 
                          animation: activeSkill === i ? `slideIn 0.3s ease-out ${j * 0.05}s both` : 'none'
                        }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${skill.color} rounded-full`} />
                        <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-xl text-gray-400">Continuous learning & upskilling</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="group relative"
                style={{ 
                  animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                      {cert.icon}
                    </div>
                    <Award className="w-5 h-5 text-yellow-400" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1">{cert.org}</p>
                  <p className="text-gray-500 text-xs">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20" />
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Let's Build Something
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Amazing Together
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Open for freelance projects, collaborations, and full-time opportunities
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:priyanshusrivastava318@gmail.com"
                   className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Me
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                 href="/Priyanshu_Srivastava_CV.pdf"
                   download
                className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
                                         >
                 <Download className="w-5 h-5" />
                    Download CV
                     </a>


                <a href="https://www.linkedin.com/in/priyanshu-srivastava-dev/" target="_blank" rel="noopener noreferrer"
                   className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a href="https://github.com/Priyanshu-Srivastava318" target="_blank" rel="noopener noreferrer"
                   className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© 2025 Priyanshu Srivastava. Crafted with passion & React.</p>
          <div className="flex gap-6">
            <a href="https://priyanshusrivastava-portfolio.vercel.app/" className="hover:text-blue-400 transition-colors">Portfolio</a>
            <a href="https://github.com/Priyanshu-Srivastava318" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/priyanshu-srivastava-dev/" className="hover:text-blue-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
</div>
  );
}
