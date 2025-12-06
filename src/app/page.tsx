'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Code, Database, Globe, Terminal, ChevronDown, ExternalLink, BookOpen, Award, User, Briefcase, X, ArrowRight, Star, Calendar, Zap, Layers } from 'lucide-react';

export default function Homepage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [typedText, setTypedText] = useState('');
  const particlePositionsRef = useRef<{x: number, y: number, size: number, speedX: number, speedY: number}[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [skillLevels, setSkillLevels] = useState<{[key: string]: number}>({});

  const fullText = "MUHAMMAD HASHIR ADNAN";
  
  // Typing effect
  useEffect(() => {
    // Initialize with first character
    if (typedText === '') {
      setTypedText(fullText.charAt(0));
      return;
    }
    
    // Continue typing
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  // Particle effect
  useEffect(() => {
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5
    }));
    particlePositionsRef.current = particles;
  }, []);

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlePositionsRef.current = particlePositionsRef.current.map((particle: {x: number, y: number, size: number, speedX: number, speedY: number}) => {
        let newX = particle.x + particle.speedX;
        let newY = particle.y + particle.speedY;
        
        if (newX < 0 || newX > canvas.width) {
          particle.speedX = -particle.speedX;
          newX = particle.x + particle.speedX;
        }
        
        if (newY < 0 || newY > canvas.height) {
          particle.speedY = -particle.speedY;
          newY = particle.y + particle.speedY;
        }
        
        ctx.beginPath();
        ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.5)';
        ctx.fill();
        
        return { ...particle, x: newX, y: newY };
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate skill levels
  useEffect(() => {
    const skills = {
      'C++': 90,
      'Python': 85,
      'JavaScript': 80,
      'Next.js': 75,
      'React': 75,
      'Database': 70,
      'Git': 85,
      'Linux': 70
    };
    
    const timer = setTimeout(() => {
      setSkillLevels(skills);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'about', 'skills', 'projects', 'achievements', 'testimonials', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('#mobile-menu') && !target.closest('[aria-label*="menu"]')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const skills = {
    languages: ['C++', 'Python', 'JavaScript', 'PHP', 'SQL', 'C', 'Bash', 'Assembly'],
    frameworks: ['Next.js', 'React', 'NumPy', 'Pandas', 'Scikit-learn', 'OpenMP', 'MPI'],
    technologies: ['MySQL','Supabase','MongoDB', 'Git', 'Linux', 'VS Code','node js','n8n', 'Wireshark', 'Docker'],
    web: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL','PostgreSQL']
  };

  const projects = [
    {
      title: 'ChefGPT – Personalized Recipe Generator',
      tech: 'Next.js, TypeScript, ShadCN UI, Supabase, n8n, TogetherAI',
      description: 'ChefGPT is an AI-powered web app that generates personalized recipes based on ingredients, cuisine preferences, and fusion choices.',
      features: [
        'AI Recipe Generation with TogetherAI',
        'Ingredient & Cuisine-based Personalization',
        'Fusion Cooking Mode',
        'Urdu Translation of Recipes',
        'Nutrition Information Included',
        'Supabase Auth & Favorites System',
        'n8n Workflow Integration for LLM Processing',
        'Responsive UI with ShadCN & Tailwind'
      ],
      github: 'https://github.com/hashtutorial/Nexium_Hashir_grand-project',
      live: 'https://nexium-hashir-grand-project.vercel.app/',
      category: 'ai',
      image: '/api/placeholder/600/400'
    },
    {
      title: 'AI Blog Summarizer',
      tech: 'Next.js, TypeScript, ShadCN UI, Supabase, MongoDB, n8n',
      description: 'A full-stack AI-based blog summarization tool that scrapes blog content, simulates AI-generated summaries, and translates them to Urdu.',
      features: [
        'Blog URL Input & Scraping',
        'Simulated AI Summary Logic',
        'Urdu Translation via Dictionary Mapping',
        'Supabase for Summary Storage',
        'MongoDB for Full Blog Content Storage',
        'Workflow Automation using n8n',
        'Clean Responsive UI with ShadCN & Tailwind',
        'CI/CD with GitHub Actions & Vercel Deployment'
      ],
      github: 'https://github.com/hashtutorial/Nexium_Hashir_Assign2',
      live: 'https://nexium-hashir-assign2.vercel.app/',
      category: 'ai',
      image: '/api/placeholder/600/400'
    },
    {
      title: 'Inspirational Quote Generator',
      tech: 'Next.js, TypeScript, Tailwind CSS, DaisyUI, ShadCN UI',
      description: 'A sleek and interactive web app that displays a variety of inspirational quotes with aesthetic design.',
      features: [
        'Random Quote Display',
        'Stylish UI with DaisyUI & ShadCN Components',
        'Responsive Layout with Tailwind CSS',
        'Copy Quote Functionality',
        'Clean Component-Based Architecture',
        'Live Deployment on Vercel'
      ],
      github: 'https://github.com/hashtutorial/Nexium_Hashir_Assign1',
      live: 'https://nexium-hashir-assign1.vercel.app/',
      category: 'ai',
      image: '/api/placeholder/600/400'
    },
    {
      title: 'Banking Website',
      tech: 'PHP, MySQL, JavaScript',
      description: 'Full-stack online banking simulation with account management, secure transactions, and complaint system.',
      features: ['Account Creation & Login', 'Transaction Processing', 'Complaint Management', 'Secure Authentication'],
      github: 'https://github.com/hashtutorial',
      live: 'https://github.com/hashtutorial',
      category: 'web',
      image: '/api/placeholder/600/400'
    },
    {
      title: 'Point of Sale System',
      tech: 'C++, OOP Design Patterns',
      description: 'Comprehensive POS system with inventory management and tier-based customer system.',
      features: ['Inventory Management', 'Customer Tier System', 'Sales Analytics', 'File I/O Persistence'],
      github: 'https://github.com/hashtutorial',
      live: 'https://github.com/hashtutorial',
      category: 'desktop',
      image: '/api/placeholder/600/400'
    },
    {
      title: 'Attendance & Leave Management',
      tech: 'C++, Design Patterns',
      description: 'Enterprise-grade console application using Factory and Observer patterns for efficient leave management.',
      features: ['Leave Type Management', 'Approval Workflow', 'Automated Reports', 'File-based Storage'],
      github: 'https://github.com/hashtutorial',
      live: 'https://github.com/hashtutorial',
      category: 'desktop',
      image: '/api/placeholder/600/400'
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Ahmed",
      position: "Professor of Computer Science",
      company: "FAST-NUCES",
      content: "Hashir demonstrates exceptional problem-solving skills and a deep understanding of complex algorithms. His projects consistently show innovation and technical excellence.",
      avatar: "/api/placeholder/100/100"
    },
    {
      name: "John Mitchell",
      position: "Senior Software Engineer",
      company: "TechCorp Solutions",
      content: "I mentored Hashir during his internship and was impressed by his ability to quickly grasp new concepts and apply them effectively. He's a natural talent in full-stack development.",
      avatar: "/api/placeholder/100/100"
    },
    {
      name: "Ayesha Khan",
      position: "Project Manager",
      company: "Digital Innovations",
      content: "Hashir's attention to detail and commitment to quality set him apart. He delivered our project ahead of schedule with exceptional code quality and documentation.",
      avatar: "/api/placeholder/100/100"
    }
  ];

  const achievements = [
    {
      title: "Dean's List",
      description: "Recognized for academic excellence",
      date: "Fall 2023",
      icon: <Award className="text-yellow-400" size={24} />
    },
    {
      title: "Book Trivia Competition Winner",
      description: "Winner in NASCON' 24",
      date: "2024",
      icon: <Zap className="text-blue-400" size={24} />
    },
    {
      title: "Research Publication",
      description: "Co-authored paper on Machine Learning Applications",
      date: "Winter 2022",
      icon: <BookOpen className="text-green-400" size={24} />
    },
    {
      title: "Open Source Contributor",
      description: "Active contributor to multiple open source projects",
      date: "Ongoing",
      icon: <Github className="text-purple-400" size={24} />
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hashiradnan679@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to a server
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.8); }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink {
          50% { border-color: transparent; }
        }
        
        .gradient-bg {
          background: linear-gradient(-45deg, #0f172a, #1e1b4b, #312e81, #1e1b4b);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        .glow {
          animation: pulse-glow 2s infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .text-gradient {
          background: linear-gradient(to right, #60a5fa, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end);
        }
        
        .typing-cursor {
          animation: blink 0.75s step-end infinite;
          border-right: 3px solid white;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-y-10 {
          transform: rotateY(10deg);
        }
        
        .rotate-y-10:hover {
          transform: rotateY(0deg);
        }
        
        .skill-bar {
          transition: width 2s ease-in-out;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #60a5fa, #a78bfa);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
        }
      `}</style>

      {/* Particle Background */}
      <canvas 
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0"
      />

      {/* Custom cursor */}
      <div 
        className="fixed w-6 h-6 rounded-full bg-purple-500 opacity-50 pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{ 
          left: `${mousePosition.x - 12}px`, 
          top: `${mousePosition.y - 12}px`,
          transform: isHovered ? 'scale(2)' : 'scale(1)'
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'glass-effect py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="relative z-10 flex items-center focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
              aria-label="Go to home section"
            >
              <div className="relative w-10 h-10 mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold transform -rotate-45">
                  H
                </div>
              </div>
              <span className="text-xl font-bold text-gradient">Hashir</span>
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Skills', 'Projects', 'Achievements', 'Testimonials', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent ${
                    activeSection === item.toLowerCase()
                      ? 'text-gradient'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                  aria-current={activeSection === item.toLowerCase() ? 'page' : undefined}
                  onMouseEnter={() => setIsHovered(item)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {item}
                  {/* Active indicator */}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex flex-col justify-center items-center group z-50 md:hidden rounded-md hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
              }`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          id="mobile-menu"
          className={`fixed inset-0 bg-black/95 backdrop-blur-lg transition-all duration-500 ease-in-out md:hidden ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          {/* Screen reader title */}
          <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
          
          {/* Close button for better UX */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400/50 z-10"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Menu Content Container */}
          <div className="flex flex-col items-center justify-center h-full px-6 pt-20 pb-8">
            {/* Menu Items Container with proper spacing */}
            <div className={`flex flex-col items-center space-y-4 transition-all duration-700 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* Menu Items */}
              {['About', 'Skills', 'Projects', 'Achievements', 'Testimonials', 'Education', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  className={`relative text-2xl font-bold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-4 focus:ring-offset-black rounded-lg px-6 py-3 ${
                    activeSection === item.toLowerCase() 
                      ? 'text-gradient' 
                      : 'text-white hover:text-gradient'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMenuOpen ? 'slideInFromRight 0.6s ease-out forwards' : 'none'
                  }}
                  aria-current={activeSection === item.toLowerCase() ? 'page' : undefined}
                >
                  {item}
                  
                  {/* Active indicator for mobile */}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
           
            {/* Social Links in Menu */}
            <div className={`flex space-x-8 mt-8 transition-all duration-700 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`} style={{ animationDelay: '500ms' }}>
              <a 
                href="https://github.com/hashtutorial" 
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-12"
              >
                <Github size={28} />
              </a>
              <a 
                href="https://linkedin.com/in/muhammad-hashir-adnan-434128280" 
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
              >
                <Linkedin size={28} />
              </a>
              <a 
                href="mailto:hashiradnan679@gmail.com" 
                className="text-gray-400 hover:text-red-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg">
        <div className="absolute inset-0">
          {/* Animated background elements */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating" style={{ animationDelay: '4s' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        </div>
        
        <div className={`text-center z-10 max-w-4xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="mt-14 text-6xl md:text-8xl font-bold mb-6 text-gradient">
            <span>{typedText || fullText}</span>
            {typedText && typedText.length < fullText.length && <span className="typing-cursor ml-1"></span>}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Computer Science Student at FAST-NUCES
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Building efficient systems and meaningful products with modern technologies. 
            Passionate about full stack development, and creating impactful, innovative solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer flex items-center"
            >
              View My Work
              <ArrowRight className="ml-2" size={18} />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 cursor-pointer flex items-center"
            >
              Get In Touch
              <Mail className="ml-2" size={18} />
            </button>

            <a href="/resume.pdf" download className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center">
              Download Resume 
              <ExternalLink className="ml-2" size={18} />
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://github.com/hashtutorial" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
              <Github size={28} />
            </a>
            <a href="https://linkedin.com/in/muhammad-hashir-adnan-434128280" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
              <Linkedin size={28} />
            </a>
            <a href="mailto:hashiradnan679@gmail.com" className="text-gray-400 hover:text-red-400 transition-colors transform hover:scale-110">
              <Mail size={28} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 glass-effect">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I am a driven Computer Science student at FAST-NUCES, currently in my 7th semester with a strong 3.5 CGPA. 
                My passion lies in building efficient systems and working on meaningful projects that make a real impact.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With over 3 years of experience in C++ and growing expertise in Python, JavaScript, and modern web technologies (Next.js, React), I have developed a solid foundation in software engineering principles.
                I enjoy tackling complex problems and creating solutions that matter.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-blue-600/20 px-4 py-2 rounded-full hover-lift">
                  <BookOpen size={20} />
                  <span>7th Semester</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full hover-lift">
                  <Award size={20} />
                  <span>3.5 CGPA</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-600/20 px-4 py-2 rounded-full hover-lift">
                  <User size={20} />
                  <span>FAST-NUCES</span>
                </div>
              </div>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl hover-lift perspective-1000">
              <div className="transform-3d rotate-y-10 transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-6 text-center text-gradient">What I am Looking For</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform">
                    <Briefcase className="text-blue-400" size={20} />
                    <span>Software related Internships</span>
                  </div>
                  <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform">
                    <Database className="text-purple-400" size={20} />
                    <span>Backend Development Opportunities</span>
                  </div>
                  <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform">
                    <Code className="text-green-400" size={20} />
                    <span>Full-Stack Development Projects</span>
                  </div>
                  <div className="flex items-center space-x-3 hover:translate-x-2 transition-transform">
                    <Terminal className="text-orange-400" size={20} />
                    <span>System Design & Architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Technical Arsenal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="glass-effect p-6 rounded-2xl hover-lift">
                <div className="flex items-center mb-4">
                  {category === 'languages' && <Code className="text-blue-400 mr-3" size={24} />}
                  {category === 'frameworks' && <Terminal className="text-purple-400 mr-3" size={24} />}
                  {category === 'technologies' && <Database className="text-green-400 mr-3" size={24} />}
                  {category === 'web' && <Globe className="text-orange-400 mr-3" size={24} />}
                  <h3 className="text-xl font-semibold capitalize">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className={`bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-full text-sm hover:from-blue-500/40 hover:to-purple-500/40 transition-all cursor-pointer`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skill Progress Bars */}
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gradient">Proficiency Levels</h3>
            <div className="space-y-4">
              {Object.entries(skillLevels).map(([skill, level]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill}</span>
                    <span className="text-gray-400">{level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="skill-bar bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 glass-effect">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>

          {/* Project Filters */}
          <div className="flex justify-center mb-8">
            <div className="glass-effect p-1 rounded-full">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'all' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveFilter('web')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'web' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Web
              </button>
              <button
                onClick={() => setActiveFilter('ai')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'ai' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                AI
              </button>
              <button
                onClick={() => setActiveFilter('desktop')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'desktop' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Desktop
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const isExpanded = expandedProject === index;
              const displayedFeatures = isExpanded
                ? project.features
                : project.features.slice(0, 3);

              return (
                <div
                  key={index}
                  className="glass-effect p-6 rounded-2xl hover-lift overflow-hidden group perspective-1000"
                >
                  <div className="transform-3d rotate-y-10 transition-all duration-500 h-full">
                    {/* Project Image */}
                    <div className="h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg mb-4 overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Layers size={48} className="text-white/30" />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-opacity duration-300"
                        >
                          View Live
                        </a>
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>

                    <p className="text-sm text-blue-400 mb-3 font-medium">
                      {project.tech}
                    </p>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-2">
                      {displayedFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-gray-400">{feature}</span>
                        </div>
                      ))}

                      {project.features.length > 3 && (
                        <button
                          onClick={() =>
                            setExpandedProject(isExpanded ? null : index)
                          }
                          className="text-blue-400 text-sm mt-1 hover:underline focus:outline-none"
                        >
                          {isExpanded
                            ? '– Show less'
                            : `+ Show ${project.features.length - 3} more`}
                        </button>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Github size={16} />
                        <span className="text-sm font-medium">View Code</span>
                      </a>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="glass-effect p-6 rounded-2xl hover-lift">
                      <div className="flex items-center mb-2">
                        {achievement.icon}
                        <h3 className="text-xl font-semibold ml-2">{achievement.title}</h3>
                      </div>
                      <p className="text-gray-400 mb-2">{achievement.description}</p>
                      <p className="text-sm text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-black"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 glass-effect">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Testimonials
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-effect p-6 rounded-2xl hover-lift perspective-1000">
                <div className="transform-3d rotate-y-10 transition-all duration-500 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.position}</p>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 italic flex-grow">&ldquo;{testimonial.content}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Education & Coursework
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-effect p-8 rounded-2xl hover-lift perspective-1000">
              <div className="transform-3d rotate-y-10 transition-all duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Computer Science</h3>
                    <p className="text-xl text-blue-400 font-semibold">FAST National University of Computer & Emerging Sciences</p>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-lg font-semibold text-green-400">CGPA: 3.5/4.0</p>
                    <p className="text-gray-300 flex items-center">
                      <Calendar size={16} className="mr-1" />
                      Expected: Summer 2026
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Core Courses</h4>
                    <div className="space-y-2">
                      {['Data Structures', 'Design and Analysis of Algorithms', 'Database Systems', 'Object-Oriented Programming', 'Operating Systems', 'Computer Networks'].map((course) => (
                        <div key={course} className="flex items-center space-x-2 hover:translate-x-2 transition-transform">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Advanced Courses</h4>
                    <div className="space-y-2">
                      {['Artificial Intelligence', 'Compiler Construction', 'Parallel and Distributed Computing', 'Software Engineering', 'Software Design and Analysis', 'Programming Fundamentals'].map((course) => (
                        <div key={course} className="flex items-center space-x-2 hover:translate-x-2 transition-transform">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-gray-300">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 glass-effect">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Connect with me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring innovative ideas to life. Let us discuss opportunities and build something amazing together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <a 
                href="mailto:hashiradnan679@gmail.com" 
                className="glass-effect p-6 rounded-2xl hover-lift flex items-center space-x-4 group"
                onClick={(e) => {
                  e.preventDefault();
                  copyEmail();
                }}
              >
                <div className="bg-red-600/20 p-3 rounded-full group-hover:bg-red-600/30 transition-colors">
                  <Mail className="text-red-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-gray-300">hashiradnan679@gmail.com</p>
                  {copiedEmail && <p className="text-green-400 text-sm mt-1">Copied to clipboard!</p>}
                </div>
              </a>

              <a href="tel:03064923048" className="glass-effect p-6 rounded-2xl hover-lift flex items-center space-x-4 group">
                <div className="bg-green-600/20 p-3 rounded-full group-hover:bg-green-600/30 transition-colors">
                  <Phone className="text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-gray-300">+92 306 492 3048</p>
                </div>
              </a>

              <div className="glass-effect p-6 rounded-2xl hover-lift flex items-center space-x-4 group">
                <div className="bg-blue-600/20 p-3 rounded-full group-hover:bg-blue-600/30 transition-colors">
                  <MapPin className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-gray-300">Lahore, Punjab, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="glass-effect p-6 rounded-2xl perspective-1000">
              <div className="transform-3d rotate-y-10 transition-all duration-500">
                <h3 className="text-xl font-semibold mb-4">Send me a message</h3>
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg">Thank you for your message!</p>
                    <p className="text-gray-400">I&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-400 transition-colors resize-none"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/hashtutorial" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-full transition-colors transform hover:scale-110">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/muhammad-hashir-adnan-503199397" className="bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition-colors transform hover:scale-110">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Muhammad Hashir Adnan.
          </p>
        </div>
      </footer>
    </div>
  );
}
