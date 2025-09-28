import { useState, useEffect, useRef } from "react";
import { IoMenu, IoClose, IoMoon, IoSunny, IoDownload, IoArrowUp, IoMail, IoLogoGithub, IoLogoLinkedin, IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import AnimatedTitles from "../components/Animation";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { FaCode, FaLaptopCode } from "react-icons/fa";


function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState("All");
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [activeSkillCategory, setActiveSkillCategory] = useState("languages");

  // Enhanced Skills Data with Proper Categorization
  const skillCategories = {
    languages: {
      title: "Programming Languages",
      icon: "💻",
      skills: [
        { name: "Java", level: 70, icon: "☕", proficiency: "Advanced" },
        { name: "JavaScript", level: 60, icon: "🟨", proficiency: "Intermediate" },
        { name: "Python", level: 60, icon: "🐍", proficiency: "Intermediate" },
        { name: "C Programming", level: 60, icon: "🔷", proficiency: "Intermediate" },
        { name: "HTML5", level: 85, icon: "🌐", proficiency: "Advanced" },
        { name: "CSS3", level: 80, icon: "🎨", proficiency: "Advanced" },
        { name: "TypeScript", level: 70, icon: "🔷", proficiency: "Intermediate" },
        { name: "SQL", level: 75, icon: "🗃️", proficiency: "Intermediate" },
      ]
    },
    frontend: {
      title: "Frontend Technologies",
      icon: "⚛️",
      skills: [
        { name: "React.js", level: 70, icon: "⚛️", proficiency: "Intermediate" },
        { name: "React Native", level: 75, icon: "📱", proficiency: "Intermediate" },
        { name: "Next.js", level: 65, icon: "▲", proficiency: "Intermediate" },
        { name: "Tailwind CSS", level: 80, icon: "💨", proficiency: "Advanced" },
        { name: "Bootstrap", level: 75, icon: "🎯", proficiency: "Intermediate" },
        { name: "Material-UI", level: 70, icon: "🎨", proficiency: "Intermediate" },
        { name: "Redux", level: 65, icon: "🔄", proficiency: "Intermediate" },
      ]
    },
    backend: {
      title: "Backend Technologies",
      icon: "🔧",
      skills: [
        { name: "Node.js", level: 60, icon: "🟢", proficiency: "Intermediate" },
        { name: "Express.js", level: 60, icon: "🤖", proficiency: "Intermediate" },
        { name: "RESTful APIs", level: 60, icon: "🔗", proficiency: "Intermediate" },
        { name: "FastAPI", level: 55, icon: "🐍", proficiency: "Intermediate" },
        { name: "GraphQL", level: 50, icon: "📊", proficiency: "Basic" },
        { name: "Socket.io", level: 55, icon: "⚡", proficiency: "Intermediate" },
        { name: "JWT", level: 70, icon: "🔐", proficiency: "Intermediate" },
      ]
    },
    databases: {
      title: "Databases",
      icon: "🗄️",
      skills: [
        { name: "MongoDB", level: 85, icon: "🍃", proficiency: "Advanced" },
        { name: "MySQL", level: 65, icon: "🐬", proficiency: "Intermediate" },
        { name: "Firebase", level: 55, icon: "🔥", proficiency: "Intermediate" },
        { name: "PostgreSQL", level: 60, icon: "🐘", proficiency: "Intermediate" },
        { name: "SQLite", level: 70, icon: "💡", proficiency: "Intermediate" },
      ]
    },
    tools: {
      title: "Development Tools",
      icon: "🛠️",
      skills: [
        { name: "Docker", level: 60, icon: "🐳", proficiency: "Intermediate" },
        { name: "Git", level: 80, icon: "📚", proficiency: "Advanced" },
        { name: "Postman", level: 85, icon: "📬", proficiency: "Advanced" },
        { name: "Thunder Client", level: 75, icon: "⚡", proficiency: "Intermediate" },
        { name: "JIRA", level: 70, icon: "🎫", proficiency: "Intermediate" },
        { name: "VS Code", level: 90, icon: "💙", proficiency: "Expert" },
        { name: "PyCharm", level: 65, icon: "🐍", proficiency: "Intermediate" },
        { name: "Eclipse", level: 70, icon: "🌑", proficiency: "Intermediate" },
        { name: "Android Studio", level: 60, icon: "🤖", proficiency: "Intermediate" },
      ]
    },
    technologies: {
      title: "Other Technologies",
      icon: "🤖",
      skills: [
        { name: "AWS", level: 65, icon: "☁️", proficiency: "Intermediate" },
      
        { name: "Netlify", level: 75, icon: "🌐", proficiency: "Intermediate" },
        { name: "Vercel", level: 80, icon: "▲", proficiency: "Advanced" },
        { name: "Render", level: 55, icon: "🔧", proficiency: "Advanced" },
        
      ]
    }
  };

  // Proficiency level colors
  const proficiencyColors = {
    Basic: "from-gray-400 to-gray-500",
    Intermediate: "from-blue-400 to-blue-500",
    Advanced: "from-purple-400 to-purple-500",
    Expert: "from-green-400 to-green-500"
  };

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section observer for active nav highlighting
      const sections = document.querySelectorAll("section");
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const projects = [
    {
      title: "Airbnb Clone",
      category: "Web",
      image: "https://tse2.mm.bing.net/th/id/OIP.uoo9o7C-S2kRtjdv_6uIIgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      bullets: [
        "Secure login/signup & forgot password",
        "Listing CRUD with image upload",
        "Booking system with real-time availability",
        "Search & Filters, Wishlist, Reviews & Ratings",
      ],
      link: "https://airbnb-1-ui1y.onrender.com/",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/Ramjee194/Airbnb"
    },
    {
      title: "LMS Platform",
      category: "Web",
      image: "https://miro.medium.com/v2/resize:fit:1200/1*9hN_74NcRKaKhbF-YRVi8g.png",
      bullets: [
        "Course creation & enrollment",
        "Progress tracking dashboard",
        "Secure authentication",
        "Payment gateway integration",
      ],
      link:"ttps://onelms-uode.onrender.com",
      technologies: ["React", "Firebase", "Stripe", "Material-UI"],
      github: "https://github.com/Ramjee194/lms"
    },
    {
      title: "E-Commerce Platform",
      category: "Web",
      image: "https://img.freepik.com/premium-photo/exploring-augmented-retail-landscapes_462685-2799.jpg?w=2000",
      bullets: [
        "Product listing & categories",
        "Cart & checkout flow",
        "Order history & dashboard",
        "Payment integration",
      ],
      link:"https://perfumeshop-1-mdxj.onrender.com/",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
      github: "https://github.com/Ramjee194/perfumeShop"
    },
    {
      title: "AI Trip Planner",
      category: "AI",
      image: "https://th.bing.com/th/id/OIP.YRSWjHpbF6Zdouht5FCR5QHaHa?w=170&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
      bullets: [
        "Auto-suggests favorite places & attractions",
        "Finds hotels by budget & ratings",
        "Generates weekly itinerary",
        "Weather-aware activities",
        "Collaborative planning & sharing",
      ],
      technologies: ["Python", "OpenAI API", "React", "FastAPI"],
      github: "https://github.com/Ramjee194/ai-trip-planner"
    },
  ];

  const testimonials = [
    {
      name: "KM Divya",
      text: "Ramjee is a quick learner, reliable, and always delivers on time.",
      role: " faculty B.tech computer science Department",
      avatar: "data:image/jpeg;base64,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"
    },
    {
      name: "Bipin Rawat",
      text: "Highly skilled developer with great problem-solving ability. Exceeded all expectations!",
      role: "Professor and assistant HOD computer science",
      avatar: "data:image/jpeg;base64,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"
    },
    {
      name: "Shusheel kumar",
      text: "Creative, professional, and a pleasure to work with. Delivered complex projects seamlessly.",
      role: "CTO at StartupXYZ",
      avatar: "https://static.pw.live/5eb393ee95fab7468a79d189/2a16d224-2712-4e6d-8c12-9144ad146caf.png"
    },
  ];

  const experiences = [
    {
      role: "Web Development Intern",
      company: "ABC Tech",
      year: "2023",
      desc: "Worked on responsive web apps using React & Node.js.",
      duration: "6 months",
      achievements: ["Built 5 major features", "Improved performance by 40%", "Mentored 2 junior developers"]
    },
    {
      role: "Open Source Contributor",
      company: "GSSoC",
      year: "2024-2025",
      desc: "Contributed to open-source projects, proposed solutions for MIT USA.",
      duration: "1 year",
      achievements: ["50+ commits", "8 pull requests merged", "3 features implemented"]
    },
    {
      role: "Brand Ambassador",
      company: "Naukri.com",
      year: "2024-2025",
      desc: "Promoted platform awareness and organized campus events.",
      duration: "1 year",
      achievements: ["110+ people registered", "Increased platform awareness"]
    },
    {
      role: "10 Star Coder",
      company: "LeetCode",
      year: "2024-2025",
      desc: "Active participant in competitive programming contests.",
      duration: "2 year",
      achievements: ["500+ questions solved", "Ranked in top 30%", "Regular contest participation (weekly and Byweekly"]
    },
    {
      role: "5 Star Coder",
      company: "GeeksforGeeks",
      year: "2024-2025",
      desc: "Consistent problem solver on the platform.",
      duration: "1 year",
      achievements: ["100+ questions solved", "Ranked in top 30%", "Active in coding challenges"]
    },
  ];

 const socialLinks = [
  { icon: IoLogoGithub, href: "https://github.com/Ramjee194", label: "GitHub" },
  { icon: IoLogoLinkedin, href: "https://linkedin.com/in/Ramjeekumaryadav", label: "LinkedIn" },
  { icon: SiLeetcode, href: "https://leetcode.com/u/ramjee_1/", label: "LeetCode" },
  { icon: FaCode, href: "https://www.geeksforgeeks.org/user/ramjeekumaist4", label: "GeeksforGeeks" },
  { icon: IoLogoInstagram, href: "https://instagram.com/yadavramjee", label: "Instagram" },
];
  // Loading animation
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-white"
          >
            Ramjee Kumar 
          </motion.h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white" : "bg-gradient-to-br from-gray-50 to-violet-50 text-gray-900"}>
      
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 bg-indigo-500/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: cursorPosition.x - 16, y: cursorPosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Back to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0, scale: isScrolled ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-lg z-40 hover:from-purple-700 hover:to-indigo-700 transition-all"
      >
        <IoArrowUp size={24} />
      </motion.button>

      {/* Enhanced Navbar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`w-full py-4 px-6 flex items-center justify-between fixed top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? darkMode 
              ? "bg-gray-900/80 backdrop-blur-lg shadow-xl" 
              : "bg-white/80 backdrop-blur-lg shadow-xl"
            : "bg-transparent"
        }`}
      >
        <motion.h1 
          whileHover={{ scale: 1.05 }}
          className="font-bold text-2xl cursor-pointer bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          onClick={scrollToTop}
        >
          Ramjee Kumar 
        </motion.h1>
        
        <nav className="hidden md:flex space-x-8 items-center font-medium">
          {["home", "about", "skills", "projects", "experience", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`relative px-3 py-2 transition-all duration-300 ${
                activeSection === section
                  ? "text-purple-400 font-semibold"
                  : "hover:text-purple-300"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              {activeSection === section && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400"
                />
              )}
            </button>
          ))}
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
          >
            {darkMode ? <IoSunny size={20} /> : <IoMoon size={20} />}
          </motion.button>
        </nav>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-2xl z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose /> : <IoMenu />}
        </motion.button>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center space-y-8 text-2xl">
              {["home", "about", "skills", "projects", "experience", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`transition-all duration-300 ${
                    activeSection === section
                      ? "text-purple-500 font-bold scale-110"
                      : "text-white hover:text-purple-400"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center space-x-2 text-white hover:text-purple-400"
              >
                {darkMode ? <IoSunny size={24} /> : <IoMoon size={24} />}
                <span>Switch to {darkMode ? "Light" : "Dark"} Mode</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-violet-500/10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hello, I'm Ramjee Kumar 
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-3xl mb-8 text-gray-600 dark:text-gray-300"
          >
            <AnimatedTitles/>
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r bg-black text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2"
              onClick={() => scrollToSection("projects")}
            >
              <span>View Projects</span>
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(156, 163, 175, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/file/d/1Iqkj-OOW1wS55yC8QR2AzsN0qITm5TE8/view?usp=sharing"
              download
              className="bg-gray-900 dark:bg-gray-900 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:bg-gray-600 transition-all"
            >
              <IoDownload size={20} />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/10 dark:bg-gray-800/50 rounded-full backdrop-blur-lg hover:bg-purple-500 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-purple-500 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-purple-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r bg-black bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-black mb-6">Full Stack Developer</h3>
              <p className="text-lg leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
                Self-motivated Full Stack Developer with passion for creating innovative web solutions. 
                Skilled in building responsive web applications, solving complex problems, and contributing 
                to open-source projects. Always eager to learn new technologies and take on challenging projects.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold">Frontend:</span>
                  <span>React.js, React Native, Next.js, Tailwind CSS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold">Backend:</span>
                  <span>Node.js, Express.js, RESTful APIs, FastAPI</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-semibold">Database:</span>
                  <span>MongoDB, MySQL, Firebase, PostgreSQL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold">Tools:</span>
                  <span>Docker, Git, VS Code, Postman, JIRA</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-65 h-80 mx-auto">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl w-full h-full object-cover border-4 border-white shadow-2xl"
                  src="https://i.postimg.cc/sDCtLDjm/photo-Ramjee2.jpg"
                  alt="Ramjee Kumar Yadav"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl shadow-lg"
                >
                  <div className="text-2xl font-bold">Fresher</div>
                  <div className="text-sm">No experience but more practices myself</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg"
          >
            Here's a comprehensive overview of my technical skills and expertise
          </motion.p>

          {/* Skills Category Navigation */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {Object.keys(skillCategories).map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSkillCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeSkillCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white/10 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-purple-500/20"
                }`}
              >
                <span>{skillCategories[category].icon}</span>
                <span>{skillCategories[category].title}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            key={activeSkillCategory}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories[activeSkillCategory].skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/5 dark:bg-gray-800/50 p-6 rounded-2xl backdrop-blur-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg">{skill.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${proficiencyColors[skill.proficiency]}`}>
                        {skill.proficiency}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-purple-400">{skill.level}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: idx * 0.1 }}
                    className={`h-3 bg-gradient-to-r ${proficiencyColors[skill.proficiency]} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 text-center"
          >
            <div className="bg-white/5 dark:bg-gray-800/50 p-6 rounded-2xl backdrop-blur-lg">
              <div className="text-3xl font-bold text-purple-400">
                {Object.values(skillCategories).flatMap(cat => cat.skills).length}+
              </div>
              <div className="text-gray-400">Technologies</div>
            </div>
            
            <div className="bg-white/5 dark:bg-gray-800/50 p-6 rounded-2xl backdrop-blur-lg">
              <div className="text-3xl font-bold text-green-400">
                {Object.values(skillCategories).flatMap(cat => cat.skills).filter(s => s.proficiency === 'Expert').length}
              </div>
              <div className="text-gray-400">Expert Level</div>
            </div>
            
            <div className="bg-white/5 dark:bg-gray-800/50 p-6 rounded-2xl backdrop-blur-lg">
              <div className="text-3xl font-bold text-black">
                {Object.values(skillCategories).flatMap(cat => cat.skills).filter(s => s.proficiency === 'Advanced').length}
              </div>
              <div className="text-gray-400">Advanced Skills</div>
            </div>
            
            <div className="bg-white/5 dark:bg-gray-800/50 p-6 rounded-2xl backdrop-blur-lg">
              <div className="text-3xl font-bold text-black">Fresher</div>
              <div className="text-gray-400">Fresher but much more practices</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section id="experience" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Experience & Achievements
          </motion.h2>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-indigo-600"></div>
            
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative mb-12 ml-12"
              >
                <div className="absolute -left-12 top-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="text-purple-500 font-bold text-sm bg-purple-500/10 px-3 py-1 rounded-full">{exp.year} • {exp.duration}</span>
                  <h3 className="text-xl font-bold mt-2">{exp.role} @ {exp.company}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{exp.desc}</p>
                  
                  <ul className="mt-4 space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          {/* Enhanced Filter Buttons */}
          <motion.div 
            className="flex justify-center mb-12 flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {["All", "Web", "AI"].map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "bg-white/10 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-purple-500/20"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.filter(p => filter === "All" || p.category === filter).map((proj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      proj.category === "AI" 
                        ? "bg-green-500/20 text-green-500" 
                        : "bg-blue-500/20 text-blue-500"
                    }`}>
                      {proj.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-500 transition-colors">{proj.title}</h3>
                  
                  <ul className="space-y-2 mb-4">
                    {proj.bullets.slice(0, 3).map((bullet, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {proj.link && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={proj.link}
                        target="_blank"
                        className="flex-1 bg-gradient-to-r bg-black text-white text-center py-2 rounded-lg font-semibold text-sm"
                      >
                        Live Demo
                      </motion.a>
                    )}
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={proj.github}
                      target="_blank"
                      className="flex-1 border border-gray-300 dark:border-gray-900 text-center py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Source Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800/30">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            What People Say
          </motion.h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="pb-12"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx} className="max-w-md">
                <motion.div 
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-6">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-bold text-lg">{t.name}</h4>
                      <p className="text-purple-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic text-lg">"{t.text}"</p>
                  <div className="flex text-yellow-400 mt-4">
                    {"★".repeat(5)}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-violet-500/5"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Let's work together!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                I'm always open to discussing new opportunities, creative projects, 
                or potential collaborations. Feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <IoMail className="text-purple-500 text-xl" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:ramjeekumaryadav558@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 transition">
                      ramjeekumaryadav558@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Enhanced Social Links */}
              <div className="flex space-x-4 mt-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-purple-500 hover:text-white"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-lg"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-lg"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea 
                  rows="5"
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-lg"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Ramjee Kumar 
            </div>
            
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-500 transition"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 dark:text-gray-400"
          >
            © 2025 Ramjee Kumar Yadav. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}

export default Home;