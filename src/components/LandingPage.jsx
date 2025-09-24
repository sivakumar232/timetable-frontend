import React, { useState, useEffect } from 'react';
import { Brain, Shield, Book, MousePointer, Upload, Settings, Rocket, UserCheck, GraduationCap, Users, Menu, X, ArrowRight, ChevronRight, Code, Zap, Globe, Sun, Moon } from "lucide-react";
import {Link} from 'react-router-dom';

const features = [
  {
    icon: <Brain size={32} color="#0891b2" />,
    title: "AI-Powered Optimization",
    desc: "Our intelligent algorithm handles complex constraints to create the most efficient schedule.",
    highlight: "Smart AI"
  },
  {
    icon: <Shield size={32} color="#0891b2" />,
    title: "Conflict-Free Guarantee",
    desc: "Automatically prevents clashes for students, faculty, and rooms.",
    highlight: "Zero conflicts"
  },
  {
    icon: <Book size={32} color="#0891b2" />,
    title: "Built for NEP 2020",
    desc: "Seamlessly manages Majors, Minors, skill courses, and credit-based structures.",
    highlight: "100% compliant"
  },
  {
    icon: <MousePointer size={32} color="#0891b2" />,
    title: "User-Friendly Interface",
    desc: "Upload your data and generate a complete timetable with just a few clicks.",
    highlight: "3 clicks only"
  },
];

const howItWorks = [
  {
    icon: <Upload size={40} color="#0891b2" />,
    title: "Upload",
    desc: "Securely upload your CSV files for courses, faculty, students and rooms.",
  },
  {
    icon: <Settings size={40} color="#0891b2" />,
    title: "Configure",
    desc: "Set your hard and soft constraints, like faculty preferences and workload balance.",
  },
  {
    icon: <Rocket size={40} color="#0891b2" />,
    title: "Generate",
    desc: "Our AI generates a complete, optimized timetable. Download it in PDF or Excel format.",
  },
];

const portals = [
  {
    icon: <UserCheck size={36} color="#0891b2" />,
    title: "Admin Portal",
    desc: "Generate, manage, and export timetables for the entire institution.",
    role: "admin",
  },
  {
    icon: <Users size={36} color="#0891b2" />,
    title: "Faculty Portal",
    desc: "View and download your personal teaching schedule and student lists.",
    role: "faculty",
  },
  {
    icon: <GraduationCap size={36} color="#0891b2" />,
    title: "Student Portal",
    desc: "Access your personalized class timetable anytime, anywhere.",
    role: "student",
  },
];

const useCases = [
  {
    icon: <Code size={36} />,
    title: "The Multi-Disciplinary Challenge",
    desc: "Our AI seamlessly handles NEP's complex credit requirements, including major/minor courses and electives, ensuring a valid schedule for every student."
  },
  {
    icon: <Users size={36} />,
    title: "The Faculty Preference Puzzle",
    desc: "Balance faculty workload, respect teaching preferences, and avoid back-to-back classes across campus to keep your most valuable resource happy and effective."
  },
  {
    icon: <Globe size={36} />,
    title: "The Optimal Resource Dilemma",
    desc: "Intelligently assign classrooms and labs based on capacity, required equipment, and time slots to maximize the use of your limited resources."
  }
];

