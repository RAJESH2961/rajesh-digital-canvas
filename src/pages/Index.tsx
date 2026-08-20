import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, Send, Download, Menu, X, Eye, Code, Database, Wrench, Briefcase, MapPin, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ModernThreeBackground from "@/components/ModernThreeBackground";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation } from "react-router-dom";

const PATH_TO_SECTION: Record<string, string> = {
  "/about": "about",
  "/projects": "projects",
  "/contact": "contact",
};

const Index = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { toast } = useToast();

    // Experience data with bullet points and metrics
  const experiences = [
    {
      id: 1,
      company: "Webvoid Technologies Pvt. Ltd.",
      companyUrl: "https://webvoidtechnologies.com",
      position: "Full Stack Developer Intern",
      duration: "November 2025 – Present",
      location: "Chittoor, Andhra Pradesh",
      bullets: [
        "Owned end-to-end development of production features using React, TypeScript, FastAPI, SQLAlchemy, PostgreSQL, and Docker in a production environment",
        "Built full-stack applications including an online code compiler (Judge0 API), job portal, job tracker, resume builder, and edtech platform from frontend to backend",
        "Developed responsive React UIs, designed REST APIs, implemented business logic, and integrated PostgreSQL databases for scalable applications",
        "Implemented authentication, Hybrid (RBAC+ABAC with permissions), rate limiting, and API integrations to deliver secure, production-ready features",
        "Collaborated in Agile sprints, taking features from requirements and design through development, testing, and deployment",
        "Built an internal LLM-powered tool that fetches question and test-case data from PostgreSQL and auto-converts test cases across programming languages, cutting manual rewrite effort for the code compiler platform"
      ],
      technologies: ["React.js", "TypeScript", "FastAPI", "SQLAlchemy", "PostgreSQL", "Docker", "GitHub Actions", "AWS EC2", "AWS S3", "AWS RDS"]
    },
    {
      id: 2,
      company: "Digital Hercules Innovations",
      companyUrl: "",
      position: "Backend Developer Intern",
      duration: "March 2025 – July 2025",
      location: "Remote",
      bullets: [
        "Built Django REST APIs to fetch Amazon Ads data through scheduled Cron jobs, automating daily data ingestion and processing pipelines",
        "Developed backend data pipelines to clean, transform, and store Amazon campaign data before sending it to ML APIs for prediction and content generation",
        "Designed asynchronous API workflows to process ML responses, persist results in MySQL, and serve optimized data to the frontend with JWT authentication",
        "Reduced average page load time by **25%** through API payload optimisation and response contract redesign with the frontend team"
      ],
      technologies: ["Django REST Framework", "Python", "Amazon Ads API", "MySQL", "Django ORM", "JWT Authentication", "RBAC"]
    },
    {
      id: 3,
      company: "Tri-Gen Tech IT Solutions",
      companyUrl: "",
      position: "Web Development Intern",
      duration: "December 2023 – May 2024",
      location: "Tirupati, Andhra Pradesh",
      bullets: [
        "Built and maintained **5 responsive production websites**; reduced page load times by **30%** and bounce rate by **20%** via asset compression, lazy loading, and UI improvements",
        "Integrated third-party REST APIs to power dynamic site functionality"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript ES6+", "REST API Integration", "Responsive Web Design"]
    },
  ];

  // Calculate total internship experience (in months) from the experiences data
  const MONTHS: Record<string, number> = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };

  const totalInternshipMonths = experiences.reduce((total, exp) => {
    // Format: "Month Year – Month Year" or "Month Year – Present"
    const parts = exp.duration.split('–').map((s) => s.trim());
    if (parts.length !== 2) return total;

    const parseDate = (str: string): Date | null => {
      const lower = str.toLowerCase();
      if (lower === 'present') return new Date(); // now
      const [monthName, yearStr] = lower.split(' ');
      const monthIdx = MONTHS[monthName];
      const year = parseInt(yearStr, 10);
      if (monthIdx === undefined || isNaN(year)) return null;
      return new Date(year, monthIdx, 1);
    };

    const start = parseDate(parts[0]);
    const end = parseDate(parts[1]);
    if (!start || !end) return total;

    // Inclusive month count: (yearDiff * 12) + (monthDiff) + 1
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    return total + Math.max(months, 0);
  }, 0);

  // Human-readable total (e.g. "20 months" or "1 year 8 months")
  const totalExperienceLabel = (() => {
    const m = totalInternshipMonths;
    if (m < 12) return `${m} months`;
    const years = Math.floor(m / 12);
    const rem = m % 12;
    return rem === 0 ? `${years} year${years > 1 ? 's' : ''}` : `${years} year${years > 1 ? 's' : ''} ${rem} months`;
  })();

  // Skills data organized by categories - AI/GenAI first
  const skillsData = {
    aiGenAI: [
      "LLMs", "LangChain", "OpenAI/Claude APIs", "RAG", "ChromaDB", "Vector Embeddings", "Prompt Engineering"
    ],
    backend: [
      "FastAPI", "Django REST Framework", "SQLAlchemy", "RESTful API Design", "JWT Authentication", "RBAC", "Python"
    ],
    frontend: [
      "React.js", "TypeScript", "Component Architecture", "REST API Integration", "Responsive Web Design"
    ],
    databases: [
      "PostgreSQL", "MySQL", "MongoDB", "ChromaDB", "Database Indexing", "Query Optimisation", "ORM"
    ],
    devops: [
      "Docker", "GitHub Actions", "CI/CD Pipelines", "AWS EC2", "AWS S3", "AWS RDS", "Git", "Nginx", "Linux"
    ],
    languages: [
      "Java (OOP)", "Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"
    ],
    csFundamentals: [
      "Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "OOP"
    ]
  };

  // Optimized Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay for better visual flow
          setTimeout(() => {
            entry.target.classList.add('animate-fadeInUp');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            // Clean up will-change after animation
            setTimeout(() => {
              if (entry.target instanceof HTMLElement) {
                entry.target.style.willChange = 'auto';
              }
            }, 500);
          }, index * 100);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach((section) => {
      section.classList.add('gpu-accelerated');
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          section.style.willChange = 'auto';
        }
      });
    };
  }, []);


  useEffect(() => {
    const sectionId = PATH_TO_SECTION[location.pathname];
    if (!sectionId) return;

    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

 const allProjects = [
  // AI/GenAI Projects - Featured First
  {
    id: 11,
    title: "AI Course Assistant (GenAI)",
    description: "Engineered a Retrieval-Augmented Generation (RAG) pipeline: documents chunked, embedded via OpenAI, stored in ChromaDB vector database, retrieved semantically via FastAPI backend with LangChain multi-turn memory and React frontend.",
    techStack: ["LangChain", "FastAPI", "React.js", "TypeScript", "ChromaDB", "OpenAI API", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/Rajesh2961",
    liveUrl: "",
    featured: true,
    category: "ai",
    outcome: "In Progress"
  },
  {
    id: 7,
    title: "Alumni Network Portal",
    description: "Full-stack platform with JWT authentication, RBAC, event and job board, Twilio notifications, and server-side pagination across 300 records at sub-100 millisecond response time.",
    techStack: ["React.js", "Django REST Framework", "PostgreSQL", "JWT Authentication", "RBAC", "Twilio SMS API"],
    githubUrl: "https://github.com/Rajesh2961/ALUMNI-CONNECT",
    liveUrl: "",
    featured: true,
    category: "fullstack",
    outcome: "sub-100ms response"
  },
  {
    id: 1,
    title: "Stock Prediction Portal",
    description: "End-to-end ML application with LSTM and Random Forest models and feature engineering pipelines, achieving 15% improvement in prediction accuracy over baseline; secured with JWT authentication.",
    techStack: ["React.js", "Django REST Framework", "Python", "scikit-learn", "LSTM", "Random Forest", "PostgreSQL"],
    githubUrl: "https://github.com/Rajesh2961/stock-prediction-portal.git",
    liveUrl: "https://github.com/Rajesh2961/stock-prediction-portal.git",
    featured: true,
    category: "ai",
    outcome: "15% accuracy gain"
  },
];


  const featuredProjects = allProjects.filter(project => project.featured);
  const displayProjects = showAllProjects ? allProjects : featuredProjects;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("https://formspree.io/f/xpwrwdpp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. I will respond within 24 hours.",
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      throw new Error("Formspree error");
    }

  } catch (error) {
    console.error('Form submission error:', error);
    toast({
      title: "Unable to Send",
      description: "Please email me directly at grajesh2906@gmail.com",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen overflow-x-hidden" style={{background:'#000005',color:'#e8e8ff'}}>
      <ModernThreeBackground />

      {/* NAV — neon bottom border, terminal feel */}
      <nav className="fixed top-0 w-full backdrop-blur-2xl z-50 transition-all duration-300"
        style={{
          background: 'rgba(0,0,5,0.85)',
          borderBottom: '1px solid rgba(217,22,86,0.3)',
          boxShadow: '0 1px 0 rgba(217,22,86,0.1), 0 4px 30px rgba(0,0,0,0.8)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex justify-between items-center">
            {/* Logo — terminal prompt style */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="flex items-center gap-2 group"
            >
              <span className="font-mono text-xs text-primary/60 group-hover:text-primary transition-colors">~/</span>
              <span className="font-poppins font-bold text-lg tracking-tight text-white group-hover:neon-text-red transition-all">RG</span>
              <span className="neon-text-red font-bold text-xl">_</span>
            </a>

            {/* Desktop Nav — monospace labels */}
            <div className="hidden md:flex items-center gap-1">
              {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item, i) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded group"
                  style={{color:'rgba(200,200,220,0.7)'}}
                >
                  <span className="font-mono text-primary/40 text-xs mr-1">{String(i).padStart(2,'0')}.</span>
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <ThemeToggle />

              
              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded transition-colors hover:bg-white/10"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fadeInUp"
              style={{borderTop:'1px solid rgba(217,22,86,0.2)'}}
            >
              <div className="flex flex-col space-y-1 pt-4">
                {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item, i) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left px-4 py-3 transition-all duration-200 font-medium w-full hover:text-primary"
                    style={{color:'rgba(200,200,220,0.8)', fontFamily:'JetBrains Mono, monospace', fontSize:'0.85rem'}}
                  >
                    <span className="text-primary/40 mr-2">{String(i).padStart(2,'0')}.</span>{item}
                  </button>
                ))}
                <button
                  className="mt-4 w-full py-3 rounded text-sm font-bold transition-all running-border"
                  style={{background:'rgba(217,22,86,0.15)', border:'1px solid rgba(217,22,86,0.4)', color:'#ff1a5e'}}
                  onClick={() => scrollToSection('contact')}
                >
                  &gt; hire_me()
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ─────────────────── HERO ─────────────────── */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-12 relative z-10 grid-overlay scan-highlight">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
            className="space-y-8"
          >
            {/* Terminal prompt — status line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="terminal-block inline-flex items-center gap-3 px-5 py-2.5">
                <span className="text-green-400 font-mono text-xs">rajesh@webvoid:~$</span>
                <span className="text-primary font-mono text-xs animate-flicker">status --check</span>
                <span className="w-px h-4 bg-primary/60" />
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-mono text-xs">open_to_offers=true</span>
              </div>
            </motion.div>

            {/* MAIN HEADLINE — glitch effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-2"
            >
              <div className="text-sm font-mono text-primary/50 tracking-[0.3em] uppercase mb-4">
                // v2.0 — production ready
              </div>
              <h1 className="font-poppins font-black leading-[0.95] tracking-[-0.03em]">
                <span
                  className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl glitch neon-text-red"
                  data-text="GenAI"
                >
                  GenAI
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mt-1">
                  Engineer &amp;
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gradient-ai mt-1">
                  Full Stack Developer
                </span>
              </h1>
            </motion.div>

            {/* Subheadline — terminal code block style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="terminal-block text-left">
                <div className="font-mono text-xs space-y-1.5">
                  <div><span className="text-violet-400">const</span> <span className="text-blue-300">engineer</span> <span className="text-white/50">=</span> <span className="text-orange-300">{`{`}</span></div>
                  <div className="pl-4"><span className="text-green-300">role</span><span className="text-white/50">:</span> <span className="text-yellow-300">'GenAI + Full Stack'</span><span className="text-white/30">,</span></div>
                  <div className="pl-4"><span className="text-green-300">experience</span><span className="text-white/50">:</span> <span className="text-primary font-bold">{`'${totalExperienceLabel} · 3 companies'`}</span><span className="text-white/30">,</span></div>
                  <div className="pl-4"><span className="text-green-300">stack</span><span className="text-white/50">:</span> <span className="text-yellow-300">['LangChain', 'RAG', 'FastAPI', 'React']</span><span className="text-white/30">,</span></div>
                  <div className="pl-4"><span className="text-green-300">cgpa</span><span className="text-white/50">:</span> <span className="text-primary font-bold">9.22</span><span className="text-white/30">,</span></div>
                  <div className="pl-4"><span className="text-green-300">currently_working_at</span><span className="text-white/50">:</span> <a href="https://webvoidtechnologies.com" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">'WebVoid Technologies'</a><span className="text-white/30">,</span></div>
                  <div className="pl-4"><span className="text-green-300">shipping</span><span className="text-white/50">:</span> <span className="text-green-400">true</span></div>
                  <div><span className="text-orange-300">{`}`}</span></div>
                </div>
              </div>
            </motion.div>

            {/* Trust bar — neon pill badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              {[
                { icon: <Github className="w-3.5 h-3.5" />, label: 'GitHub', href: 'https://github.com/Rajesh2961' },
                { icon: <Linkedin className="w-3.5 h-3.5" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/Rajesh2906/' },
                { icon: <Code className="w-3.5 h-3.5" />, label: '250+ LeetCode', href: 'https://leetcode.com/u/raj_sh' },
                { icon: <Briefcase className="w-3.5 h-3.5" />, label: '@ WebVoid Technologies', href: 'https://webvoidtechnologies.com' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(217,22,86,0.08)',
                    border: '1px solid rgba(217,22,86,0.3)',
                    color: 'rgba(220,220,255,0.75)',
                    boxShadow: '0 0 12px rgba(217,22,86,0.08)'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,22,86,0.7)';
                    (e.currentTarget as HTMLElement).style.color = '#ff1a5e';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(217,22,86,0.25)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,22,86,0.3)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(220,220,255,0.75)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(217,22,86,0.08)';
                  }}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </motion.div>

            {/* CTAs — running border primary, ghost secondary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="running-border inline-flex items-center px-8 py-4 rounded text-sm font-bold transition-all hover:scale-105 group"
                style={{
                  background: 'rgba(217,22,86,0.12)',
                  color: '#ff1a5e',
                  border: '1px solid rgba(217,22,86,0.4)',
                  boxShadow: '0 0 30px rgba(217,22,86,0.15), inset 0 0 30px rgba(217,22,86,0.05)',
                  letterSpacing: '0.05em',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                &gt; view_projects()
              </button>

              <a
                href="/Rajesh_Gangadharam_FullStackDeveloper.pdf"
                download="Rajesh_Gangadharam_FullStackDeveloper.pdf"
                className="inline-flex items-center px-8 py-4 rounded text-sm font-bold transition-all hover:scale-105"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(139,92,246,0.4)',
                  color: '#c084fc',
                  boxShadow: '0 0 20px rgba(139,92,246,0.1)',
                  letterSpacing: '0.05em',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.8)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(139,92,246,0.25)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.4)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(139,92,246,0.1)';
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                &gt; download_cv()
              </a>
            </motion.div>

            {/* Tech stack — sharp square pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto"
            >
              {[
                {t:'LangChain', c:'rgba(217,22,86,0.7)'},
                {t:'OpenAI API', c:'rgba(217,22,86,0.7)'},
                {t:'RAG', c:'rgba(217,22,86,0.7)'},
                {t:'Python', c:'rgba(139,92,246,0.6)'},
                {t:'FastAPI', c:'rgba(139,92,246,0.6)'},
                {t:'Django', c:'rgba(139,92,246,0.6)'},
                {t:'React', c:'rgba(59,130,246,0.6)'},
                {t:'TypeScript', c:'rgba(59,130,246,0.6)'},
                {t:'PostgreSQL', c:'rgba(59,130,246,0.6)'},
                {t:'Docker', c:'rgba(100,100,130,0.5)'},
                {t:'AWS', c:'rgba(100,100,130,0.5)'}
              ].map(({t, c}) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-sm font-medium transition-all hover:scale-110 cursor-default"
                  style={{
                    border: `1px solid ${c}`,
                    color: 'rgba(220,220,255,0.7)',
                    background: `${c.replace('0.', '0.06')}`,
                    letterSpacing: '0.05em'
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group" style={{color:'rgba(255,255,255,0.35)'}}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border-2 flex justify-center pt-1" style={{borderColor:'rgba(255,255,255,0.25)'}}
          >
            <div className="w-1 h-2 rounded-full" style={{background:'rgba(255,255,255,0.5)'}} />
          </motion.div>
        </motion.button>
      </section>

      {/* ─────────────── ABOUT ─────────────── */}
      <div className="section-divider" />
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 grid-overlay">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="font-mono text-primary/60 tracking-[0.3em] mb-4 text-xs uppercase">// about_me.ts</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-black tracking-tight text-white">
              Engineer <span className="neon-text-red">Profile</span>
            </h2>
            <div className="w-full max-w-xs mx-auto mt-6 section-divider" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start">
            {/* Left — content */}
            <div className="space-y-8 scroll-animate opacity-0 translate-y-8">

              {/* Intro */}
              <p className="text-base sm:text-lg leading-relaxed" style={{color:'rgba(200,200,230,0.8)'}}>
                <span className="font-bold text-white">Results-driven Full Stack Developer</span> with <span className="font-semibold text-white">{totalExperienceLabel} of internship experience across 3 companies</span>, shipping production systems with React, TypeScript, FastAPI, Django REST Framework, PostgreSQL, Docker, and AWS. Strong Computer Science fundamentals: Data Structures and Algorithms, DBMS, Operating Systems, and Computer Networks. CGPA <span className="font-semibold neon-text-red">9.22/10</span>. Currently exploring & building <span className="font-semibold neon-text-red">GenAI applications</span> with LangChain, RAG pipelines, LLM prompt engineering, and ChromaDB. Completing B.Tech CSE at{' '}
                <a href="https://apollouniversity.edu.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:neon-text-red underline-offset-2 font-medium transition-all">
                  The Apollo University
                </a>
                {' '}while shipping production code at{' '}
                <a href="https://webvoidtechnologies.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:neon-text-red underline-offset-2 font-medium transition-all">
                  WebVoid Technologies
                </a>.
              </p>

              {/* Education path */}
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] mb-5" style={{color:'rgba(217,22,86,0.6)'}}>// education_path</p>
                <div className="relative">
                  <div className="absolute left-6 top-12 bottom-12 w-px" style={{background:'linear-gradient(to bottom, rgba(217,22,86,0.6), transparent)'}} />

                  <div className="space-y-4">
                    <div className="relative flex gap-4 p-4 rounded transition-all duration-300 hover:-translate-y-0.5 glow-card corner-accent"
                      style={{border:'1px solid rgba(217,22,86,0.35)', background:'rgba(217,22,86,0.06)'}}>
                      <div className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center text-lg font-bold z-10"
                        style={{background:'rgba(217,22,86,0.15)', border:'1px solid rgba(217,22,86,0.3)'}}>🎓</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className="text-sm font-bold text-white">B.Tech — CSE</p>
                          <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-green-500/15 text-green-400 border border-green-500/25">CURRENT · FINAL YEAR</span>
                        </div>
                        <p className="text-xs font-mono" style={{color:'rgba(200,200,230,0.5)'}}>The Apollo University · Chittoor, AP</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded font-mono" style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.4)'}}>Expected May 2027</span>
                          <span className="text-[10px] px-2 py-0.5 rounded font-mono text-primary" style={{background:'rgba(217,22,86,0.1)', border:'1px solid rgba(217,22,86,0.25)'}}>CGPA 9.22/10</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex gap-4 p-4 rounded transition-all duration-300 hover:-translate-y-0.5"
                      style={{background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)'}}>
                      <div className="flex-shrink-0 w-12 h-12 rounded flex items-center justify-center text-lg z-10"
                        style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)'}}>📜</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold mb-0.5 text-white">Diploma — CSE</p>
                        <p className="text-xs font-mono" style={{color:'rgba(200,200,230,0.5)'}}>Sri Venkateswara College of Engineering and Technology · Chittoor, AP</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded font-mono" style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.4)'}}>2021 – 2024</span>
                          <span className="text-[10px] px-2 py-0.5 rounded font-mono text-primary" style={{background:'rgba(217,22,86,0.1)', border:'1px solid rgba(217,22,86,0.25)'}}>90%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right — image */}
            <div className="relative scroll-animate opacity-0 translate-y-8 lg:sticky lg:top-28">
              <div className="w-full max-w-sm sm:max-w-md mx-auto aspect-square rounded-full animate-float smooth-hover transition-all duration-300 gpu-accelerated flex items-center justify-center"
                style={{background:'linear-gradient(135deg, rgba(217,22,86,0.25), rgba(139,92,246,0.15), rgba(0,0,0,0.8))', border:'2px solid rgba(217,22,86,0.3)', boxShadow:'0 0 60px rgba(217,22,86,0.15), 0 0 120px rgba(139,92,246,0.1)'}}>

                <img
                  src="/image_copy.png"
                  alt="Rajesh Gangadharam"
                  className="w-full h-full object-cover rounded-full ring-2 ring-primary/50"
                />
              </div>

              {/* Floating badge — current status */}

            </div>
          </div>

          {/* Technical Edge — full width, 2x2 grid */}
          <div className="mt-12 scroll-animate opacity-0 translate-y-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] mb-5" style={{color:'rgba(217,22,86,0.6)'}}>// technical_edge</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: "🤖",
                  accent: "from-violet-500 to-purple-500",
                  title: "GenAI & RAG Engineering",
                  desc: "Engineered a Retrieval-Augmented Generation pipeline with LangChain, OpenAI embeddings, ChromaDB vector store, and multi-turn memory — documents chunked, embedded, and retrieved semantically via a FastAPI backend with React frontend.",
                  tag: "AI Engineering"
                },
                {
                  icon: "⚡",
                  accent: "from-emerald-500 to-teal-500",
                  title: "Full-Stack Production Development",
                  desc: "Owned end-to-end development at WebVoid Technologies — built an online code compiler (Judge0 API), job portal, job tracker, resume builder, and edtech platform using React, TypeScript, FastAPI, SQLAlchemy, PostgreSQL, and Docker.",
                  tag: "Production-ready"
                },
                {
                  icon: "🚀",
                  accent: "from-cyan-500 to-blue-500",
                  title: `Employed before graduation — ${totalExperienceLabel} experience`,
                  desc: `${totalInternshipMonths} months across 3 companies — shipping production code with Docker, GitHub Actions, AWS EC2/S3/RDS, and CI/CD pipelines. Implemented Hybrid (RBAC+ABAC) auth, rate limiting, and secure API integrations.`,
                  tag: "Industry-ready"
                },
                {
                  icon: "🏗️",
                  accent: "from-orange-500 to-amber-500",
                  title: "Backend Data Pipelines & ML Integration",
                  desc: "Built Django REST APIs with scheduled Cron jobs for Amazon Ads data ingestion, designed async workflows to process ML responses in MySQL, and reduced page load time by 25% through API payload optimisation. Stock prediction portal with LSTM + Random Forest achieving 15% accuracy improvement.",
                  tag: "Data Pipelines"
                },
              ].map((point) => (
                <div key={point.title} className="group relative flex gap-4 p-5 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  style={{background:'rgba(8,8,20,0.85)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'4px'}}>
                  {/* Left color bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b ${point.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                  {/* Icon */}
                  <span className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center text-lg"
                    style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)'}}>
                    {point.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-bold leading-snug group-hover:text-primary transition-colors duration-200 text-white">{point.title}</p>
                      <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded font-mono font-semibold whitespace-nowrap"
                        style={{background:'rgba(217,22,86,0.08)', border:'1px solid rgba(217,22,86,0.2)', color:'rgba(217,22,86,0.7)'}}>
                        {point.tag}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed font-mono" style={{color:'rgba(200,200,230,0.55)'}}>{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="font-mono text-primary/60 tracking-[0.3em] mb-4 text-xs uppercase">// tech_stack.json</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-black tracking-tight text-white">
              Core <span className="neon-text-red">Technologies</span>
            </h2>
            <div className="w-full max-w-xs mx-auto mt-6 section-divider" />
          </div>

          <div className="space-y-4 scroll-animate opacity-0 translate-y-8">
            {/* AI/GenAI — Featured hero row */}
            <div className="overflow-hidden running-border"
              style={{
                background:'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(217,22,86,0.06), rgba(0,0,8,0.9))',
                border:'2px solid rgba(139,92,246,0.35)',
                borderRadius:'4px',
                boxShadow:'0 0 40px rgba(139,92,246,0.1), 0 8px 40px rgba(0,0,0,0.8)'
              }}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-6">
                <div className="flex items-center gap-3 sm:w-44 flex-shrink-0">
                  <span className="p-2 rounded"
                    style={{background:'rgba(139,92,246,0.2)', border:'1px solid rgba(139,92,246,0.4)', color:'#c084fc'}}>
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="block text-sm font-bold text-white font-mono">AI / GenAI</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider" style={{color:'rgba(192,132,252,0.7)'}}>// core_expertise</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillsData.aiGenAI.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block font-mono text-xs px-3 py-1.5 rounded-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default"
                      style={{background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.4)', color:'#c084fc'}}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Other skills rows */}
            <div style={{background:'rgba(8,8,20,0.85)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:'4px'}}>
              {[
                { icon: <Database className="w-4 h-4" />, label: "Backend", skills: skillsData.backend,
                  color:'rgba(52,211,153,0.7)', bg:'rgba(52,211,153,0.08)' },
                { icon: <Code className="w-4 h-4" />, label: "Frontend", skills: skillsData.frontend,
                  color:'rgba(59,130,246,0.7)', bg:'rgba(59,130,246,0.08)' },
                { icon: <Database className="w-4 h-4" />, label: "Databases", skills: skillsData.databases,
                  color:'rgba(236,72,153,0.7)', bg:'rgba(236,72,153,0.08)' },
                { icon: <Wrench className="w-4 h-4" />, label: "DevOps & Cloud", skills: skillsData.devops,
                  color:'rgba(251,146,60,0.7)', bg:'rgba(251,146,60,0.08)' },
                { icon: <Code className="w-4 h-4" />, label: "Languages", skills: skillsData.languages,
                  color:'rgba(234,179,8,0.7)', bg:'rgba(234,179,8,0.08)' },
                { icon: <Sparkles className="w-4 h-4" />, label: "CS Fundamentals", skills: skillsData.csFundamentals,
                  color:'rgba(34,211,238,0.7)', bg:'rgba(34,211,238,0.08)' },
              ].map((row, i, arr) => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 sm:p-6"
                  style={i < arr.length - 1 ? {borderBottom:'1px solid rgba(255,255,255,0.06)'} : {}}>
                  <div className="flex items-center gap-2 sm:w-36 flex-shrink-0">
                    <span className="p-1.5 rounded" style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:row.color}}>
                      {row.icon}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider" style={{color:'rgba(200,200,230,0.45)'}}>{row.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {row.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block font-mono text-xs px-2.5 py-1 rounded-sm font-medium transition-all duration-200 hover:scale-105 cursor-default"
                        style={{background:row.bg, border:`1px solid ${row.color}`, color:'rgba(220,220,255,0.75)'}}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />
      {/* ─────────────── EXPERIENCE ─────────────── */}
      <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10 overflow-hidden grid-overlay">
        {/* Background gradient accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-[120px]" style={{background:'rgba(217,22,86,0.05)'}} />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-[100px]" style={{background:'rgba(139,92,246,0.05)'}} />
        </div>

        <div className="container mx-auto max-w-5xl relative">
          {/* Section Header with animated underline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="font-mono text-primary/60 tracking-[0.3em] mb-4 text-xs uppercase">// work_history.log</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-black tracking-tight mb-4 text-white">
              <span className="neon-text-red">Work</span> Experience
            </h2>
            <div className="w-full max-w-xs mx-auto section-divider" />
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-sm sm:text-base max-w-lg mx-auto font-mono" style={{color:'rgba(200,200,230,0.45)'}}
            >
              A timeline of growth — from foundational learning to building production systems
            </motion.p>
          </motion.div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Animated central glowing line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1">
              {/* Background track */}
              <div className="absolute inset-0 rounded-full" style={{background:'rgba(255,255,255,0.06)'}} />
              {/* Animated gradient fill - flows from top to bottom */}
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 right-0 origin-top rounded-full bg-gradient-to-b from-primary via-purple-500 to-violet-500"
                style={{ height: '100%' }}
              />
              {/* Glowing effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary via-purple-500 to-violet-500 blur-sm opacity-60" />
            </div>

            {/* Journey Steps */}
            <div className="space-y-8 sm:space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Timeline Node */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.2 + 0.3, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="absolute left-0 top-2 w-12 h-12 sm:w-14 sm:h-14 rounded flex items-center justify-center z-10"
                    style={index === 0
                      ? {background:'linear-gradient(135deg, #D91656, #8B5CF6)', boxShadow:'0 0 20px rgba(217,22,86,0.4), 0 0 40px rgba(139,92,246,0.2)'}
                      : {background:'rgba(8,8,20,0.9)', border:'2px solid rgba(217,22,86,0.2)'}}
                  >
                    {index === 0 ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </motion.div>
                    ) : (
                      <span className="text-sm sm:text-base font-bold font-mono" style={{color:'rgba(217,22,86,0.7)'}}>
                        {experiences.length - index}
                      </span>
                    )}
                    
                    {/* Pulse ring for current position */}
                    {index === 0 && (
                      <motion.div
                        className="absolute inset-0 rounded bg-primary"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Experience Card - Glassmorphism */}
                  <motion.div
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="relative p-5 sm:p-6 transition-all duration-300 corner-accent"
                    style={index === 0
                      ? {background:'linear-gradient(135deg, rgba(217,22,86,0.1), rgba(139,92,246,0.05), rgba(0,0,8,0.9))', border:'1px solid rgba(217,22,86,0.35)', borderRadius:'4px', boxShadow:'0 0 30px rgba(217,22,86,0.08)'}
                      : {background:'rgba(8,8,20,0.85)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'4px'}}
                  >
                    {/* Current badge */}
                    {index === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-3 right-4 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono"
                        style={{background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.35)', color:'#4ade80'}}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Currently Here
                      </motion.div>
                    )}

                    {/* Date & Location */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold"
                        style={{color: index === 0 ? '#D91656' : 'rgba(200,200,230,0.45)'}}>
                        <div className="w-1.5 h-1.5 rounded-full"
                          style={{background: index === 0 ? '#D91656' : 'rgba(200,200,230,0.3)'}} />
                        {experience.duration}
                      </div>
                      <span className="w-px h-3" style={{background:'rgba(255,255,255,0.15)'}} />
                      <div className="flex items-center gap-1 text-xs font-mono" style={{color:'rgba(200,200,230,0.35)'}}>
                        <MapPin className="w-3 h-3" />
                        {experience.location}
                      </div>
                    </div>

                    {/* Role & Company */}
                    <div className="mb-4">
                      <motion.h3 className="text-lg sm:text-xl font-bold mb-1 text-white">
                        {experience.position}
                      </motion.h3>
                      {experience.companyUrl ? (
                        <a
                          href={experience.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium flex items-center gap-2 hover:underline underline-offset-2 transition-colors text-primary hover:text-primary/80"
                        >
                          <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-primary/60'}`} />
                          {experience.company}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <p className="text-sm font-medium flex items-center gap-2 text-primary">
                          <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-primary/60'}`} />
                          {experience.company}
                        </p>
                      )}
                    </div>

                    {/* Bullet Points with Bolded Metrics */}
                    <ul className="space-y-2 mb-4">
                      {experience.bullets.slice(0, 2).map((bullet, idx) => {
                        // Split by ** to find and bold metrics
                        const parts = bullet.split('**');
                        return (
                          <li key={idx} className="flex gap-2 text-sm leading-relaxed font-mono" style={{color:'rgba(200,200,230,0.65)'}}>
                            <span className="text-primary mt-1 flex-shrink-0">&gt;</span>
                            <span>
                              {parts.map((part, i) => 
                                i % 2 === 1 ? (
                                  <strong key={i} className="font-bold text-white">{part}</strong>
                                ) : (
                                  <span key={i}>{part}</span>
                                )
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Tech Stack with stagger animation */}
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + techIndex * 0.05 + 0.4 }}
                          whileHover={{ 
                            scale: 1.1,
                            transition: { duration: 0.15 }
                          }}
                          className="text-[11px] px-2.5 py-1 rounded-sm font-mono font-medium border cursor-default transition-colors"
                          style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.55)'}}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Journey connector line for next item */}
                    {index < experiences.length - 1 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="absolute -bottom-8 left-6 sm:left-8 w-px h-8 origin-top bg-gradient-to-b from-primary/50 to-transparent"
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Journey Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 grid grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8"
              style={{background:'rgba(8,8,20,0.9)', border:'1px solid rgba(217,22,86,0.2)', borderRadius:'4px',
                boxShadow:'0 0 40px rgba(217,22,86,0.06), inset 0 1px 0 rgba(255,255,255,0.04)'}}
            >
              {[
                { value: totalExperienceLabel, label: "Internship Experience", icon: "⏱️" },
                { value: "3", label: "Companies", icon: "🏢" },
                { value: "250+", label: "LeetCode Problems", icon: "⚡" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center stat-block"
                >
                  <div className="text-2xl sm:text-3xl mb-1">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-black font-poppins neon-text-red">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-mono" style={{color:'rgba(200,200,230,0.45)'}}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />
      {/* ─────────────── PROJECTS ─────────────── */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 grid-overlay">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="font-mono text-primary/60 tracking-[0.3em] mb-4 text-xs uppercase">// projects --list</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-black tracking-tight mb-4 text-white">
              <span className="neon-text-red">Shipped</span> Projects
            </h2>
            <div className="w-full max-w-xs mx-auto mb-6 section-divider" />
            <p className="max-w-xl mx-auto text-sm sm:text-base font-mono" style={{color:'rgba(200,200,230,0.5)'}}>
              {showAllProjects ? '$ ls -la ./projects' : '$ ls ./featured'} — builds, ML integrations, production systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 scroll-animate opacity-0 translate-y-8">
            {displayProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 animate-fadeInUp corner-accent"
                style={{
                  animationDelay: `${index * 0.07}s`,
                  background: project.category === 'ai'
                    ? 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(217,22,86,0.06), rgba(0,0,8,0.9))'
                    : 'rgba(8,8,20,0.85)',
                  border: project.category === 'ai'
                    ? '1px solid rgba(139,92,246,0.35)'
                    : '1px solid rgba(217,22,86,0.18)',
                  boxShadow: project.category === 'ai'
                    ? '0 0 0 1px rgba(139,92,246,0.08), 0 8px 40px rgba(0,0,0,0.8)'
                    : '0 0 0 1px rgba(217,22,86,0.05), 0 8px 40px rgba(0,0,0,0.8)',
                  borderRadius: '4px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  if (project.category === 'ai') {
                    el.style.borderColor = 'rgba(139,92,246,0.7)';
                    el.style.boxShadow = '0 0 30px rgba(139,92,246,0.2), 0 20px 60px rgba(0,0,0,0.9)';
                  } else {
                    el.style.borderColor = 'rgba(217,22,86,0.5)';
                    el.style.boxShadow = '0 0 30px rgba(217,22,86,0.15), 0 20px 60px rgba(0,0,0,0.9)';
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = project.category === 'ai' ? 'rgba(139,92,246,0.35)' : 'rgba(217,22,86,0.18)';
                  el.style.boxShadow = project.category === 'ai'
                    ? '0 0 0 1px rgba(139,92,246,0.08), 0 8px 40px rgba(0,0,0,0.8)'
                    : '0 0 0 1px rgba(217,22,86,0.05), 0 8px 40px rgba(0,0,0,0.8)';
                }}
              >
                {/* Top accent line */}
                <div className="h-[2px] w-full"
                  style={{
                    background: project.category === 'ai'
                      ? 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(217,22,86,0.8), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(217,22,86,0.6), transparent)'
                  }}
                />

                <div className="flex flex-col flex-1 p-5">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {project.category === 'ai' && (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-mono font-bold"
                          style={{background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.4)', color:'#c084fc'}}>
                          <Sparkles className="w-3 h-3" />
                          AI/ML
                        </span>
                      )}
                      {project.featured && !project.category && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono"
                          style={{background:'rgba(217,22,86,0.1)', border:'1px solid rgba(217,22,86,0.3)', color:'#ff1a5e'}}>
                          FEATURED
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={project.githubUrl}
                        className="w-7 h-7 rounded flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.6)'}}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source code"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="w-7 h-7 rounded flex items-center justify-center transition-all duration-200 hover:scale-110"
                          style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.6)'}}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Live demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title + outcome badge */}
                  <div className="mb-2">
                    <h3 className="text-sm sm:text-base font-bold mb-1 group-hover:text-primary transition-colors duration-200 leading-snug text-white">
                      {project.title}
                    </h3>
                    {project.outcome && (
                      <span className="inline-block text-[10px] px-2 py-0.5 rounded font-mono font-bold"
                        style={{background:'rgba(34,197,94,0.1)', border:'1px solid rgba(34,197,94,0.3)', color:'#4ade80'}}>
                        ✓ {project.outcome}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="flex-1 mb-4">
                    <p className="text-xs sm:text-sm leading-relaxed" style={{color:'rgba(200,200,230,0.6)'}}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2 py-0.5 rounded-sm font-mono font-medium transition-all duration-200 hover:scale-105"
                        style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.55)'}}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 sm:mt-12 scroll-animate opacity-0 translate-y-8">
            <button
              className="w-full sm:w-auto px-6 py-2.5 rounded text-sm font-mono font-medium hover:scale-105 transition-all duration-300 group flex items-center justify-center gap-2"
              style={{border:'1px solid rgba(217,22,86,0.4)', color:'#D91656', background:'rgba(217,22,86,0.06)'}}
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              <Eye className="w-4 h-4 group-hover:animate-bounce" />
              {showAllProjects ? '$ show --featured' : '$ ls ./all-projects'}
            </button>
            <a
              href="https://github.com/Rajesh2961?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="w-full sm:w-auto px-6 py-2.5 rounded text-sm font-mono font-medium hover:scale-105 transition-all duration-300 group flex items-center justify-center gap-2"
                style={{border:'1px solid rgba(255,255,255,0.12)', color:'rgba(200,200,230,0.6)', background:'rgba(255,255,255,0.03)'}}
              >
                <Github className="w-4 h-4" />
                github.com/Rajesh2961
              </button>
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />
      {/* ─────────────── CONTACT ─────────────── */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 grid-overlay">
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="font-mono text-primary/60 tracking-[0.3em] mb-4 text-xs uppercase">// contact.sh</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-black tracking-tight mb-4 text-white">
              Let's <span className="neon-text-red">Connect</span>
            </h2>
            <div className="w-full max-w-xs mx-auto mb-6 section-divider" />
            <p className="max-w-lg mx-auto text-sm sm:text-base font-mono" style={{color:'rgba(200,200,230,0.55)'}}>
              Open to full-time roles, contract work, and technical discussions. Currently employed but exploring growth opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 scroll-animate opacity-0 translate-y-8">

            {/* Left panel — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Availability card */}
              <div className="p-5 corner-accent"
                style={{background:'rgba(34,197,94,0.06)', border:'1px solid rgba(34,197,94,0.3)', borderRadius:'4px',
                  boxShadow:'0 0 30px rgba(34,197,94,0.08)'}}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"
                    style={{boxShadow:'0 0 10px rgba(74,222,128,0.8)'}} />
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-green-400">open_to_offers=true</span>
                </div>
                <p className="text-sm leading-relaxed" style={{color:'rgba(200,200,230,0.8)'}}>
                  Actively seeking <span className="font-semibold text-white">full-time engineering roles</span> and <span className="font-semibold text-white">backend positions</span>.
                </p>
                <p className="text-xs mt-3 flex items-center gap-1.5 font-mono" style={{color:'rgba(200,200,230,0.4)'}}>
                  <MapPin className="w-3 h-3" />
                  Andhra Pradesh, India · Remote OK
                </p>
              </div>

              {/* Technical Expertise */}
              <div className="p-5"
                style={{background:'rgba(8,8,20,0.85)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'4px'}}>
                <p className="font-mono text-xs uppercase tracking-[0.15em] mb-4" style={{color:'rgba(217,22,86,0.6)'}}>// expertise</p>
                <div className="space-y-2">
                  {[
                    "Backend API Development (FastAPI/Django)",
                    "Database Design & Optimization",
                    "Cloud Infrastructure & DevOps",
                    "AI/ML Integration in Web Applications",
                    "Full-Stack System Architecture",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm font-mono" style={{color:'rgba(200,200,230,0.65)'}}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="p-5"
                style={{background:'rgba(8,8,20,0.85)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'4px'}}>
                <p className="font-mono text-xs uppercase tracking-[0.15em] mb-4" style={{color:'rgba(217,22,86,0.6)'}}>// connect</p>
                <div className="space-y-2.5">
                  {[
                    { icon: <Mail className="w-4 h-4" />, label: "grajesh2906@gmail.com", href: "mailto:grajesh2906@gmail.com", display: "Email" },
                    { icon: <Linkedin className="w-4 h-4" />, label: "linkedin.com/in/Rajesh2906", href: "https://www.linkedin.com/in/Rajesh2906/", display: "LinkedIn" },
                    { icon: <Github className="w-4 h-4" />, label: "github.com/Rajesh2961", href: "https://github.com/Rajesh2961", display: "GitHub" },
                  ].map((link) => (
                    <a
                      key={link.display}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group transition-all duration-200 hover:text-primary"
                    >
                      <span className="p-2 rounded transition-all duration-200 group-hover:text-primary"
                        style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.5)'}}>
                        {link.icon}
                      </span>
                      <div>
                        <p className="text-xs font-mono font-semibold group-hover:text-primary transition-colors" style={{color:'rgba(220,220,255,0.8)'}}>{link.display}</p>
                        <p className="text-[11px] font-mono" style={{color:'rgba(200,200,230,0.35)'}}>{link.label}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form, 3 cols */}
            <form onSubmit={handleSubmit} className="lg:col-span-3">
              <div className="relative h-full overflow-hidden transition-all duration-300"
                style={{background:'rgba(8,8,20,0.9)', border:'1px solid rgba(217,22,86,0.25)', borderRadius:'4px',
                  boxShadow:'0 0 40px rgba(217,22,86,0.06)'}}>
                {/* Running top accent */}
                <div className="h-px w-full" style={{background:'linear-gradient(90deg, transparent, #D91656, #8B5CF6, transparent)'}} />

                <div className="p-6 sm:p-8 space-y-5">
                  {/* Form heading */}
                  <div className="mb-2">
                    <h3 className="text-lg font-bold mb-1 text-white font-mono">&gt; send_message()</h3>
                    <p className="text-xs font-mono" style={{color:'rgba(200,200,230,0.45)'}}>Direct inquiries or collaboration proposals welcome.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider" style={{color:'rgba(217,22,86,0.7)'}}>// name</label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full rounded text-sm h-11 font-mono bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary hover:border-white/25 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider" style={{color:'rgba(217,22,86,0.7)'}}>// email</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full rounded text-sm h-11 font-mono bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary hover:border-white/25 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider" style={{color:'rgba(217,22,86,0.7)'}}>// message</label>
                    <Textarea
                      id="message"
                      placeholder="Describe your project requirements, role details, or questions."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full min-h-[130px] resize-none rounded text-sm font-mono bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary hover:border-white/25 transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded text-sm font-bold transition-all duration-300 hover:scale-[1.02] font-mono running-border"
                    style={{background:'rgba(217,22,86,0.15)', border:'1px solid rgba(217,22,86,0.5)',
                      color:'#ff1a5e', boxShadow:'0 0 20px rgba(217,22,86,0.15)', letterSpacing:'0.05em'}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        transmitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        &gt; submit_message()
                      </span>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1" style={{color:'rgba(255,255,255,0.15)'}}>
                    <div className="h-px flex-1 bg-current" />
                    <p className="text-[11px] font-mono" style={{color:'rgba(200,200,230,0.3)'}}>or reach out directly</p>
                    <div className="h-px flex-1 bg-current" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="mailto:grajesh2906@gmail.com"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-xs font-mono font-semibold border transition-all duration-200 hover:scale-[1.02] hover:text-primary"
                      style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.6)'}}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      grajesh2906@gmail.com
                    </a>
                    <a
                      href="https://www.linkedin.com/in/Rajesh2906/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-xs font-mono font-semibold transition-all duration-200 hover:scale-[1.02] hover:text-primary"
                      style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.6)'}}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="section-divider" />
      <footer className="py-10 sm:py-14 px-4 sm:px-6 relative z-10"
        style={{borderTop:'1px solid rgba(217,22,86,0.15)', background:'rgba(0,0,3,0.9)'}}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center scroll-animate opacity-0 translate-y-8">
            {/* Logo — terminal style */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="inline-flex items-center gap-1.5 mb-5 group cursor-pointer"
            >
              <span className="font-mono text-xs text-primary/50 group-hover:text-primary transition-colors">~/</span>
              <span className="font-poppins font-black text-2xl text-white group-hover:text-primary transition-colors">RG</span>
              <span className="neon-text-red font-bold text-2xl animate-flicker">_</span>
            </a>

            {/* Tagline */}
            <p className="mb-8 text-sm font-mono max-w-md mx-auto" style={{color:'rgba(200,200,230,0.45)'}}>
              // GenAI Engineer building production LLM systems & scalable backends
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-3 mb-8">
              {[
                { icon: Github, href: "https://github.com/Rajesh2961", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/Rajesh2906", label: "LinkedIn" },
                { icon: Mail, href: "mailto:grajesh2906@gmail.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                  className="flex items-center justify-center w-11 h-11 rounded transition-all duration-300 hover:scale-110 hover:text-primary"
                  style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(200,200,230,0.5)'}}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor='rgba(217,22,86,0.6)';
                    (e.currentTarget as HTMLElement).style.color='#ff1a5e';
                    (e.currentTarget as HTMLElement).style.boxShadow='0 0 15px rgba(217,22,86,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color='rgba(200,200,230,0.5)';
                    (e.currentTarget as HTMLElement).style.boxShadow='none';
                  }}
                  title={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs font-mono" style={{color:'rgba(200,200,230,0.25)'}}>
              // built by Rajesh Gangadharam &nbsp;·&nbsp; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
