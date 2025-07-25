'use client';
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Code, Database, Globe, Terminal, ChevronDown, ExternalLink, BookOpen, Award, User, Briefcase } from 'lucide-react';

export default function Homepage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
  description: 'ChefGPT is an AI-powered web app that generates personalized recipes based on ingredients, cuisine preferences, and fusion choices. It includes Urdu translation, nutrition info, and user favorites — all powered by a modern full-stack with real-time AI integration.',
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
  live: 'https://nexium-hashir-grand-project.vercel.app/'
},
{
  title: 'AI Blog Summarizer',
  tech: 'Next.js, TypeScript, ShadCN UI, Supabase, MongoDB, n8n',
  description: 'A full-stack AI-based blog summarization tool that scrapes blog content, simulates AI-generated summaries, translates them to Urdu, and stores data efficiently across Supabase and MongoDB. Designed with clean UI and robust workflow automation.',
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
  live: 'https://nexium-hashir-assign2.vercel.app/'
},
{
  title: 'Inspirational Quote Generator',
  tech: 'Next.js, TypeScript, Tailwind CSS, DaisyUI, ShadCN UI',
  description: 'A sleek and interactive web app that displays a variety of inspirational quotes with aesthetic design, using modern UI libraries and responsive styling. Built for speed, polish, and engagement.',
  features: [
    'Random Quote Display',
    'Stylish UI with DaisyUI & ShadCN Components',
    'Responsive Layout with Tailwind CSS',
    'Copy Quote Functionality',
    'Clean Component-Based Architecture',
    'Live Deployment on Vercel'
  ],
  github: 'https://github.com/hashtutorial/Nexium_Hashir_Assign1',
  live: 'https://nexium-hashir-assign1.vercel.app/'
},
    {
      title: 'Banking Website',
      tech: 'PHP, MySQL, JavaScript',
      description: 'Full-stack online banking simulation with account management, secure transactions, and complaint system. Built with responsive frontend and robust PHP backend.',
      features: ['Account Creation & Login', 'Transaction Processing', 'Complaint Management', 'Secure Authentication'],
      github: 'https://github.com/hashtutorial',
      live: 'https://github.com/hashtutorial'
    },
    {
      title: 'Point of Sale System',
      tech: 'C++, OOP Design Patterns',
      description: 'Comprehensive POS system with inventory management and tier-based customer system. Implemented using advanced OOP principles and design patterns.',
      features: ['Inventory Management', 'Customer Tier System', 'Sales Analytics', 'File I/O Persistence'],
      github: 'https://github.com/hashtutorial',
      live: 'https://github.com/hashtutorial'
    },
    {
      title: 'Attendance & Leave Management',
      tech: 'C++, Design Patterns',
      description: 'Enterprise-grade console application using Factory and Observer patterns for efficient leave management and automated reporting.',
      features: ['Leave Type Management', 'Approval Workflow', 'Automated Reports', 'File-based Storage'],
      github: 'https://github.com/hashtutorial',
      live: 'https://github.com/hashtutorial'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      <style jsx>{`
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      <style jsx>{`
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
  
  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }
  
  /* Prevent body scroll when menu is open */
  body.menu-open {
    overflow: hidden;
  }
`}</style>


{/* Navigation */}
<nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50 transition-all duration-300">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex justify-between items-center">
      {/* Logo */}
      <button
        onClick={() => scrollToSection('home')}
        className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-sm"
        aria-label="Go to home section"
      >
        Your Logo
      </button>
      
      {/* Desktop Menu - Hidden on mobile */}
      <div className="hidden md:flex items-center space-x-8">
        {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent ${
              activeSection === item.toLowerCase()
                ? 'text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
            aria-current={activeSection === item.toLowerCase() ? 'page' : undefined}
          >
            {item}
            {/* Active indicator */}
            {activeSection === item.toLowerCase() && (
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
            )}
          </button>
        ))}
      </div>
      
      {/* Hamburger Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="relative w-10 h-10 flex flex-col justify-center items-center group z-50 md:hidden rounded-md hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
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
      className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/50 z-10"
      aria-label="Close menu"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* Menu Content Container */}
    <div className="flex flex-col items-center justify-center h-full px-6 pt-20 pb-8">
      {/* Menu Items Container with proper spacing */}
      <div className={`flex flex-col items-center space-y-4 transition-all duration-700 ease-out ${
        isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Menu Items */}
        {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item, index) => (
          <button
            key={item}
            onClick={() => {
              scrollToSection(item.toLowerCase());
              setIsMenuOpen(false); // Close menu after selection
            }}
            className={`relative text-2xl font-bold transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-4 focus:ring-offset-black rounded-lg px-6 py-3 ${
              activeSection === item.toLowerCase() 
                ? 'text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text' 
                : 'text-white hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text'
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
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className={`text-center z-10 max-w-4xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="mt-14 text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            MUHAMMAD HASHIR ADNAN
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-blue-400 hover:bg-blue-400 hover:text-black px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 cursor-pointer"
            >
              Get In Touch
            </button>

            <a href="/resume.pdf" download className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
              Download Resume 
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
      <section id="about" className="py-20 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
                <div className="flex items-center space-x-2 bg-blue-600/20 px-4 py-2 rounded-full">
                  <BookOpen size={20} />
                  <span>7th Semester</span>
                </div>
                <div className="flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full">
                  <Award size={20} />
                  <span>3.5 CGPA</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-600/20 px-4 py-2 rounded-full">
                  <User size={20} />
                  <span>FAST-NUCES</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-semibold mb-6 text-center">What I am Looking For</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Briefcase className="text-blue-400" size={20} />
                  <span>Software related Internships</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="text-purple-400" size={20} />
                  <span>Backend Development Opportunities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="text-green-400" size={20} />
                  <span>Full-Stack Development Projects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Terminal className="text-orange-400" size={20} />
                  <span>System Design & Architecture</span>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all">
              <Code className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill) => (
                  <span key={skill} className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all">
              <Terminal className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-4">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((skill) => (
                  <span key={skill} className="bg-purple-500/20 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 p-6 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all">
              <Database className="text-green-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-4">Tools & Tech</h3>
              <div className="flex flex-wrap gap-2">
                {skills.technologies.map((skill) => (
                  <span key={skill} className="bg-green-500/20 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 p-6 rounded-2xl border border-orange-500/20 hover:border-orange-400/40 transition-all">
              <Globe className="text-orange-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-4">Web Tech</h3>
              <div className="flex flex-wrap gap-2">
                {skills.web.map((skill) => (
                  <span key={skill} className="bg-orange-500/20 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
    <section id="projects" className="py-20 bg-black/20">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Featured Projects
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => {
        const isExpanded = expandedProject === index;
        const displayedFeatures = isExpanded
          ? project.features
          : project.features.slice(0, 3);

        return (
          <div
            key={index}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all transform hover:scale-105 hover:shadow-2xl"
          >
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

            <div className="mt-6 pt-4 border-t border-gray-700">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Github size={16} />
                <span className="text-sm font-medium">View Code</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>


      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education & Coursework
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-2xl border border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Computer Science</h3>
                  <p className="text-xl text-blue-400 font-semibold">FAST National University of Computer & Emerging Sciences</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <p className="text-lg font-semibold text-green-400">CGPA: 3.5/4.0</p>
                  <p className="text-gray-300">Expected: Spring 2026</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Core Courses</h4>
                  <div className="space-y-2">
                    {['Data Structures', 'Design and Analysis of Algorithms', 'Database Systems', 'Object-Oriented Programming', 'Operating Systems', 'Computer Networks'].map((course) => (
                      <div key={course} className="flex items-center space-x-2">
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
                      <div key={course} className="flex items-center space-x-2">
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Connect with me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring innovative ideas to life. Let us discuss opportunities and build something amazing together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a href="mailto:hashiradnan679@gmail.com" className="bg-gradient-to-br from-red-600/20 to-red-800/20 p-6 rounded-2xl border border-red-500/20 hover:border-red-400/40 transition-all transform hover:scale-105 text-center group">
              <Mail className="mx-auto mb-4 text-red-400 group-hover:text-red-300" size={32} />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300 break-all">hashiradnan679@gmail.com</p>
            </a>

            <a href="tel:03064923048" className="bg-gradient-to-br from-green-600/20 to-green-800/20 p-6 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all transform hover:scale-105 text-center group">
              <Phone className="mx-auto mb-4 text-green-400 group-hover:text-green-300" size={32} />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">+92 306 492 3048</p>
            </a>

            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 rounded-2xl border border-blue-500/20 text-center">
              <MapPin className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-300">Lahore, Punjab, Pakistan</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/hashtutorial" className="bg-gray-800 hover:bg-gray-700 p-4 rounded-full transition-colors transform hover:scale-110">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/muhammad-hashir-adnan-434128280" className="bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition-colors transform hover:scale-110">
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