const Typewriter = ({ texts, speed = 100, deleteSpeed = 50, delayBetween = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delayBetween);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, delayBetween]);

  return (
    <span>
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [end]);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);
  
  return <span id={`counter-${end}`}>{count}{suffix}</span>;
};

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isDarkMode 
          ? `${scrollY > 50 ? 'bg-gray-900/95 shadow-lg border-gray-700' : 'bg-gray-900/90 border-gray-700'} backdrop-blur-md`
          : `${scrollY > 50 ? 'bg-white/95 shadow-lg border-gray-200' : 'bg-white/90 border-gray-200'} backdrop-blur-md`
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="#" className={`flex items-center text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Brain size={32} className="text-cyan-600 mr-2" />
              IntelliTime<span className="text-cyan-600">AI</span>
            </a>
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#features" className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Features</a>
              <a href="#how-it-works" className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>How it Works</a>
              <a href="#use-cases" className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Use Cases</a>
              <a href="#portals" className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Portals</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
           
<Link to="/auth" className={`font-medium px-4 py-2 transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Login</Link>
<Link to="/auth" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded font-semibold transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/25 hover:glow">Sign Up</Link>
<button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded border text-sm font-semibold mb-8 ${
            isDarkMode 
              ? 'bg-cyan-900/20 text-cyan-400 border-cyan-800'
              : 'bg-cyan-50 text-cyan-600 border-cyan-200'
          }`}>
            <Zap size={16} />
Effortless Scheduling. Powerful Results.

          </div>
          <h1 className={`text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Automate Your Academic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Scheduling with AI
            </span>
          </h1>
          <div className="text-2xl font-semibold text-cyan-600 mb-6 h-8 flex items-center justify-center">
            <Typewriter texts={["Save 95% of your time.", "Eliminate all conflicts.", "Optimize every resource.", "Achieve 100% NEP compliance."]} />
          </div>
          <p className={`text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
           IntelliTime AI generates complex, multi-department timetables in minutes, not weeks. Eliminate all scheduling conflicts and effortlessly comply with the NEP 2020 framework.  </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/30 glow-button intense">
              Generate Your Timetable <Rocket size={20} />
            </Link>
            <a href="#features" className={`border-2 px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-xl ${
              isDarkMode 
                ? 'border-cyan-600 text-cyan-400 hover:bg-cyan-900/20 hover:shadow-cyan-500/20 hover:glow-border'
                : 'border-cyan-600 text-cyan-600 hover:bg-cyan-50 hover:shadow-cyan-500/20 hover:glow-border'
            }`}>
              Explore Features <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className={`py-16 border-t ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 95, suffix: '%', label: 'Time Saved in Pilot Tests' },
              { number: 100, suffix: '%', label: 'Conflict-Free Guarantee' },
              { number: 5000, suffix: '+', label: 'Constraints Handled' },
              { number: 20, suffix: '%', label: 'Improved Room Utilization' }
            ].map((stat, index) => (
              <div key={index} className={`p-8 rounded-xl border text-center hover:shadow-xl hover:border-cyan-600 hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-2 group glow-card ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                <div className="text-4xl font-bold text-cyan-600 mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>The Future of Timetabling is Here</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Our platform is designed to tackle the unique challenges of modern educational frameworks with unparalleled precision and speed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`p-8 rounded-xl border hover:shadow-xl hover:border-cyan-600 hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-2 relative group glow-card ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  {feature.highlight}
                </div>
                <div className={`inline-block p-3 rounded-lg mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode 
                    ? 'bg-cyan-900/30'
                    : 'bg-gradient-to-br from-cyan-50 to-blue-50'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={`py-20 border-t ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Three Simple Steps to Perfection</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Go from complex requirements to a flawless timetable in record time. Our intuitive process makes scheduling effortless.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className={`p-10 rounded-xl border text-center hover:shadow-xl hover:border-cyan-600 hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-2 group relative glow-card ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className={`inline-flex items-center justify-center w-20 h-20 border-2 border-cyan-600 rounded-full mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode 
                    ? 'bg-cyan-900/30'
                    : 'bg-gradient-to-br from-cyan-50 to-blue-50'
                }`}>
                  {step.icon}
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className={`py-20 border-t ${
        isDarkMode 
          ? 'border-gray-700'
          : 'border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Designed for Academia's Toughest Challenges</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              IntelliTime AI is engineered to solve the specific, complex scheduling puzzles that modern institutions face.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className={`p-8 rounded-xl border hover:shadow-xl hover:border-cyan-600 hover:shadow-cyan-500/20 transition-all group glow-card ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-gradient-to-br from-gray-50 to-cyan-50/50 border-gray-200'
              }`}>
                <div className={`inline-block p-3 rounded-lg mb-6 border group-hover:scale-110 transition-transform shadow-sm ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-cyan-400'
                    : 'bg-white border-gray-200 text-cyan-600'
                }`}>
                  {useCase.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{useCase.title}</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Section */}
      <section id="portals" className={`py-20 border-t ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700'
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Unified Portals for Every User</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Seamless access for every stakeholder. Empower your admins, faculty, and students with dedicated, easy-to-use interfaces.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portals.map((portal, index) => (
              <div key={index} className={`p-10 rounded-xl border text-center hover:shadow-xl hover:border-cyan-600 hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-2 group glow-card ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}>
                <div className={`inline-flex items-center justify-center w-18 h-18 rounded-full mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode 
                    ? 'bg-cyan-900/30'
                    : 'bg-gradient-to-br from-cyan-50 to-blue-50'
                }`}>
                  {portal.icon}
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{portal.title}</h3>
                <p className={`mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{portal.desc}</p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${
        isDarkMode 
          ? 'bg-gray-900'
          : 'bg-slate-900'
      }`}>
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Revolutionize Your Scheduling?</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join leading institutions saving time, optimizing resources, and achieving academic excellence. Start your free trial and generate your first timetable today.
          </p>
          <a href="/login" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-lg inline-flex items-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/30 glow-button intense">
            Get Started Now <ArrowRight size={24} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${
        isDarkMode
          ? 'bg-gray-900 border-gray-800 text-gray-300'
          : 'bg-slate-900 border-slate-800 text-gray-400'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <a href="#" className="flex items-center text-2xl font-bold mb-4 text-white">
                <Brain size={32} className="text-cyan-500 mr-3" />
                IntelliTime<span className="text-cyan-500">AI</span>
              </a>
              <p className="max-w-sm leading-relaxed">
                A prototype academic scheduling platform, powered by intelligent automation.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How it Works</a></li>
                <li><a href="#portals" className="hover:text-cyan-400 transition-colors">Portals</a></li>
                <li><a href="/login" className="hover:text-cyan-400 transition-colors">Login</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright and Legal */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} IntelliTime AI Prototype. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cyan-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-cyan-400 text-sm transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>


      <style jsx>{`
        .cursor {
          animation: blink 1s infinite;
          color: #0891b2;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes glow {
          0%, 100% { 
            box-shadow: 
              0 0 10px rgba(34, 211, 238, 0.6), 
              0 0 20px rgba(34, 211, 238, 0.4), 
              0 0 30px rgba(34, 211, 238, 0.3),
              0 0 40px rgba(8, 145, 178, 0.2);
          }
          50% { 
            box-shadow: 
              0 0 20px rgba(34, 211, 238, 1), 
              0 0 40px rgba(34, 211, 238, 0.8), 
              0 0 60px rgba(34, 211, 238, 0.6),
              0 0 80px rgba(8, 145, 178, 0.4),
              0 0 100px rgba(6, 182, 212, 0.3);
          }
        }

        @keyframes glow-border {
          0%, 100% { 
            box-shadow: 
              0 0 10px rgba(8, 145, 178, 0.5),
              0 0 20px rgba(34, 211, 238, 0.3),
              inset 0 0 10px rgba(8, 145, 178, 0.1);
            border-color: rgba(8, 145, 178, 0.8);
          }
          50% { 
            box-shadow: 
              0 0 25px rgba(8, 145, 178, 0.8), 
              0 0 50px rgba(34, 211, 238, 0.6),
              0 0 75px rgba(6, 182, 212, 0.4),
              inset 0 0 20px rgba(8, 145, 178, 0.3);
            border-color: rgba(34, 211, 238, 1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 
              0 8px 25px rgba(8, 145, 178, 0.3),
              0 0 15px rgba(34, 211, 238, 0.2);
          }
          50% { 
            box-shadow: 
              0 15px 45px rgba(8, 145, 178, 0.6), 
              0 0 35px rgba(34, 211, 238, 0.5),
              0 0 60px rgba(6, 182, 212, 0.3);
          }
        }

        @keyframes intense-glow {
          0%, 100% { 
            box-shadow: 
              0 0 15px rgba(34, 211, 238, 0.8), 
              0 0 30px rgba(34, 211, 238, 0.6), 
              0 0 45px rgba(34, 211, 238, 0.4),
              0 0 60px rgba(8, 145, 178, 0.3);
          }
          25% { 
            box-shadow: 
              0 0 25px rgba(34, 211, 238, 1), 
              0 0 50px rgba(34, 211, 238, 0.8), 
              0 0 75px rgba(34, 211, 238, 0.6),
              0 0 100px rgba(8, 145, 178, 0.4),
              0 0 125px rgba(6, 182, 212, 0.3);
          }
          75% { 
            box-shadow: 
              0 0 20px rgba(34, 211, 238, 0.9), 
              0 0 40px rgba(34, 211, 238, 0.7), 
              0 0 60px rgba(34, 211, 238, 0.5),
              0 0 80px rgba(8, 145, 178, 0.3),
              0 0 100px rgba(6, 182, 212, 0.2);
          }
        }

        .glow-button:hover {
          animation: intense-glow 1.5s ease-in-out infinite;
        }

        .glow-border:hover {
          animation: glow-border 1.8s ease-in-out infinite;
        }

        .glow-card:hover {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .hover\\:glow:hover {
          box-shadow: 
            0 0 25px rgba(34, 211, 238, 0.8), 
            0 0 50px rgba(34, 211, 238, 0.6),
            0 0 75px rgba(6, 182, 212, 0.4);
        }

        /* Enhanced base glow for buttons */
        .glow-button {
          box-shadow: 
            0 4px 15px rgba(8, 145, 178, 0.4),
            0 0 20px rgba(34, 211, 238, 0.2);
        }

        /* Enhanced base glow for cards */
        .glow-card {
          transition: all 0.3s ease, box-shadow 0.5s ease;
          box-shadow: 0 2px 10px rgba(8, 145, 178, 0.1);
        }

        /* Special intense glow for main CTA buttons */
        .glow-button.intense {
          box-shadow: 
            0 0 15px rgba(34, 211, 238, 0.5),
            0 0 30px rgba(8, 145, 178, 0.3);
        }

        .glow-button.intense:hover {
          animation: intense-glow 1.2s ease-in-out infinite;
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>
    </div>
  );
}

export default LandingPage;