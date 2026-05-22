import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, Send, Download, Menu, X, Eye, Code, Database, Wrench, Briefcase, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ModernThreeBackground from "@/components/ModernThreeBackground";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation } from "react-router-dom";

const TYPEWRITER_WORDS = ["FULL STACK WEB DEVELOPER", "ML ENTHUSIAST"] as const;
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
      company: "Webvoid technologies pvt ltd",
      position: "Full stack Developer",
      duration: "November 2025 - present",
      location: "Hybrid Chittoor,AP",
      // description: "Designed and implemented secure RESTful APIs with Django REST Framework and JWT, optimized database queries using ORM and raw SQL, integrated third-party APIs, ensured data validation and serialization, performed API testing with Postman, managed code with Git, and collaborated in Agile teams.",
      description : "Full-stack engineer with hands-on experience designing, developing, and deploying production systems using React, FastAPI, and PostgreSQL. Specialized in REST API architecture, query optimization, and performance tuning for scalable backend services. Experienced with Dockerized microservices, CI/CD automation, and AWS cloud infrastructure for secure, highly available deployments. Strong contributor in Agile teams, participating in system design, code reviews, and production releases",
      technologies: ["ReactJs", "FastAPI", "Typescript","Postman", "AWS", "CI/CD", "Docker", "PostgreSQL"]
    },
    {
      id: 2,
      company: "Digital Hercules Innovations",
      position: "Django Developer",
      duration: "March 2025 - June 2025",
      location: "Online UttarPradesh",
      // description: "Designed and implemented secure RESTful APIs with Django REST Framework and JWT, optimized database queries using ORM and raw SQL, integrated third-party APIs, ensured data validation and serialization, performed API testing with Postman, managed code with Git, and collaborated in Agile teams.",
      description : "Integrated Amazon Ads API to efficiently fetch and store advertising data using Django models. - Developed robust RESTful APIs with Django REST Framework, enhancing frontend-backend communication. - Implemented JWT-based authentication for secure API access, ensuring data protection.",
      technologies: ["Django", "DjangoRestFramework", "Postman", "API testing"]
    },
    {
      id: 3,
      company: "Try Zen Tech IT Solutions",
      position: "Web Developer",
      duration: "Dec 2023 - may2024",
      location: "Tirupathi,AP",
      description: "Developed and maintained multiple Landing pages using modern web technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["HTML", "CSS", "JavaScript", "JQuery"]
    },
  ];

  // Skills data organized by categories
  const skillsData = {
    frontend: [
      "React", "JavaScript", "HTML5", "CSS3", 
      "Tailwind CSS","Bootstrap", "SASS", "Redux", "Next.js", "Responsive Design","Framer Motion", 'Three.js'
    ],
    backend: [
      "Python", "Django", "FastAPI", "SQL", "MongoDB", 
       "REST APIs", "Authentication", "Api Development"
    ],
    other: [
      "Postman", "Git", "Machine Learning", 
      "Agile", "Project Management", "Team Leadership"
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
  "id": 7,
  "title": "Alumni Portal",
  "description": "A Django-based alumni networking platform that enables students, alumni, and faculty to connect, share events, and stay engaged with the university community.",
  "techStack": ["Django Rest Framework", "React.js", "SQLite3", "Twilio","Axios","ShadeCN"],
  "githubUrl": "https://github.com/RAJESH2961/ALUMNI-CONNECT",
  liveUrl: "https://youtu.be/vBkLXHvJkcg?si=8eke339CY72uCUBd",
  "featured": true
},

  {
    id: 1,
    title: "Stock Prediction Portal",
    description: "Real-time stock prediction using machine learning with interactive frontend.",
    techStack: ["React", "Django", "MachineLearning", "Postman", "SQL", "JWT Authentication", "Three.js"],
    githubUrl: "https://github.com/RAJESH2961/stock-prediction-portal.git",
    liveUrl: "https://github.com/RAJESH2961/stock-prediction-portal.git",
    featured: true
  },
  {
    id: 2,
    title: "Assignment Logo Paper Generator",
    description: "Generates assignment papers with custom logos using Flask backend.",
    techStack: ["Python", "Flask"],
    githubUrl: "https://github.com/RAJESH2961/assignment-logo.git",
    liveUrl: "https://assignment-paper-generator.onrender.com/",
    featured: true
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Responsive online shopping platform with cart, admin login Sentimental Analysis for comment section",
    techStack: ["Django","Sentimental Analysis","HTML5", "Bootstrap", "CSS3", "Responsive web design", "MySql"],
    githubUrl: "https://github.com/RAJESH2961/E-commerce.git",
    // liveUrl: "https://demo.com",
    featured: true
  },
  {
    id: 4,
    title: "Multi disease Prediction",
    description: "An AI-powered system for predicting diseases like heart disease, diabetes based on user health data inputs.",
    techStack: ["Python", "Flask", "EDA", "MachineLearning"],
    githubUrl: "https://github.com/RAJESH2961/multi_disease_pred.git",
    liveUrl: "https://multi-disease-pred.onrender.com/",
    featured: true
  },
  {
    id: 5,
    title: "Diploma percentage calculator",
    description: "A web application to calculate the final percentage for diploma students with intuitive input.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap5"],
    githubUrl: "https://github.com/RAJESH2961/Diploma_Percentage_calculator",
    liveUrl: "https://apdiplomamarks.netlify.app/",
    featured: true
  },
  {
    id: 6,
    title: "QR-code Generator tool",
    description: "Generates QR codes instantly using a React-powered interface.",
    techStack: ["React.js", "API"],
    githubUrl: "https://github.com/RAJESH2961/ReactPractice/tree/main/QrCode-Generator",
    liveUrl: "https://rad-bavarois-59a97a.netlify.app/",

    featured: true
  },

  {
    id: 8,
    title: "Git gather",
    description: "Git gather is a web application that allows users to easily organize, manage, and join meetups",
    techStack: ["React.js","Tailwind CSS"],
    githubUrl: "https://github.com/RAJESH2961/GitGather.git",
    featured: false
  },
  {
    id: 9,
    title: "Recipe Sharing",
    description: "A platform for users to share, like, and discover recipes.",
    techStack: ["react.js", "Redux API"],
    githubUrl: "https://github.com/RAJESH2961/Recipe-sharing.git",
    featured: false
  },
  {
    id: 10,
    title: "Burger Zesty Food-Ordering",
    description: "Online Food ordering system with real-time menu and cart.",
    techStack: ["React.js","Redux API"],
    githubUrl: "https://github.com/RAJESH2961/Burgster-Zesty-Food-Ordering.git",
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
        title: "Message Sent Successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      throw new Error("Formspree error");
    }

  } catch (error) {
    console.error('Form submission error:', error);
    toast({
      title: "Error sending message",
      description: "Please try again later or contact me directly.",
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
            <div className="text-xl sm:text-2xl font-inter">
              <span className={isDark ? 'text-white' : 'text-gray-900'}></span>
              <span className="text-primary"></span>
            </div>
            
            {/* Desktop Navigation with improved hover states */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className={`transition-all duration-300 hover:scale-105 font-medium px-3 py-2 rounded-lg ${
                  isDark 
                    ? 'text-white/80 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className={`transition-all duration-300 hover:scale-105 font-medium px-3 py-2 rounded-lg ${
                  isDark 
                    ? 'text-white/80 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('experience')} 
                className={`transition-all duration-300 hover:scale-105 font-medium px-3 py-2 rounded-lg ${
                  isDark 
                    ? 'text-white/80 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className={`transition-all duration-300 hover:scale-105 font-medium px-3 py-2 rounded-lg ${
                  isDark 
                    ? 'text-white/80 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className={`transition-all duration-300 hover:scale-105 font-medium px-3 py-2 rounded-lg ${
                  isDark 
                    ? 'text-white/80 hover:text-white hover:bg-white/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Contact
              </button>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <ThemeToggle />
              <Button 
                className={`hidden md:flex px-4 lg:px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 font-medium ${
                  isDark
                    ? 'bg-primary hover:bg-primary-600 text-white hover:text-white'
                    : 'bg-primary hover:bg-primary-600 text-black hover:text-white'
                }`}
                onClick={() => scrollToSection('contact')}
              >
                Let's Talk
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
          
          {/* Mobile Navigation with full width and improved styling */}
          {mobileMenuOpen && (
            <div className={`md:hidden mt-4 pb-4 border-t animate-fadeInUp ${
              isDark ? 'border-white/10' : 'border-gray-200'
            }`}>
              <div className="flex flex-col space-y-1 pt-4">
                <button 
                  onClick={() => scrollToSection('home')} 
                  className={`text-left px-4 py-3 rounded-lg smooth-hover transition-all duration-200 font-medium w-full gpu-accelerated ${
                    isDark 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className={`text-left px-4 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-medium w-full ${
                    isDark 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('experience')} 
                  className={`text-left px-4 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-medium w-full ${
                    isDark 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Experience
                </button>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className={`text-left px-4 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-medium w-full ${
                    isDark 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Projects
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className={`text-left px-4 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-medium w-full ${
                    isDark 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Contact
                </button>
                <Button 
                  className={`mt-4 w-full py-3 rounded-lg transition-all duration-300 font-medium ${
                    isDark
                      ? 'bg-primary hover:bg-primary-600 text-white hover:text-white'
                      : 'bg-primary hover:bg-primary-600 text-white hover:text-white'
                  }`}
                  onClick={() => scrollToSection('contact')}
                >
                  Let's Talk
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6 sm:space-y-7 animate-fadeInUp">

            {/* Availability badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm backdrop-blur-sm transition-all duration-200 animate-float gpu-accelerated ${
              isDark
                ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                : 'bg-white/70 border-gray-300 text-gray-800 hover:bg-white/90 shadow-lg'
            }`}>
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2.5 animate-pulse"></span>
              Open to full-time &amp; freelance opportunities
            </div>

            {/* Name + role */}
            <div className="space-y-3">
              <p className="text-primary tracking-widest text-xs sm:text-sm uppercase font-semibold animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                Full Stack Developer · ML Enthusiast
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins leading-none font-bold animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                <span className={`block ${isDark ? 'text-white' : 'text-gray-900'}`}>Rajesh</span>
                <span className="block text-primary">Gangadharam</span>
              </h1>
              <div className="text-base sm:text-lg md:text-xl font-light animate-fadeInUp gpu-accelerated h-7" style={{animationDelay: '0.5s'}}>
                <span className="text-gradient-blue gpu-accelerated">{typedText}</span>
                <span className="animate-pulse text-primary gpu-accelerated">|</span>
              </div>
            </div>

            {/* Value proposition */}
            <p className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed animate-fadeInUp px-2 ${
              isDark ? 'text-white/65' : 'text-gray-600'
            }`} style={{animationDelay: '0.65s'}}>
              I build <span className="text-primary font-medium">production-grade</span> web apps — from REST APIs to interactive UIs — and ship them to cloud. Currently at{' '}
              <span className={`font-medium ${isDark ? 'text-white/90' : 'text-gray-800'}`}>Webvoid Technologies</span>.
            </p>

            {/* Key tech pills */}
            <div className="flex flex-wrap justify-center gap-2 animate-fadeInUp" style={{animationDelay: '0.75s'}}>
              {["React", "FastAPI", "Django", "TypeScript", "PostgreSQL", "Docker", "AWS"].map((tech) => (
                <span
                  key={tech}
                  className={`text-xs px-3 py-1 rounded-full border font-medium transition-all duration-200 hover:scale-105 hover:border-primary/60 hover:text-primary ${
                    isDark
                      ? 'bg-white/5 border-white/15 text-white/70'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fadeInUp" style={{animationDelay: '0.9s'}}>
              <a
                href="/Rajesh_FullStack_Developer.pdf"
                target="_blank"
                download
                className={`w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full text-sm sm:text-base font-semibold group hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20 ${
                  isDark
                    ? 'bg-primary hover:bg-primary-600 text-white'
                    : 'bg-primary hover:bg-primary-600 text-white'
                }`}
              >
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Download Resume
              </a>
              <Button
                variant="outline"
                className={`w-full sm:w-auto px-7 py-3 rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition-all duration-300 ${
                  isDark
                    ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                    : 'border-gray-400 text-gray-800 hover:bg-gray-50 hover:border-gray-500'
                }`}
                onClick={() => scrollToSection('contact')}
              >
                Let's Talk
              </Button>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-4 animate-fadeInUp" style={{animationDelay: '1.05s'}}>
              <a
                href="https://github.com/RAJESH2961"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105 ${
                  isDark ? 'text-white/50' : 'text-gray-500'
                }`}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <span className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
              <a
                href="https://www.linkedin.com/in/rajesh2906/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105 ${
                  isDark ? 'text-white/50' : 'text-gray-500'
                }`}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <span className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
              <a
                href="mailto:grajesh2906@gmail.com"
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-105 ${
                  isDark ? 'text-white/50' : 'text-gray-500'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>

            {/* Quick stats */}
            <div className={`inline-flex items-center gap-6 sm:gap-10 px-6 sm:px-10 py-3 sm:py-4 rounded-2xl border backdrop-blur-sm animate-fadeInUp ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-gray-200 shadow-sm'
            }`} style={{animationDelay: '1.15s'}}>
              {[
                { value: "2+", label: "Years Exp" },
                { value: "10+", label: "Projects" },
                { value: "3", label: "Companies" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-xl sm:text-2xl font-bold font-poppins ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                  <div className={`text-[10px] sm:text-xs tracking-wide ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll nudge */}
        <button
          onClick={() => scrollToSection('about')}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 group transition-all duration-300 hover:scale-110 ${
            isDark ? 'text-white/30 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'
          }`}
          aria-label="Scroll to about"
        >
          <span className="text-[10px] tracking-widest uppercase">Explore</span>
          <div className={`w-5 h-8 rounded-full border flex items-start justify-center pt-1.5 ${
            isDark ? 'border-white/20' : 'border-gray-300'
          }`}>
            <div className={`w-1 h-2 rounded-full animate-bounce ${isDark ? 'bg-white/50' : 'bg-gray-400'}`} />
          </div>
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-wider mb-3 text-xs sm:text-sm uppercase font-semibold">About Me</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Who I Am
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-start">
            {/* Left — content */}
            <div className="space-y-8 scroll-animate opacity-0 translate-y-8">

              {/* Intro */}
              <p className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-white/75' : 'text-gray-600'
              }`}>
                I'm a <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Final Year B.Tech CSE student</span> at{' '}
                <a href="https://apollouniversity.edu.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2">
                  The Apollo University
                </a>
                , with a strong foundation built through a{' '}
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Diploma in Computer Science Engineering</span>.
                I bridge academic depth with real-world industry experience — already working as a full-stack engineer while finishing my degree.
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
                <p className={`text-xs uppercase tracking-widest font-semibold mb-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Why Hire Me</p>
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
              <div className={`w-full max-w-sm sm:max-w-md mx-auto aspect-square rounded-full backdrop-blur-sm border flex items-center justify-center animate-float smooth-hover transition-all duration-300 gpu-accelerated ${
                isDark
                  ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-white/10'
                  : 'bg-gradient-to-br from-primary/10 to-accent/10 border-gray-300 shadow-xl'
              }`}>
                <img
                  src="/image_copy.png"
                  alt="Rajesh Gangadharam"
                  className="w-full h-full object-cover rounded-full ring-2 ring-purple-600"
                />
              </div>

              {/* Floating badge — current status */}
              <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium backdrop-blur-sm shadow-lg ${
                isDark ? 'bg-black/70 border-white/10 text-white/80' : 'bg-white/90 border-gray-200 text-gray-700 shadow-md'
              }`}>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Final Year · Currently Employed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 sm:mb-14 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-widest mb-3 text-xs sm:text-sm uppercase font-semibold">Technical Skills</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Technologies I Work With
            </h2>
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

      {/* Experience Section — Vertical Timeline */}
      <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-widest mb-3 text-xs sm:text-sm uppercase font-semibold">Work Experience</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              My Professional Journey
            </h2>
          </div>

          <div className="relative scroll-animate opacity-0 translate-y-8">
            {/* Dashed vertical line */}
            <div
              className="absolute left-[11px] sm:left-[13px] top-3 bottom-3 w-px"
              style={{
                backgroundImage: `repeating-linear-gradient(to bottom, ${isDark ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.35)'} 0px, ${isDark ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.35)'} 6px, transparent 6px, transparent 14px)`,
              }}
            />

            <div className="space-y-0">
              {experiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className="relative pl-10 sm:pl-12 pb-10 last:pb-0 group animate-fadeInUp"
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  {/* Diamond node */}
                  <div className={`absolute left-0 top-1 w-[23px] h-[23px] rotate-45 border-2 z-10 transition-all duration-300 group-hover:scale-110 ${
                    index === 0
                      ? isDark
                        ? 'bg-primary/30 border-primary shadow-lg shadow-primary/40'
                        : 'bg-primary/20 border-primary shadow-md shadow-primary/30'
                      : isDark
                        ? 'bg-[#0a0a0a] border-primary/50 group-hover:border-primary group-hover:bg-primary/15'
                        : 'bg-white border-primary/40 group-hover:border-primary group-hover:bg-primary/10'
                  }`} />

                  {/* Content — no hard card border, just a subtle hover zone */}
                  <div className={`rounded-xl p-4 sm:p-5 transition-all duration-300 group-hover:translate-x-1 ${
                    index === 0
                      ? isDark
                        ? 'bg-primary/6 border-l-2 border-primary/40'
                        : 'bg-primary/4 border-l-2 border-primary/30'
                      : isDark
                        ? 'border-l-2 border-transparent group-hover:border-l-2 group-hover:border-white/10 group-hover:bg-white/3'
                        : 'border-l-2 border-transparent group-hover:border-gray-200 group-hover:bg-gray-50/60'
                  }`}>
                    {/* Date + location row */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                        index === 0 ? 'text-primary' : isDark ? 'text-white/35' : 'text-gray-400'
                      }`}>
                        {experience.duration}
                      </span>
                      <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
                      <span className={`flex items-center gap-1 text-[10px] ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                        <MapPin className="w-2.5 h-2.5" />
                        {experience.location}
                      </span>
                      {index === 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-500 border border-green-500/25 font-semibold">● Live</span>
                      )}
                    </div>

                    {/* Role + company */}
                    <div className="mb-3">
                      <h3 className={`text-base sm:text-lg font-bold leading-snug group-hover:text-primary transition-colors duration-200 mb-0.5 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {experience.position}
                      </h3>
                      <p className={`text-sm font-medium ${isDark ? 'text-primary/70' : 'text-primary'}`}>
                        {experience.company}
                      </p>
                    </div>

                    {/* Description */}
                    <p className={`text-xs sm:text-sm leading-relaxed mb-3 ${
                      isDark ? 'text-white/55' : 'text-gray-500'
                    }`}>
                      {experience.description}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium transition-all duration-200 hover:scale-105 ${
                            isDark
                              ? 'bg-white/6 text-white/55 border-white/10 hover:bg-primary/15 hover:text-primary hover:border-primary/25'
                              : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-primary/8 hover:text-primary hover:border-primary/20'
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
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-14 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-widest mb-3 text-xs sm:text-sm uppercase font-semibold">Portfolio</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Recent Work
            </h2>
            <p className={`max-w-xl mx-auto text-sm sm:text-base ${
              isDark ? 'text-white/55' : 'text-gray-500'
            }`}>
              {showAllProjects ? 'All projects' : 'Featured projects'} — spanning full-stack web, ML systems, and developer tools
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
              {showAllProjects ? 'Show Featured Only' : 'View All Projects'}
            </Button>
            <a
              href="https://github.com/RAJESH2961?tab=repositories"
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
                All Repos on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">

          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-widest mb-3 text-xs sm:text-sm uppercase font-semibold">Get In Touch</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Let's Work Together
            </h2>
            <p className={`max-w-lg mx-auto text-sm sm:text-base ${
              isDark ? 'text-white/55' : 'text-gray-500'
            }`}>
              Have a project in mind, a role to fill, or just want to connect? I'm always open to the right conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 scroll-animate opacity-0 translate-y-8">

            {/* Left panel — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Availability card */}
              <div className={`rounded-2xl border p-5 ${
                isDark ? 'bg-green-500/8 border-green-500/20' : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className={`text-xs font-semibold uppercase tracking-widest ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>Available Now</span>
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                  Open to <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>full-time roles</span>, <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>internships</span>, and <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>freelance projects</span>.
                </p>
                <p className={`text-xs mt-2 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                  ⚡ Typically responds within 24 hours
                </p>
              </div>

              {/* What I can help with */}
              <div className={`rounded-2xl border p-5 ${
                isDark ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <p className={`text-xs uppercase tracking-widest font-semibold mb-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>I Can Help With</p>
                <div className="space-y-2">
                  {[
                    "Full Stack Web Development",
                    "REST API Design & Integration",
                    "ML Model Integration",
                    "Cloud Deployment (AWS/Docker)",
                    "Code Review & Consultation",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className={`text-sm ${isDark ? 'text-white/65' : 'text-gray-600'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className={`rounded-2xl border p-5 ${
                isDark ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <p className={`text-xs uppercase tracking-widest font-semibold mb-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>Find Me On</p>
                <div className="space-y-2.5">
                  {[
                    { icon: <Mail className="w-4 h-4" />, label: "grajesh2906@gmail.com", href: "mailto:grajesh2906@gmail.com", display: "Email" },
                    { icon: <Linkedin className="w-4 h-4" />, label: "linkedin.com/in/rajesh2906", href: "https://www.linkedin.com/in/rajesh2906/", display: "LinkedIn" },
                    { icon: <Github className="w-4 h-4" />, label: "github.com/RAJESH2961", href: "https://github.com/RAJESH2961", display: "GitHub" },
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
                  ? 'border border-white/10 hover:border-primary/30'
                  : 'border border-gray-200 shadow-md hover:shadow-xl hover:shadow-primary/8'
              }`}>
                {/* Gradient top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-primary to-cyan-500" />

                <div className={`p-6 sm:p-8 space-y-5 ${
                  isDark ? 'bg-white/4' : 'bg-white'
                }`}>
                  {/* Form heading */}
                  <div className="mb-1">
                    <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Drop me a message</h3>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>I read every message and reply personally.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className={`block text-xs font-semibold uppercase tracking-wider ${
                        isDark ? 'text-white/45' : 'text-gray-400'
                      }`}>Your Name</label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full rounded-xl text-sm h-11 transition-all duration-200 ${
                          isDark
                            ? 'bg-white/6 border-white/12 text-white placeholder:text-white/25 focus:border-primary/70 focus:bg-white/10 hover:border-white/20'
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-primary hover:border-gray-300'
                        }`}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className={`block text-xs font-semibold uppercase tracking-wider ${
                        isDark ? 'text-white/45' : 'text-gray-400'
                      }`}>Email Address</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full rounded-xl text-sm h-11 transition-all duration-200 ${
                          isDark
                            ? 'bg-white/6 border-white/12 text-white placeholder:text-white/25 focus:border-primary/70 focus:bg-white/10 hover:border-white/20'
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-primary hover:border-gray-300'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className={`block text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-white/45' : 'text-gray-400'
                    }`}>Message</label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, role, or idea — the more detail, the better."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`w-full min-h-[150px] resize-none rounded-xl text-sm transition-all duration-200 ${
                        isDark
                          ? 'bg-white/6 border-white/12 text-white placeholder:text-white/25 focus:border-primary/70 focus:bg-white/10 hover:border-white/20'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-primary hover:border-gray-300'
                      }`}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl text-sm font-semibold group transition-all duration-300 hover:scale-[1.015] bg-gradient-to-r from-primary via-violet-500 to-primary bg-size-200 hover:bg-right shadow-lg shadow-primary/25 text-white border-0"
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
                      href="https://www.linkedin.com/in/rajesh2906/"
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

      {/* Footer with improved mobile layout */}
      <footer className={`py-8 sm:py-12 px-4 sm:px-6 border-t relative z-10 ${
        isDark ? 'border-white/10' : 'border-gray-300'
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center scroll-animate opacity-0 translate-y-8">
            <div className="text-xl sm:text-2xl font-inter mb-4 hover:scale-110 transition-all duration-300 cursor-default">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>RG</span>
              <span className="text-primary">.</span>
            </div>
            <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
              Building the future through innovative web development solutions.
            </p>
            <div className="flex justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <a 
                href="https://github.com/RAJESH2961" 
                className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark ? 'bg-white/10 hover:bg-primary/20' : 'bg-gray-100 hover:bg-primary/20'
                }`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/rajesh2906" 
                className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark ? 'bg-white/10 hover:bg-primary/20' : 'bg-gray-100 hover:bg-primary/20'
                }`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="mailto:grajesh2906@gmail.com" target="_blank"
                className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark ? 'bg-white/10 hover:bg-primary/20' : 'bg-gray-100 hover:bg-primary/20'
                }`}
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
             Build with by ❤️  Rajesh Gangadharam
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
