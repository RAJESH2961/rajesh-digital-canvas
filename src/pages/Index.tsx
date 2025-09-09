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


const Index = () => {
  const { isDark } = useTheme();
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { toast } = useToast();

  const words = ["FULL STACK WEB DEVELOPER", "ML ENTHUSIAST"];

  // Experience data
  const experiences = [
    {
      id: 1,
      company: "Digital Hercules Innovations",
      position: "Django Developer",
      duration: "March 2025 - June 2025",
      location: "Online UttarPradesh",
      // description: "Designed and implemented secure RESTful APIs with Django REST Framework and JWT, optimized database queries using ORM and raw SQL, integrated third-party APIs, ensured data validation and serialization, performed API testing with Postman, managed code with Git, and collaborated in Agile teams.",
      description : "Integrated Amazon Ads API to efficiently fetch and store advertising data using Django models. - Developed robust RESTful APIs with Django REST Framework, enhancing frontend-backend communication. - Implemented JWT-based authentication for secure API access, ensuring data protection.",
      technologies: ["Django", "DjangoRestFramework", "Postman", "API testing"]
    },
    {
      id: 2,
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

  // Optimized typewriter animation with requestAnimationFrame
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 30 : 100; // Faster speeds for smoother animation
    let animationId: number;

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
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      }, typingSpeed);

      return timeout;
    };

    const timeout = animate();
    return () => clearTimeout(timeout);
  }, [typedText, currentWordIndex, isDeleting, words]);

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

      {/* Hero Section with improved mobile responsiveness */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6 sm:space-y-8 animate-fadeInUp">
            {/* Availability badge with optimized animation */}
            <div className={`inline-flex items-center px-3 sm:px-4 py-2 rounded-full border text-sm mb-6 sm:mb-8 backdrop-blur-sm transition-all duration-200 animate-float gpu-accelerated ${
              isDark 
                ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10' 
                : 'bg-white/70 border-gray-300 text-gray-800 hover:bg-white/90 shadow-lg'
            }`}>
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              Available for new opportunities
            </div>
            
            {/* Main Title */}
            <div className="space-y-3 sm:space-y-4">
              <p className="text-primary tracking-wider text-base sm:text-lg animate-fadeInUp font-medium" style={{animationDelay: '0.2s'}}>Hello! I Am</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-poppins leading-tight animate-fadeInUp font-semibold" style={{animationDelay: '0.4s'}}>
                <span className={`hover:text-gradient transition-all duration-500 cursor-default ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>RAJESH</span>
                <br />
                <span className="text-primary hover:scale-105 transition-transform duration-300 cursor-default inline-block">GANGADHARAM</span>
              </h1>
              <div className="text-lg sm:text-xl md:text-2xl font-light animate-fadeInUp gpu-accelerated" style={{animationDelay: '0.6s'}}>
                <span className="text-gradient-blue gpu-accelerated">{typedText}</span>
                <span className="animate-pulse text-primary gpu-accelerated">|</span>
              </div>
            </div>
            
            <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fadeInUp px-4 ${
              isDark ? 'text-white/70' : 'text-gray-700'
            }`} style={{animationDelay: '0.8s'}}>
              Building modern web experiences with Django, React, and Next.js code that connects and converts.
            </p>
            
            {/* Call to action buttons with improved mobile layout */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-12 animate-fadeInUp px-4" style={{animationDelay: '1s'}}>
              <a
  href="/Rajesh_Fullstack_Developer.pdf"
  target="_blank"
  download
  className={`w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg group hover:scale-105 transition-all duration-300 ${
    isDark
      ? 'bg-primary hover:bg-primary-600  hover:text-white'
      : 'bg-primary hover:bg-primary-600 hover:text-white'
  }`}
>
  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
  Download Resume
</a>
              <Button 
                variant="outline" 
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:scale-105 transition-all duration-300 ${
                  isDark 
                    ? 'border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/30' 
                    : 'border-gray-400 text-gray-800 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-500'
                }`} 
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with improved mobile layout */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 scroll-animate opacity-0 translate-y-8">
              <div>
                <p className="text-primary tracking-wider mb-4 text-sm sm:text-base">ABOUT ME</p>
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins mb-4 sm:mb-6 hover:text-gradient transition-all duration-500 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  I'm a Student
                </h2>
                <p className={`text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}>
                  Hi! I'm a passionate and curious Computer Science Engineering (CSE) student in my 3rd year at <span><a href='https://apollouniversity.edu.in/' target='_blank'>The Apollo Univerisity</a></span>. I enjoy exploring the world of software development, building projects, and learning new technologies.
                </p>
                <p className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-white/70' : 'text-gray-600'
                }`}> 
                  I make impactful web applications using modern technologies like React, 
                  Next.js, Django and cloud platforms.
                </p>
              </div>
            </div>
            
            {/* Profile Image with optimized animation */}
            <div className="relative scroll-animate opacity-0 translate-y-8">
              <div className={`w-full max-w-sm sm:max-w-md mx-auto aspect-square rounded-full backdrop-blur-sm border flex items-center justify-center animate-float smooth-hover transition-all duration-300 gpu-accelerated ${
                isDark 
                  ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-white/10' 
                  : 'bg-gradient-to-br from-primary/10 to-accent/10 border-gray-300 shadow-xl'
              }`}>
                <div className={`w-54 sm:w-21 h-54 sm:h-21 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gradient-to-br from-primary/30 to-purple-500/30' : 'bg-gradient-to-br from-primary/20 to-purple-500/20'
                }`}>
                  <img 
        src="/image.png" 
        alt="Rajesh Image" 
        className="w-full h-full object-cover rounded-full  ring-2 ring-purple-600"
      />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with improved mobile grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-wider mb-4 text-sm sm:text-base">TECHNICAL SKILLS</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins mb-4 sm:mb-6 hover:text-gradient transition-all duration-500 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Technologies I Work With
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 scroll-animate opacity-0 translate-y-8">
            {/* Frontend Skills */}
            <Card className={`w-[95%] mx-auto md:w-full backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-white/90 border-gray-300 hover:bg-white hover:shadow-xl'
            }`}>
              <CardHeader className="text-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                  <Code className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
                </div>
                <CardTitle className={`text-lg sm:text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Frontend Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillsData.frontend.map((skill, index) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className={`transition-all duration-300 hover:scale-105 text-xs sm:text-sm ${
                        isDark 
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30' 
                          : 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200'
                      }`}
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Backend Skills */}
            <Card className={`w-[95%] mx-auto md:w-full backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-white/90 border-gray-300 hover:bg-white hover:shadow-xl'
            }`}>
              <CardHeader className="text-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 mx-auto rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                  <Database className="w-6 sm:w-8 h-6 sm:h-8 text-green-500" />
                </div>
                <CardTitle className={`text-lg sm:text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Backend Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillsData.backend.map((skill, index) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className={`transition-all duration-300 hover:scale-105 text-xs sm:text-sm ${
                        isDark 
                          ? 'bg-green-500/20 text-green-300 border-green-500/40 hover:bg-green-500/30' 
                          : 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200'
                      }`}
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Other Skills */}
            <Card className={`w-[95%] mx-auto md:w-full backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${
              isDark 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-white/90 border-gray-300 hover:bg-white hover:shadow-xl'
            }`}>
              <CardHeader className="text-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 mx-auto rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mb-4">
                  <Wrench className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" />
                </div>
                <CardTitle className={`text-lg sm:text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Tools & Others</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillsData.other.map((skill, index) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className={`transition-all duration-300 hover:scale-105 text-xs sm:text-sm ${
                        isDark 
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 hover:bg-orange-500/30' 
                          : 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200'
                      }`}
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-wider mb-4 text-sm sm:text-base">WORK EXPERIENCE</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins mb-4 sm:mb-6 hover:text-gradient transition-all duration-500 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              My Professional Journey
            </h2>
          </div>
          
          <div className="space-y-6 sm:space-y-8 scroll-animate opacity-0 translate-y-8">
            {experiences.map((experience, index) => (
              <Card 
                key={experience.id} 
                className={`w-[95%] mx-auto md:w-full backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-fadeInUp ${
                  isDark 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white/90 border-gray-300 hover:bg-white hover:shadow-xl'
                }`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="md:col-span-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
                          {experience.duration}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm">
                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" />
                        <span className={isDark ? 'text-white/70' : 'text-gray-700'}>{experience.location}</span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-3">
                      <h3 className={`text-xl sm:text-2xl mb-2 sm:mb-3 group-hover:text-primary transition-all duration-300 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {experience.position}
                      </h3>
                      <h4 className={`text-base sm:text-lg mb-3 sm:mb-4 ${
                        isDark ? 'text-white/80' : 'text-gray-700'
                      }`}>
                        {experience.company}
                      </h4>
                      <p className={`text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 ${
                        isDark ? 'text-white/70' : 'text-gray-700'
                      }`}>
                        {experience.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className={`transition-all duration-300 hover:scale-105 text-xs sm:text-sm ${
                              isDark 
                                ? 'bg-white/10 text-white border-white/20 hover:bg-primary/20 hover:border-primary/40' 
                                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-primary/20 hover:border-primary/40'
                            }`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16 scroll-animate opacity-0 translate-y-8">
            {/* <p className="text-primary tracking-wider mb-4 text-sm sm:text-base">FEATURED PROJECTS</p> */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins mb-4 sm:mb-6 hover:text-gradient transition-all duration-500 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              My Recent Work
            </h2>
            <p className={`max-w-2xl mx-auto text-base sm:text-lg ${
              isDark ? 'text-white/70' : 'text-gray-700'
            }`}>
              Here are some of my {showAllProjects ? 'all' : 'featured'} projects that showcase my skills and experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 scroll-animate opacity-0 translate-y-8">
            {displayProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`w-[95%] mx-auto md:w-full group relative backdrop-blur-sm border rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-fadeInUp ${
                  isDark 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white/90 border-gray-300 hover:bg-white hover:shadow-xl'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    {project.featured && (
                      <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse text-xs sm:text-sm">Featured</Badge>
                    )}
                    <div className="flex space-x-2 ml-auto">
                      <a 
                        href={project.githubUrl} 
                        className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                          isDark ? 'bg-white/10 hover:bg-primary/20' : 'bg-gray-100 hover:bg-primary/20'
                        }`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 sm:w-5 h-4 sm:h-5" />
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                            isDark ? 'bg-white/10 hover:bg-primary/20' : 'bg-gray-100 hover:bg-primary/20'
                          }`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 group-hover:text-primary transition-all duration-300 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      isDark ? 'text-white/70' : 'text-gray-700'
                    }`}>
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className={`transition-all duration-300 hover:scale-105 text-xs sm:text-sm ${
                          isDark 
                            ? 'bg-white/10 text-white border-white/20 hover:bg-primary/20 hover:border-primary/40' 
                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-primary/20 hover:border-primary/40'
                        }`}
                        style={{animationDelay: `${techIndex * 0.05}s`}}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12 scroll-animate opacity-0 translate-y-8">
  {/* Toggle Projects Button */}
  <Button 
    variant="outline" 
    className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 group ${
      isDark 
        ? 'border-primary text-primary hover:bg-primary-600 hover:text-white' 
        : 'border-primary text-primary hover:bg-primary-600 hover:text-white'
    }`}
    onClick={() => setShowAllProjects(!showAllProjects)}
  >
    <Eye className="w-4 sm:w-5 h-4 sm:h-5 mr-2 group-hover:animate-bounce" />
    {showAllProjects ? 'Show Featured Only' : 'View All Projects'}
  </Button>

  {/* GitHub Redirect Button */}
  <a 
    href="https://github.com/RAJESH2961?tab=repositories" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-block mt-4"
  >
    <Button
      variant="outline"
      className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 group ${
        isDark 
          ? 'border-primary text-primary hover:bg-primary-600 hover:text-white' 
          : 'border-primary text-primary hover:bg-primary-600 hover:text-white'
      }`}
    >
      <Eye className="w-4 sm:w-5 h-4 sm:h-5 mr-2 group-hover:animate-bounce" />
      See Everything I’ve Built
    </Button>
  </a>
</div>

        </div>
      </section>

      {/* Contact Section with improved form inputs and mobile layout */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16 scroll-animate opacity-0 translate-y-8">
            <p className="text-primary tracking-wider mb-4 text-sm sm:text-base">GET IN TOUCH</p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-poppins mb-4 sm:mb-6 hover:text-gradient transition-all duration-500 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Let's Work Together
            </h2>
            <p className={`max-w-2xl mx-auto text-base sm:text-lg ${
              isDark ? 'text-white/70' : 'text-gray-700'
            }`}>
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 scroll-animate opacity-0 translate-y-8">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 group">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300">
                    <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <div>
                    {/* <div className={`text-base sm:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Email</div> */}
                    <div className={`text-sm sm:text-base ${isDark ? 'text-white/70' : 'text-gray-700'}`}><a href='mailto:grajesh2906@gmail.com' target="_blank">Email me</a></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 group">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300">
                    <Github className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <div>
                    {/* <div className={`text-base sm:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>GitHub</div> */}
                    <div className={`text-sm sm:text-base ${isDark ? 'text-white/70' : 'text-gray-700'}`}><a href='https://github.com/RAJESH2961' target="_blank">Github</a></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 hover:scale-105 transition-all duration-300 group">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300">
                    <Linkedin className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <div>
                    {/* <div className={`text-base sm:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>LinkedIn</div> */}
                    <div className={`text-sm sm:text-base ${isDark ? 'text-white/70' : 'text-gray-700'}`}><a href='https://www.linkedin.com/in/rajesh2906/' target="_blank">LinkedIn</a></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Improved form with better input styling and mobile responsiveness */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className={`w-[95%] mx-auto lg:w-full p-6 sm:p-8 space-y-6 rounded-3xl transition-all duration-500 ${
                isDark 
                  ? 'glass-card hover:shadow-2xl hover:shadow-primary/10' 
                  : 'bg-white/90 backdrop-blur-sm border border-gray-300 hover:shadow-xl'
              }`}>
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Name</label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full rounded-xl focus:border-primary focus:ring-primary transition-all duration-300 ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-primary'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@webgenius.io"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full rounded-xl focus:border-primary focus:ring-primary transition-all duration-300 ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-primary'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Message</label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your stuff..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full min-h-[120px] resize-none rounded-xl focus:border-primary focus:ring-primary transition-all duration-300 ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-primary'
                    }`}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg group hover:scale-105 transition-all duration-300 ${
                    isDark
                      ? 'bg-primary hover:bg-primary-600 text-white hover:text-white'
                      : 'bg-primary hover:bg-primary-600 text-black hover:text-white'
                  }`}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 sm:w-5 h-4 sm:h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>
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
