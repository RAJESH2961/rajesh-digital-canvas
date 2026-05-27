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

const TYPEWRITER_WORDS = ["GenAI Full Stack Engineer", "AI/ML Applications", "Scalable Backend Systems"] as const;
const PATH_TO_SECTION: Record<string, string> = {
  "/about": "about",
  "/projects": "projects",
  "/contact": "contact",
};

const Index = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { toast } = useToast();

    // Experience data
  const experiences = [
    {
      id: 1,
      company: "Webvoid Technologies Pvt Ltd",
      position: "Full Stack Engineer",
      duration: "November 2025 – Present",
      location: "Hybrid · Chittoor, AP",
      description: "Architecting and deploying production systems serving real users. Built scalable REST APIs with FastAPI and PostgreSQL, optimized database performance for high-throughput workloads. Implemented containerized microservices with Docker, automated CI/CD pipelines, and deployed to AWS infrastructure. Lead code reviews, system design discussions, and production releases in an Agile environment.",
      technologies: ["React", "FastAPI", "TypeScript", "PostgreSQL", "Docker", "AWS", "CI/CD"]
    },
    {
      id: 2,
      company: "Digital Hercules Innovations",
      position: "Backend Engineer",
      duration: "March 2025 – June 2025",
      location: "Remote · Uttar Pradesh",
      description: "Engineered backend systems for advertising analytics platform. Integrated Amazon Ads API for real-time data ingestion, designed high-performance Django REST APIs, and implemented JWT-based authentication with role-based access control. Optimized database queries and established API testing protocols.",
      technologies: ["Django", "DRF", "PostgreSQL", "JWT", "REST APIs"]
    },
    {
      id: 3,
      company: "Try Zen Tech IT Solutions",
      position: "Software Developer",
      duration: "December 2023 – May 2024",
      location: "Tirupati, AP",
      description: "Delivered production-ready landing pages and client-facing web applications. Collaborated with design and product teams to translate requirements into functional interfaces. Focused on responsive design, cross-browser compatibility, and performance optimization.",
      technologies: ["React", "JavaScript", "Tailwind CSS", "REST APIs"]
    },
  ];

  // Skills data organized by categories
  const skillsData = {
    frontend: [
      "React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"
    ],
    backend: [
      "Python", "Django", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "REST API Design"
    ],
    other: [
      "Docker", "AWS", "CI/CD", "Git", "Postman", "System Design"
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

  // Typewriter animation
  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[currentWordIndex];
    const typingSpeed = isDeleting ? 30 : 100; // Faster speeds for smoother animation

    const animate = () => {
      const timeout = setTimeout(() => {
        if (!isDeleting) {
          if (typedText.length < currentWord.length) {
            setTypedText(currentWord.slice(0, typedText.length + 1));
          } else {
            // Pause before deletion with shorter delay
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(currentWord.slice(0, typedText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
          }
        }
      }, typingSpeed);

      return timeout;
    };

    const timeout = animate();
    return () => clearTimeout(timeout);
  }, [typedText, currentWordIndex, isDeleting]);

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
  {
    id: 7,
    title: "Alumni Connect",
    description: "Full-stack alumni networking platform connecting students, alumni, and faculty. Features real-time messaging via Twilio, event management, and role-based access control.",
    techStack: ["Django REST Framework", "React", "PostgreSQL", "Twilio", "JWT"],
    githubUrl: "https://github.com/Rajesh2961/ALUMNI-CONNECT",
    liveUrl: "https://youtu.be/vBkLXHvJkcg?si=8eke339CY72uCUBd",
    featured: true
  },
  {
    id: 1,
    title: "Stock Prediction Portal",
    description: "ML-powered stock analysis platform with real-time data visualization. Integrated machine learning models for price prediction with a React frontend and Django backend architecture.",
    techStack: ["React", "Django", "Python", "Machine Learning", "PostgreSQL", "JWT"],
    githubUrl: "https://github.com/Rajesh2961/stock-prediction-portal.git",
    liveUrl: "https://github.com/Rajesh2961/stock-prediction-portal.git",
    featured: true
  },
  {
    id: 4,
    title: "Multi-Disease Prediction System",
    description: "AI-powered healthcare diagnostic tool predicting diabetes, heart disease, and Parkinson's. Features data preprocessing pipelines, trained ML models, and an intuitive Flask-based web interface.",
    techStack: ["Python", "Flask", "Scikit-learn", "Pandas", "Machine Learning"],
    githubUrl: "https://github.com/Rajesh2961/multi_disease_pred.git",
    liveUrl: "https://multi-disease-pred.onrender.com/",
    featured: true
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Full-featured online marketplace with sentiment analysis on product reviews. Includes shopping cart, admin dashboard, user authentication, and MySQL database integration.",
    techStack: ["Django", "Sentiment Analysis", "MySQL", "Bootstrap", "JavaScript"],
    githubUrl: "https://github.com/Rajesh2961/E-commerce.git",
    featured: true
  },
  {
    id: 2,
    title: "Assignment Paper Generator",
    description: "Automated document generation tool creating formatted assignment papers with institutional branding. Built with Flask and deployed on Render for instant accessibility.",
    techStack: ["Python", "Flask", "HTML", "CSS"],
    githubUrl: "https://github.com/Rajesh2961/assignment-logo.git",
    liveUrl: "https://assignment-paper-generator.onrender.com/",
    featured: false
  },
  {
    id: 6,
    title: "QR Code Generator",
    description: "Lightweight React utility for generating custom QR codes. Clean UI with instant generation and download capabilities.",
    techStack: ["React", "JavaScript", "API Integration"],
    githubUrl: "https://github.com/Rajesh2961/ReactPractice/tree/main/QrCode-Generator",
    liveUrl: "https://rad-bavarois-59a97a.netlify.app/",
    featured: false
  },
  {
    id: 5,
    title: "Academic Calculator",
    description: "Specialized calculator for diploma students computing weighted percentages across multiple subjects. Responsive design with client-side validation.",
    techStack: ["JavaScript", "HTML", "CSS", "Bootstrap"],
    githubUrl: "https://github.com/Rajesh2961/Diploma_Percentage_calculator",
    liveUrl: "https://apdiplomamarks.netlify.app/",
    featured: false
  },
  {
    id: 8,
    title: "GitGather",
    description: "Event management platform for organizing and discovering tech meetups. Features responsive UI and community features.",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/Rajesh2961/GitGather.git",
    featured: false
  },
  {
    id: 9,
    title: "Recipe Hub",
    description: "Recipe sharing platform with Redux state management. Users can create, save, and rate recipes with a responsive interface.",
    techStack: ["React", "Redux", "JavaScript"],
    githubUrl: "https://github.com/Rajesh2961/Recipe-sharing.git",
    featured: false
  },
  {
    id: 10,
    title: "Food Ordering App",
    description: "Real-time food ordering interface with menu management and cart functionality. Redux-powered state management for seamless UX.",
    techStack: ["React", "Redux", "JavaScript"],
    githubUrl: "https://github.com/Rajesh2961/Burgster-Zesty-Food-Ordering.git",
    featured: false
  }
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
    <div className={`min-h-screen transition-all duration-500 overflow-x-hidden ${
      isDark 
        ? 'bg-black text-white' 
        : 'bg-white text-gray-900'
    }`}>
      <ModernThreeBackground />
      
      {/* Improved Navigation with better mobile responsiveness */}
      <nav className={`fixed top-0 w-full backdrop-blur-xl z-50 border-b transition-all duration-300 ${
        isDark 
          ? 'border-white/10 bg-black/80' 
          : 'border-gray-200/50 bg-white/90'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="text-xl sm:text-2xl font-bold font-poppins tracking-tight group"
            >
              <span className={`${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-primary transition-colors`}>RG</span>
              <span className="text-primary">.</span>
            </a>
            
            {/* Desktop Navigation - Enhanced */}
            <div className="hidden md:flex items-center space-x-1">
              {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    isDark
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item}
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-4 ${
                    isDark ? 'bg-primary' : 'bg-primary'
                  }`} />
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <ThemeToggle />
              <Button 
                className={`hidden md:flex px-5 py-2.5 rounded-full text-sm font-semibold transition-all  hover:scale-105 ${
                  isDark
                    ? 'bg-gradient-to-r from-primaryshadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]'
                    : 'bg-gradient-to-r from-primary shadow-lg shadow-primary/20'
                }`}
                onClick={() => scrollToSection('contact')}
              >
                Hire Me
              </Button>
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-xl transition-colors ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                }`}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation - Enhanced */}
          {mobileMenuOpen && (
            <div className={`md:hidden mt-4 pb-4 border-t animate-fadeInUp ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}>
              <div className="flex flex-col space-y-1 pt-4">
                {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium w-full ${
                      isDark
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <Button 
                  className={`mt-4 w-full py-3 rounded-full text-sm font-semibold transition-all  ${
                    isDark
                      ? 'bg-gradient-to-r from-primary to-purple-600'
                      : 'bg-gradient-to-r from-primary to-purple-600'
                  }`}
                  onClick={() => scrollToSection('contact')}
                >
                  Hire Me
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Compact GenAI Focus */}
      <section id="home" className="min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-16 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {/* GenAI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium backdrop-blur-md ${
                isDark
                  ? 'bg-gradient-to-r from-violet-500/15 to-purple-500/15 border-violet-500/40 text-violet-300'
                  : 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200 text-violet-700'
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="font-semibold">GenAI Full Stack Engineer</span>
            </motion.div>
            {/* GenAI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium backdrop-blur-md ${
                isDark
                  ? 'bg-gradient-to-r from-violet-500/15 to-purple-500/15 border-violet-500/40 text-violet-300'
                  : 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200 text-violet-700'
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="font-semibold">Open for new roles</span>
            </motion.div>

            {/* Name - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-2"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins leading-[1.1] font-bold tracking-tight">
                <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>Rajesh </span>
                <span className="bg-gradient-to-r from-primary via-purple-500 to-violet-500 bg-clip-text">Gangadharam</span>
              </h2>
              
              {/* Typewriter Role */}
              <div className="h-7 flex items-center justify-center gap-1 text-base sm:text-lg">
                <span className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>Building</span>
                <span className="font-semibold text-primary">{typedText}</span>
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="text-primary"
                >
                  |
                </motion.span>
              </div>
            </motion.div>

            {/* Value Prop - Shorter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
                isDark ? 'text-white/60' : 'text-gray-600'
              }`}
            >
              <span className="font-semibold text-primary">2+ years</span> shipping production systems with 
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}> Python, FastAPI, React & AI/ML</span>.
              Currently at Webvoid Technologies.
            </motion.p>

            {/* Tech Stack - Compact Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {["Python", "FastAPI", "Django", "React", "TypeScript", "PostgreSQL", "Docker", "AWS", "LLMs"].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    isDark
                      ? 'bg-white/10 text-white/80 border border-white/15 hover:border-primary/40 hover:text-primary'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* CTAs + Socials - Combined Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2"
            >
              <a
                href="/Rajesh_FullStack_Developer.pdf"
                download
                className={`inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-gradient-to-r from-primary to-purple-600shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]'
                    : 'bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 ring-2 ring-primary/20'
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
              
              <div className="flex items-center gap-2">
                {[
                  { icon: Github, href: "https://github.com/Rajesh2961" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/Rajesh2906/" },
                  { icon: Mail, href: "mailto:grajesh2906@gmail.com" },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110 ${
                      isDark
                        ? 'bg-white/10 text-white/70 hover:bg-primary/20 hover:text-primary'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Stats - Minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="flex justify-center gap-6 sm:gap-10 pt-3"
            >
              {[
                { value: "2+", label: "Years" },
                { value: "10+", label: "Projects" },
                { value: "3", label: "Companies" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-xl sm:text-2xl font-bold font-poppins ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                  <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{stat.label}</div>
                </div>
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
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group ${
            isDark ? 'text-white/40 hover:text-primary' : 'text-gray-400 hover:text-primary'
          }`}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={`w-5 h-8 rounded-full border-2 flex justify-center pt-1 ${
              isDark ? 'border-white/30' : 'border-gray-300'
            }`}
          >
            <div className={`w-1 h-2 rounded-full ${isDark ? 'bg-white/60' : 'bg-gray-400'}`} />
          </motion.div>
        </motion.button>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-[0.2em] mb-4 text-xs sm:text-sm uppercase font-semibold">About Me</p>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Engineer Profile
            </h2>
            <div className={`w-20 h-1 mx-auto mt-6 rounded-full ${isDark ? 'bg-primary/50' : 'bg-primary/30'}`} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start">
            {/* Left — content */}
            <div className="space-y-8 scroll-animate opacity-0 translate-y-8">

              {/* Intro */}
              <p className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-white/75' : 'text-gray-600'
              }`}>
                Full-stack engineer with <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>2+ years of production experience</span> designing and deploying scalable systems. Specialized in Python backend development with FastAPI and Django, with proven expertise in REST API architecture, database optimization, and cloud infrastructure. Currently completing B.Tech CSE at{' '}
                <a href="https://apollouniversity.edu.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">
                  The Apollo University
                </a>
                {' '}while shipping production code at Webvoid Technologies.
              </p>

              {/* Education path */}
              <div>
                <p className={`text-xs uppercase tracking-widest font-semibold mb-5 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Education Path</p>
                <div className="relative">
                  {/* Connector line */}
                  <div className={`absolute left-6 top-12 bottom-12 w-px ${
                    isDark
                      ? 'bg-gradient-to-b from-primary/60 via-primary/20 to-transparent'
                      : 'bg-gradient-to-b from-primary/40 via-primary/15 to-transparent'
                  }`} />

                  <div className="space-y-4">
                    {/* B.Tech — current */}
                    <div className={`relative flex gap-4 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                      isDark
                        ? 'bg-primary/10 border-primary/30 hover:border-primary/50 hover:shadow-primary/10'
                        : 'bg-primary/5 border-primary/20 hover:border-primary/35 hover:shadow-primary/10'
                    }`}>
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold z-10 ${
                        isDark ? 'bg-primary/20 text-primary' : 'bg-primary/15 text-primary'
                      }`}>🎓</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>B.Tech — CSE</p>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-500 border border-green-500/25 font-semibold whitespace-nowrap">Current · Final Year</span>
                        </div>
                        <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>The Apollo University</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                            isDark ? 'bg-white/8 border-white/15 text-white/50' : 'bg-gray-100 border-gray-200 text-gray-500'
                          }`}>2024 – 2027</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium text-primary ${
                            isDark ? 'bg-primary/10 border-primary/25' : 'bg-primary/8 border-primary/20'
                          }`}>B.Tech</span>
                        </div>
                      </div>
                    </div>

                    {/* Diploma */}
                    <div className={`relative flex gap-4 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                      isDark
                        ? 'bg-white/4 border-white/10 hover:border-white/20 hover:shadow-white/5'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-gray-100'
                    }`}>
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg z-10 ${
                        isDark ? 'bg-white/8 text-white/60' : 'bg-gray-100 text-gray-500'
                      }`}>📜</div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>Diploma — CSE</p>
                        <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>State Board of Technical Education, AP</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                            isDark ? 'bg-white/8 border-white/15 text-white/50' : 'bg-gray-100 border-gray-200 text-gray-500'
                          }`}>2021 – 2024</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                            isDark ? 'bg-white/8 border-white/15 text-white/50' : 'bg-gray-100 border-gray-200 text-gray-500'
                          }`}>Diploma</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unique differentiators */}
              <div>
                <p className={`text-xs uppercase tracking-[0.2em] font-semibold mb-5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Why Hire Me</p>
                <div className="space-y-3">
                  {[
                    {
                      icon: "🚀",
                      accent: "from-violet-500 to-primary",
                      title: "Employed in industry before graduation",
                      desc: "Not waiting for a first job — already shipping production code at Webvoid Technologies. React, FastAPI, Docker, AWS, CI/CD pipelines in real systems, not toy projects.",
                      tag: "Industry-ready"
                    },
                    {
                      icon: "🤖",
                      accent: "from-cyan-500 to-blue-500",
                      title: "Full-stack + ML — rare combo",
                      desc: "Built stock prediction engines and multi-disease detection models that plug into live web apps. Most devs do one or the other — I do both.",
                      tag: "Dual skill set"
                    },
                    {
                      icon: "🏗️",
                      accent: "from-emerald-500 to-teal-500",
                      title: "10+ shipped projects, not GitHub graveyards",
                      desc: "Every project is deployed, documented, and demo-able. Django, Flask, React, Next.js — I build things end-to-end and see them through to launch.",
                      tag: "Proven executor"
                    },
                    {
                      icon: "📐",
                      accent: "from-orange-500 to-amber-500",
                      title: "3 years of hands-on CS before B.Tech",
                      desc: "Diploma gave me low-level fundamentals — networking, OS, databases — before university. I understand why things work, not just how to use them.",
                      tag: "Deep foundation"
                    },
                  ].map((point) => (
                    <div key={point.title} className={`group relative flex gap-4 p-4 rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30 ${
                      isDark
                        ? 'bg-white/4 border-white/10 hover:bg-white/6 hover:shadow-primary/8'
                        : 'bg-white border-gray-200 hover:shadow-gray-200/80'
                    }`}>
                      {/* Left color bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b ${point.accent} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />
                      {/* Icon */}
                      <span className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base bg-gradient-to-br ${point.accent} bg-opacity-15`}>
                        {point.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className={`text-sm font-bold leading-snug group-hover:text-primary transition-colors duration-200 ${isDark ? 'text-white' : 'text-gray-900'}`}>{point.title}</p>
                          <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full border font-semibold whitespace-nowrap ${
                            isDark ? 'bg-white/8 border-white/15 text-white/50' : 'bg-gray-100 border-gray-200 text-gray-500'
                          }`}>{point.tag}</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-white/55' : 'text-gray-500'}`}>{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative scroll-animate opacity-0 translate-y-8 lg:sticky lg:top-28">
              <div className={`w-full max-w-sm sm:max-w-md mx-auto aspect-square rounded-full backdrop-blur-md border-2 flex items-center justify-center animate-float smooth-hover transition-all duration-300 gpu-accelerated ${
                isDark
                  ? 'bg-gradient-to-br from-primary/30 via-purple-500/20 to-accent/20 border-white/20 shadow-[0_0_60px_rgba(139,92,246,0.2)]'
                  : 'bg-gradient-to-br from-primary/20 via-purple-500/15 to-accent/10 border-gray-300 shadow-xl'
              }`}>
                <img
                  src="/image_copy.png"
                  alt="Rajesh Gangadharam"
                  className="w-full h-full object-cover rounded-full ring-2 ring-primary/50"
                />
              </div>

              {/* Floating badge — current status */}

            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-[0.2em] mb-4 text-xs sm:text-sm uppercase font-semibold">Technical Stack</p>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Core Technologies
            </h2>
            <div className={`w-20 h-1 mx-auto mt-6 rounded-full ${isDark ? 'bg-primary/50' : 'bg-primary/30'}`} />
          </div>

          <div className={`rounded-2xl border divide-y scroll-animate opacity-0 translate-y-8 ${
            isDark ? 'bg-white/4 border-white/10 divide-white/8' : 'bg-white border-gray-200 divide-gray-100 shadow-sm'
          }`}>
            {[
              {
                icon: <Code className="w-4 h-4" />,
                label: "Frontend",
                color: "blue",
                skills: skillsData.frontend,
                pillDark: "bg-blue-500/15 text-blue-300 border-blue-500/25 hover:bg-blue-500/25",
                pillLight: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
              },
              {
                icon: <Database className="w-4 h-4" />,
                label: "Backend",
                color: "emerald",
                skills: skillsData.backend,
                pillDark: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/25",
                pillLight: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
              },
              {
                icon: <Wrench className="w-4 h-4" />,
                label: "Tools & DevOps",
                color: "orange",
                skills: skillsData.other,
                pillDark: "bg-orange-500/15 text-orange-300 border-orange-500/25 hover:bg-orange-500/25",
                pillLight: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
              },
            ].map((row) => (
              <div key={row.label} className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 sm:p-6">
                <div className="flex items-center gap-2 sm:w-36 flex-shrink-0">
                  <span className={`p-1.5 rounded-lg ${
                    isDark ? 'bg-white/8 text-white/60' : 'bg-gray-100 text-gray-500'
                  }`}>{row.icon}</span>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-white/50' : 'text-gray-400'
                  }`}>{row.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {row.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-block text-xs px-2.5 py-1 rounded-full border font-medium transition-all duration-200 hover:scale-105 cursor-default ${
                        isDark ? row.pillDark : row.pillLight
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section — Premium Animated Journey Timeline */}
      <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 relative z-10 overflow-hidden">
        {/* Background gradient accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-0 w-96 h-96 rounded-full blur-[120px] ${isDark ? 'bg-primary/5' : 'bg-primary/8'}`} />
          <div className={`absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-[100px] ${isDark ? 'bg-purple-500/5' : 'bg-purple-500/8'}`} />
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
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 ${
                isDark 
                  ? 'bg-primary/10 border border-primary/30 text-primary' 
                  : 'bg-primary/8 border border-primary/20 text-primary'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Career Journey
            </motion.div>
            
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Professional <span className="text-gradient">Experience</span>
            </h2>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-primary via-purple-500 to-violet-500`}
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className={`mt-6 text-sm sm:text-base max-w-lg mx-auto ${isDark ? 'text-white/60' : 'text-gray-500'}`}
            >
              A timeline of growth — from foundational learning to building production systems
            </motion.p>
          </motion.div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Animated central glowing line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1">
              {/* Background track */}
              <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
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
                    className={`absolute left-0 top-2 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center z-10 ${
                      index === 0
                        ? isDark 
                          ? 'bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/50' 
                          : 'bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/40'
                        : isDark
                          ? 'bg-[#0a0a0a] border-2 border-white/20'
                          : 'bg-white border-2 border-gray-200'
                    }`}
                  >
                    {index === 0 ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Sparkles className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? 'text-white' : 'text-white'}`} />
                      </motion.div>
                    ) : (
                      <span className={`text-sm sm:text-base font-bold ${isDark ? 'text-white/60' : 'text-gray-400'}`}>
                        {experiences.length - index}
                      </span>
                    )}
                    
                    {/* Pulse ring for current position */}
                    {index === 0 && (
                      <motion.div
                        className={`absolute inset-0 rounded-2xl ${isDark ? 'bg-primary' : 'bg-primary'}`}
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
                    className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                      index === 0
                        ? isDark
                          ? 'bg-gradient-to-br from-primary/15 via-white/5 to-transparent border border-primary/30 shadow-xl shadow-primary/10'
                          : 'bg-gradient-to-br from-primary/10 via-white to-white border border-primary/20 shadow-xl shadow-primary/10'
                        : isDark
                          ? 'bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/8 backdrop-blur-sm'
                          : 'bg-white/80 border border-gray-200 hover:border-primary/30 hover:shadow-lg backdrop-blur-sm'
                    }`}
                  >
                    {/* Current badge */}
                    {index === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                          isDark 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-green-100 text-green-600 border border-green-200'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Currently Here
                      </motion.div>
                    )}

                    {/* Date & Location */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className={`flex items-center gap-1.5 text-xs font-semibold ${
                        index === 0 ? 'text-primary' : isDark ? 'text-white/50' : 'text-gray-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-primary' : isDark ? 'bg-white/40' : 'bg-gray-400'}`} />
                        {experience.duration}
                      </div>
                      <span className={`w-px h-3 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
                      <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                        <MapPin className="w-3 h-3" />
                        {experience.location}
                      </div>
                    </div>

                    {/* Role & Company */}
                    <div className="mb-4">
                      <motion.h3 
                        className={`text-lg sm:text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}
                      >
                        {experience.position}
                      </motion.h3>
                      <p className={`text-sm font-medium flex items-center gap-2 ${
                        index === 0 
                          ? 'text-primary' 
                          : isDark ? 'text-primary/70' : 'text-primary'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-primary/60'}`} />
                        {experience.company}
                      </p>
                    </div>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {experience.description}
                    </p>

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
                          className={`text-[11px] px-3 py-1.5 rounded-full font-medium border cursor-default ${
                            isDark
                              ? 'bg-white/8 text-white/70 border-white/15 hover:bg-primary/20 hover:text-primary hover:border-primary/40'
                              : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-primary/15 hover:text-primary hover:border-primary/30'
                          }`}
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
                        className={`absolute -bottom-8 left-6 sm:left-8 w-px h-8 origin-top ${
                          isDark ? 'bg-gradient-to-b from-primary/50 to-transparent' : 'bg-gradient-to-b from-primary/30 to-transparent'
                        }`}
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
              className={`mt-16 grid grid-cols-3 gap-4 sm:gap-6 ${
                isDark 
                  ? 'bg-gradient-to-r from-white/5 via-white/3 to-white/5' 
                  : 'bg-gradient-to-r from-gray-50 via-white to-gray-50'
              } rounded-2xl p-6 sm:p-8 border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
            >
              {[
                { value: "2+", label: "Years Active", icon: "⏱️" },
                { value: "3", label: "Companies", icon: "🏢" },
                { value: "10+", label: "Technologies", icon: "⚡" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl mb-1">{stat.icon}</div>
                  <div className={`text-2xl sm:text-3xl font-bold font-poppins ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-[0.2em] mb-4 text-xs sm:text-sm uppercase font-semibold">Selected Work</p>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Projects
            </h2>
            <div className={`w-20 h-1 mx-auto mb-6 rounded-full ${isDark ? 'bg-primary/50' : 'bg-primary/30'}`} />
            <p className={`max-w-xl mx-auto text-sm sm:text-base ${
              isDark ? 'text-white/60' : 'text-gray-500'
            }`}>
              {showAllProjects ? 'Complete project portfolio' : 'Featured work'} — full-stack applications, ML integrations, and production systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 scroll-animate opacity-0 translate-y-8">
            {displayProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 animate-fadeInUp ${
                  isDark
                    ? 'bg-white/4 border-white/10 hover:border-primary/35'
                    : 'bg-white border-gray-200 hover:border-primary/35 shadow-sm'
                }`}
                style={{animationDelay: `${index * 0.07}s`}}
              >
                {/* Accent bar — full width on hover */}
                <div className="h-[3px] w-full bg-gradient-to-r from-primary via-purple-500 to-violet-500 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col flex-1 p-5">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-mono font-bold tracking-widest ${
                      isDark ? 'text-white/25' : 'text-gray-300'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.featured && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-semibold">Featured</span>
                      )}
                      <a
                        href={project.githubUrl}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:text-primary ${
                          isDark ? 'bg-white/8 hover:bg-primary/20' : 'bg-gray-100 hover:bg-primary/10'
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source code"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:text-primary ${
                            isDark ? 'bg-white/8 hover:bg-primary/20' : 'bg-gray-100 hover:bg-primary/10'
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Live demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="flex-1 mb-4">
                    <h3 className={`text-sm sm:text-base font-semibold mb-1.5 group-hover:text-primary transition-colors duration-200 leading-snug ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-white/55' : 'text-gray-500'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[11px] px-2 py-0.5 rounded-full border font-medium transition-all duration-200 hover:scale-105 ${
                          isDark
                            ? 'bg-white/6 text-white/60 border-white/12 hover:bg-primary/15 hover:text-primary hover:border-primary/25'
                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-primary/8 hover:text-primary hover:border-primary/20'
                        }`}
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
            <Button
              variant="outline"
              className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 group ${
                isDark
                  ? 'border-primary/40 text-primary hover:bg-primary/10'
                  : 'border-primary/50 text-primary hover:bg-primary/8'
              }`}
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              <Eye className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              {showAllProjects ? 'Show Featured' : 'View All Projects'}
            </Button>
            <a
              href="https://github.com/Rajesh2961?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 group ${
                  isDark
                    ? 'border-white/15 text-white/60 hover:border-white/30 hover:text-white hover:bg-white/6'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800'
                }`}
              >
                <Github className="w-4 h-4 mr-2" />
                View GitHub Profile
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-[0.2em] mb-4 text-xs sm:text-sm uppercase font-semibold">Contact</p>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Let's Connect
            </h2>
            <div className={`w-20 h-1 mx-auto mb-6 rounded-full ${isDark ? 'bg-primary/50' : 'bg-primary/30'}`} />
            <p className={`max-w-lg mx-auto text-sm sm:text-base ${
              isDark ? 'text-white/60' : 'text-gray-500'
            }`}>
              Open to full-time roles, contract work, and technical discussions. Currently employed but exploring growth opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 scroll-animate opacity-0 translate-y-8">

            {/* Left panel — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Availability card - Enhanced */}
              <div className={`rounded-2xl border p-6 ${
                isDark 
                  ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]' 
                  : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg shadow-green-500/10'
              }`}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  <span className={`text-xs font-semibold uppercase tracking-[0.15em] ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>Open to Opportunities</span>
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                  Actively seeking <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>full-time software engineering roles</span> and <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>backend engineering positions</span>.
                </p>
                <p className={`text-xs mt-3 flex items-center gap-1.5 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                  <MapPin className="w-3 h-3" />
                  Andhra Pradesh, India · Remote OK
                </p>
              </div>

              {/* What I can help with - Enhanced */}
              <div className={`rounded-2xl border p-6 ${
                isDark 
                  ? 'bg-gradient-to-br from-white/8 to-white/4 border-white/15' 
                  : 'bg-white border-gray-200 shadow-lg shadow-gray-200/50'
              }`}>
                <p className={`text-xs uppercase tracking-[0.15em] font-semibold mb-4 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Technical Expertise</p>
                <div className="space-y-2">
                  {[
                    "Backend API Development (FastAPI/Django)",
                    "Database Design & Optimization",
                    "Cloud Infrastructure & DevOps",
                    "AI/ML Integration in Web Applications",
                    "Full-Stack System Architecture",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className={`text-sm ${isDark ? 'text-white/65' : 'text-gray-600'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links - Enhanced */}
              <div className={`rounded-2xl border p-6 ${
                isDark 
                  ? 'bg-gradient-to-br from-white/8 to-white/4 border-white/15' 
                  : 'bg-white border-gray-200 shadow-lg shadow-gray-200/50'
              }`}>
                <p className={`text-xs uppercase tracking-[0.15em] font-semibold mb-4 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>Connect</p>
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
                      className={`flex items-center gap-3 group transition-all duration-200 hover:text-primary`}
                    >
                      <span className={`p-2 rounded-lg transition-all duration-200 group-hover:bg-primary/15 group-hover:text-primary ${
                        isDark ? 'bg-white/8 text-white/50' : 'bg-gray-100 text-gray-500'
                      }`}>{link.icon}</span>
                      <div>
                        <p className={`text-xs font-semibold group-hover:text-primary transition-colors ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{link.display}</p>
                        <p className={`text-[11px] ${isDark ? 'text-white/35' : 'text-gray-400'}`}>{link.label}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form, 3 cols */}
            <form onSubmit={handleSubmit} className="lg:col-span-3">
              <div className={`relative h-full rounded-2xl overflow-hidden transition-all duration-300 ${
                isDark
                  ? 'border border-white/15 hover:border-primary/40 bg-gradient-to-br from-white/8 to-white/4'
                  : 'border border-gray-200 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary/10 bg-white'
              }`}>
                {/* Gradient top accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-primary to-cyan-500" />

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Form heading */}
                  <div className="mb-2">
                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Send a Message</h3>
                    <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Direct inquiries or collaboration proposals welcome.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className={`block text-xs font-semibold uppercase tracking-wider ${
                        isDark ? 'text-white/60' : 'text-gray-500'
                      }`}>Name</label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full rounded-xl text-sm h-12 transition-all duration-200 ${
                          isDark
                            ? 'bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:border-primary focus:bg-white/12 hover:border-white/25'
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-gray-300'
                        }`}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className={`block text-xs font-semibold uppercase tracking-wider ${
                        isDark ? 'text-white/60' : 'text-gray-500'
                      }`}>Email</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full rounded-xl text-sm h-12 transition-all duration-200 ${
                          isDark
                            ? 'bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:border-primary focus:bg-white/12 hover:border-white/25'
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-gray-300'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className={`block text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>Message</label>
                    <Textarea
                      id="message"
                      placeholder="Describe your project requirements, role details, or any questions you have."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`w-full min-h-[140px] resize-none rounded-xl text-sm transition-all duration-200 ${
                        isDark
                          ? 'bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:border-primary focus:bg-white/12 hover:border-white/25'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-gray-300'
                      }`}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl text-sm font-semibold group transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-primary via-violet-500 to-violet-600 shadow-lg shadow-primary/25 text-white border-0 hover:shadow-xl hover:shadow-primary/40"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        Send Message
                      </span>
                    )}
                  </Button>

                  <div className={`flex items-center justify-center gap-4 pt-1 ${
                    isDark ? 'text-white/25' : 'text-gray-300'
                  }`}>
                    <div className="h-px flex-1 bg-current opacity-40" />
                    <p className="text-[11px] font-medium">or reach out directly</p>
                    <div className="h-px flex-1 bg-current opacity-40" />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="mailto:grajesh2906@gmail.com"
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 hover:scale-[1.02] hover:border-primary/50 hover:text-primary ${
                        isDark ? 'bg-white/4 border-white/10 text-white/60' : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      grajesh2906@gmail.com
                    </a>
                    <a
                      href="https://www.linkedin.com/in/Rajesh2906/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 hover:scale-[1.02] hover:border-primary/50 hover:text-primary ${
                        isDark ? 'bg-white/4 border-white/10 text-white/60' : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className={`py-12 sm:py-16 px-4 sm:px-6 border-t relative z-10 ${
        isDark 
          ? 'border-white/10 bg-gradient-to-b from-transparent to-black/50' 
          : 'border-gray-200 bg-gradient-to-b from-transparent to-gray-50/50'
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center scroll-animate opacity-0 translate-y-8">
            {/* Logo */}
            <a 
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="inline-block text-2xl sm:text-3xl font-bold font-poppins tracking-tight mb-6 group cursor-pointer"
            >
              <span className={`${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-primary transition-colors duration-300`}>RG</span>
              <span className="text-primary">.</span>
            </a>
            
            {/* Tagline */}
            <p className={`mb-8 text-sm sm:text-base max-w-md mx-auto ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              Backend engineer building scalable systems and production-grade applications.
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
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
                  className={`group flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 ${
                    isDark
                      ? 'bg-white/10 border border-white/20 text-white/70 hover:bg-primary/20 hover:border-primary/50 hover:text-primary'
                      : 'bg-white border border-gray-200 text-gray-600 shadow-sm hover:border-primary/50 hover:text-primary hover:shadow-md'
                  }`}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
             Built with ❤️ by Rajesh Gangadharam
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
