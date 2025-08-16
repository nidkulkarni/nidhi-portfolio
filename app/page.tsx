"use client"

import type React from "react"


import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Eye,
  Menu,
  X,
  Sun,
  Moon,
  Code,
  Database,
  Zap,
  Star,
  Rocket,
  Globe,
  Sparkles,
  GraduationCap,
  MapPin,
  Calendar,
  School,
  Building,
  Clock,
  Camera,
  Dumbbell,
  Palette,
  Heart,
  Brain,
  Leaf,
  Activity,
  Shield,
  TrendingUp,
  Layers,
  Terminal,
} from "lucide-react"
import SimpleReviewsSection from "@/components/simple-reviews-section"

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isImageRevealed, setIsImageRevealed] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const newIndex = { ...prev }
        hobbies.forEach((hobby) => {
          if (hobby.images.length > 1) {
            newIndex[hobby.id] = ((prev[hobby.id] || 0) + 1) % hobby.images.length
          }
        })
        return newIndex
      })
    }, 1000) // Change image every 1 second

    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }

  const getParallaxStyle = (speed: number) => ({
    transform: `translate(${mousePosition.x * speed * 0.01}px, ${mousePosition.y * speed * 0.01}px)`,
    transition: "transform 0.1s ease-out",
  })

  const interestAreas = [
    { name: "Full-Stack Development", icon: Code, color: "from-blue-500 to-cyan-500" },
    { name: "Geospatial Data Visualization", icon: Globe, color: "from-green-500 to-emerald-500" },
    { name: "Machine Learning Integration", icon: Brain, color: "from-purple-500 to-pink-500" },
    { name: "Precision Farming", icon: Leaf, color: "from-green-400 to-lime-500" },
    { name: "Bioinformatics", icon: Activity, color: "from-red-500 to-orange-500" },
    { name: "Disaster Response Systems", icon: Shield, color: "from-yellow-500 to-red-500" },
  ]

  const projects = [
    {
      id: 1,
      title: "Parkinson's Disease Detection",
      description:
        "Developed a CNN-based mobile app and website using React Native and React.js. Achieved 98.5% accuracy in detecting Parkinson's disease from MRI scans, reducing clinical analysis time by 30% through real-time diagnosis.",
      fullDescription:
        "Integrated TensorFlow and OpenCV for efficient image processing, optimizing model inference speed by 25%. The system provides healthcare professionals with instant diagnostic support, significantly improving patient care efficiency.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4595.jpg-8J1aFu0mPc6K8HLFmT365XasIY8F1L.jpeg",
      tech: ["React Native", "React.js", "TensorFlow", "OpenCV", "Python", "CNN"],
      category: "Healthcare AI",
      impact: "98.5% accuracy, 30% faster diagnosis",
      bgElements: [Brain, Activity, Zap],
      gradient: "from-pink-500 to-purple-600",
      githubUrl: "https://github.com/nidkulkarni/Parkinson_disease",
    },
    {
      id: 2,
      title: "Walmart Supply Sphere",
      description:
        "Created a React.js website to optimize retail supply chains. Enhanced predictive marketing with sales data analysis, boosting conversions by 25% and reducing stockouts by 20%.",
      fullDescription:
        "Leveraged Node.js and MongoDB for scalable data management, improving query performance by 35%. Implemented advanced geo-location strategies for supply chain optimization and inventory management.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4596.jpg-xuq9qk2kTF6S11KJizKxyFKqQ8nZZl.jpeg",
      tech: ["React.js", "Node.js", "MongoDB", "Data Analytics", "Geo-location"],
      category: "Supply Chain",
      impact: "25% conversion boost, 20% stockout reduction",
      bgElements: [TrendingUp, Database, Globe],
      gradient: "from-blue-500 to-cyan-600",
      githubUrl: "https://github.com/nidkulkarni/walmart",
    },
    {
      id: 3,
      title: "Robotic Earthquake Management System",
      description:
        "Designed a YOLOv8-based robot for post-earthquake rescue. Used YOLOv8 and thermal sensors to detect trapped individuals, cutting rescue time by 35%.",
      fullDescription:
        "Integrated Raspberry Pi and deep learning for real-time disaster response. Implemented Python and ROS for robotic control, achieving 90% accuracy in obstacle detection and human identification in disaster scenarios.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4597.JPG-Y5BRhhvTSzJdyngqU0qZ22CV5VZ2lH.jpeg",
      tech: ["YOLOv8", "Python", "ROS", "Raspberry Pi", "Computer Vision", "IoT"],
      category: "Disaster Response",
      impact: "35% faster rescue, 90% detection accuracy",
      bgElements: [Shield, Zap, Activity],
      gradient: "from-orange-500 to-red-600",
      githubUrl: "https://github.com/nidkulkarni/Robotic_car",
    },
  ]

  const experiences = [
    {
      id: 1,
      company: "ISRO (NRSC)",
      role: "Frontend Developer Intern",
      period: "Jan 2025 - May 2025",
      description:
        "Led a team of 4 to build a full-stack web portal for NICES Climate Data Explorer using HTML5, Leaflet.js, Python, CSS, Bootstrap, Gunicorn, GeoRaster, and JavaScript. Improved platform reliability by 25%.",
      tech: ["HTML5", "Leaflet.js", "Python", "CSS", "Bootstrap", "Gunicorn", "GeoRaster", "JavaScript"],
      icon: Rocket,
      color: "from-blue-600 to-purple-600",
    },
    {
      id: 2,
      company: "IIT Madras",
      role: "Full-Stack Developer Intern",
      period: "Oct 2024 - Dec 2024",
      description:
        "Designed a full-stack website and mobile app for smart farming using React Native, React.js, CSS, Bootstrap, MongoDB, REST APIs, FastAPI, Node.js, and JavaScript. Reduced farm management time by 20 hours/week.",
      tech: ["React Native", "React.js", "MongoDB", "REST APIs", "FastAPI", "Node.js", "JavaScript"],
      icon: Leaf,
      color: "from-green-600 to-emerald-600",
    },
    {
      id: 3,
      company: "IIIT Hyderabad",
      role: "Full-Stack Developer Intern",
      period: "Oct 2023 - Dec 2023",
      description:
        "Engineered a full-stack framework for protein ID visualization using React.js, Tailwind CSS, Bootstrap, Node.js, JavaScript, Three.js, and ML libraries. Decreased model rendering time by 8 seconds.",
      tech: ["React.js", "Tailwind CSS", "Bootstrap", "Node.js", "Three.js", "ML Libraries"],
      icon: Activity,
      color: "from-purple-600 to-pink-600",
    },
  ]

  const skillCategories = [
    {
      title: "Languages & Databases",
      skills: ["Python", "NumPy", "Java", "HTML5", "CSS", "PHP", "JavaScript", "MySQL", "MongoDB"],
      icon: Code,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Frameworks & Libraries",
      skills: ["React.js", "Node.js", "React Native", "FastAPI", "Leaflet.js", "TensorFlow", "Three.js"],
      icon: Layers,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Web Dev Tools",
      skills: ["VS Code", "GitHub", "Git", "REST APIs", "Gunicorn", "Bootstrap", "Tailwind CSS"],
      icon: Terminal,
      color: "from-green-500 to-emerald-500",
    },
  ]


  const hobbies = [
    {
      id: 1,
      title: "Gym Daily",
      description:
        "I've recently started my fitness journey. My main focus is muscle strengthening and fat loss. Going to the gym has taught me the importance of discipline and health.",
      icon: Dumbbell,
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4561.jpg-EN8IMIMrcif7XsRPV9w5J5nFQ8V7B8.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4562.jpg-aSl1SwpxlauVLTKUGdN3HUsrfANT75.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Facelab%202025-08-09%2011-43-46.jpg-84BB0TdsWzONVp2vK3u7z779D4KP8T.jpeg",
      ],
      gradient: "from-red-500 to-orange-500",
    },
    {
      id: 2,
      title: "Photography",
      description:
        "Every picture clicked has its own perspective and a story to tell. For more such photos check out my Instagram page @nidkulkarni.",
      icon: Camera,
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4590.jpg-ABeRJxl5jeX9uHiDX6okZpjZrU7MvL.jpeg", // Red autumn tree
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2841%202.jpg-X22OTJOQWydXEwA1lkqqZfdvRilkLC.jpeg", // Misty mountains
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4594.jpg-5FALNN3iQOf8r1LHe5uaT2BqriCV0s.jpeg", // Lotus Temple sunset
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4591.jpg-C6pJKuTMA2YcxXDLxMiEhg2apcafWs.jpeg", // Ocean sunset with rocks
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4589.jpg-Rj66CmgQ9ddy8s0JZDMjMItlXgUT1K.jpeg", // Snow-capped mountains
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9182%202.jpg-ovGaqgezrfWPjDh5plyq91PcLarDtf.jpeg", // Underwater fish
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4592.jpg-qWV5axdn67SiW8ICTsrAFKicadzynv.jpeg", // Ocean sunset
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4593.jpg-c7B1ByOz7NEDHzDLWH2FlntHJKot4y.jpeg", // Mountain stream
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4588.jpg-q5ba1frg5mUU1l0T2uKBi4oyl5PfaY.jpeg", // Red sunset sky
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Crocheting",
      description:
        "I've started crocheting since a really long time. It's something really personal to me as I learnt it from my grandmother and the world has to know her art and style as she has the most unique patterns.",
      icon: Heart,
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3501.JPG-isjlb6KigmGY88BycNzzkLo4vWd9ty.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3509%202.jpg-1yQ8M6fLeSpWlMrtavksmybe2Ukya3.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3503%202.JPG-mNRblRIgDE3qKjWguOvCT7lNmlnws5.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4568.jpg-skudeDW2f19op2HpwkmPzRXOiwCp5E.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4569.jpg-jqp4HWYbrft89f2eCYLrwnYCQBduwQ.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-15%20at%2011.37.49%E2%80%AFPM-9p6hLcOyxSulFokJSsrLaU8dPHY3K6.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3486%202.jpg-J6GgSnDGoivOchULEW1ZY6zQ8Xgsmb.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-15%20at%2011.37.16%E2%80%AFPM-AQH3rc0CjETWlh2grfaKvA95glPCtB.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3489%202.JPG-FV2XNMZIW8ReZCOlduRrlkppH9d3mj.jpeg",
      ],
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: 4,
      title: "Sketches",
      description:
        "There is something about colors and just a piece of charcoal that just attracts me. I feel alive when I paint and it's really therapeutic. I love sketching as I don't personally use an eraser I just let the strokes and free hand sketching do its job.",
      icon: Palette,
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3500%202.jpg-j4xCQp9IOSbaimCTo4C5LjnF9DStlj.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3504%202.jpg-BYktY3yqCSbv6oV3WmsDX2Q1pgBUEV.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4566.jpg-0Ybl7jBV8SztXQY7ArjRyCbbRpdA9a.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4564.jpg-ICoWR4syHPl47SoYx7LoYoNitQe8Xv.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4565.jpg-4MLrQXFvwFZ28xiVffsW0ToUP5PxSO.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4563.jpg-ey9gseO0AUDxQ2YgqNdSn1ePG4dyCO.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4567.PNG-nZVZBaHCQQdEsR53rqNjnMWINM4r57.jpeg",
      ],
      gradient: "from-indigo-500 to-purple-500",
    },
  ]



  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-all duration-300">
      <nav className="fixed top-0 w-full z-50 glass-strong bg-card/60 border-b border-border/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl font-serif bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Nidhi Kulkarni
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("home")} className="nav-link">
                Home
              </button>
              <button onClick={() => scrollToSection("about")} className="nav-link">
                About
              </button>
              <button onClick={() => scrollToSection("projects")} className="nav-link">
                Projects
              </button>
              <button onClick={() => scrollToSection("more")} className="nav-link">
                More
              </button>
              <button onClick={() => scrollToSection("reviews")} className="nav-link">
                Reviews
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDark(!isDark)}
                className="glass hover:glass-strong bg-card/30 hover:bg-primary/20 transition-all duration-500 hover:scale-110 hover:rotate-12 transition-all duration-300"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <div className="relative w-4 h-4">
                  <Sun
                    className={`absolute inset-0 h-4 w-4 text-accent transition-all duration-500 ${
                      isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                    }`}
                  />
                  <Moon
                    className={`absolute inset-0 h-4 w-4 text-primary transition-all duration-500 ${
                      isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                    }`}
                  />
                </div>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden glass hover:glass-strong transition-all duration-300 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden glass-strong bg-card/95 border-t border-border/50 animate-in slide-in-from-top duration-300 transition-all duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection("home")} className="nav-link text-left">
                  Home
                </button>
                <button onClick={() => scrollToSection("about")} className="nav-link text-left">
                  About
                </button>
                <button onClick={() => scrollToSection("projects")} className="nav-link text-left">
                  Projects
                </button>
                <button onClick={() => scrollToSection("more")} className="nav-link text-left">
                  More
                </button>
                <button onClick={() => scrollToSection("reviews")} className="nav-link text-left">
                  Reviews
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        {/* Advanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Tech Icons with Parallax */}
          <div className="absolute top-20 left-10 opacity-30" style={getParallaxStyle(2)}>
            <Code className="w-6 h-6 text-primary floating" />
          </div>
          <div className="absolute top-40 right-20 opacity-40" style={getParallaxStyle(-1.5)}>
            <Database className="w-4 h-4 text-accent floating" style={{ animationDelay: "2s" }} />
          </div>
          <div className="absolute bottom-40 left-20 opacity-50" style={getParallaxStyle(3)}>
            <Zap className="w-5 h-5 text-primary floating" style={{ animationDelay: "4s" }} />
          </div>
          <div className="absolute top-32 right-40 opacity-35" style={getParallaxStyle(-2)}>
            <Star className="w-4 h-4 text-accent floating" style={{ animationDelay: "1s" }} />
          </div>
          <div className="absolute bottom-32 right-10 opacity-45" style={getParallaxStyle(2.5)}>
            <Rocket className="w-6 h-6 text-primary floating" style={{ animationDelay: "3s" }} />
          </div>
          <div className="absolute top-60 left-40 opacity-40" style={getParallaxStyle(-1)}>
            <Globe className="w-5 h-5 text-accent floating" style={{ animationDelay: "5s" }} />
          </div>
          <div className="absolute top-80 right-60 opacity-30" style={getParallaxStyle(1.5)}>
            <Sparkles className="w-3 h-3 text-primary floating" style={{ animationDelay: "6s" }} />
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8 relative group cursor-pointer" onClick={() => setIsImageRevealed(!isImageRevealed)}>
            <div className="w-56 h-56 mx-auto relative overflow-hidden rounded-full glass-strong bg-gradient-to-br from-primary/30 to-accent/30 hover:scale-105 transition-all duration-700">
              {/* Animated Border */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-50 animate-spin"
                style={{ animationDuration: "8s" }}
              ></div>
              <div className="absolute inset-1 rounded-full bg-background"></div>

              {/* Profile Image */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <img
                  src="/IMG_4616.jpg"
                  alt="Nidhi Kulkarni"
                  className="w-full h-full object-cover transition-all duration-1000"
                />

                {/* Advanced Reveal Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent transition-all duration-1000 ease-out ${
                    isImageRevealed ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
                  }`}
                ></div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>

            {/* Floating Action Hint */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="glass bg-card/80 px-3 py-1 rounded-full text-xs text-muted-foreground">
                Click to reveal
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif leading-tight">
            <span className="inline-block">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse bg-300% animate-gradient-x">
                Aspiring Full-Stack
              </span>
            </span>
            <br />
            <span className="inline-block mt-2">
              <span
                className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-pulse bg-300% animate-gradient-x"
                style={{ animationDelay: "0.5s" }}
              >
                Developer
              </span>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            Passionate About <span className="text-primary font-medium">Innovative Tech Solutions</span> and{" "}
            <span className="text-accent font-medium">Geospatial Applications</span>
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            {[
              {
                icon: Linkedin,
                href: "https://linkedin.com/in/kulkarni-nidhi",
                title: "Connect on LinkedIn",
                color: "text-blue-400",
              },
              {
                icon: Mail,
                href: "mailto:nidhikulkarnicg2@gmail.com",
                title: "nidhikulkarnicg2@gmail.com",
                color: "text-red-400",
                onClick: (e: React.MouseEvent) => {
                  e.preventDefault()
                  navigator.clipboard.writeText("nidhikulkarnicg2@gmail.com")
                  alert("Email copied to clipboard: nidhikulkarnicg2@gmail.com")
                },
              },
              { icon: Github, href: "https://github.com/nidkulkarni", title: "View GitHub", color: "text-purple-400" },
            ].map(({ icon: Icon, href, title, color, onClick }, index) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                onClick={onClick}
                className="group glass hover:glass-strong bg-card/50 hover:bg-primary/20 p-4 rounded-full transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                title={title}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Icon
                  className={`w-6 h-6 ${color} group-hover:text-accent transition-all duration-300 group-hover:rotate-12`}
                />

                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </a>
            ))}
          </div>

          <Button
            onClick={() => scrollToSection("projects")}
            size="lg"
            className="glass-strong bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 relative overflow-hidden group"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            <span className="relative z-10 flex items-center">
              Explore My Work
              <ChevronDown className="ml-2 w-5 h-5 animate-bounce group-hover:animate-pulse transition-all duration-300" />
            </span>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">About Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Professional Photo */}
            <div className="relative group">
              <div className="glass-strong bg-card/50 p-8 rounded-3xl hover:scale-105 transition-all duration-500">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/img1.jpg"
                    alt="Nidhi Kulkarni Professional"
                    className="w-full h-96 object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-6">
              <div className="glass bg-card/30 p-8 rounded-2xl hover:bg-card/50 transition-all duration-300">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I'm <span className="text-primary font-semibold">Nidhi Kulkarni</span>, a dedicated Computer Science
                  and Engineering student from{" "}
                  <span className="text-accent font-medium">Vellore Institute of Technology</span>.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  With hands-on experience in full-stack development through internships at{" "}
                  <span className="text-primary font-semibold">ISRO (NRSC)</span>,{" "}
                  <span className="text-accent font-semibold">IIT Madras</span>, and{" "}
                  <span className="text-primary font-semibold">IIIT Hyderabad</span>, I specialize in building scalable
                  web applications, integrating geospatial data, and leveraging machine learning for real-world impact.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 gap-4">
                <div className="glass bg-card/30 p-4 rounded-xl text-center hover:bg-card/50 transition-all duration-300">
                  <div className="text-2xl font-bold text-accent">3+</div>
                  <div className="text-sm text-muted-foreground">Professional Internships</div>
                </div>
              </div>
            </div>
          </div>

          {/* Education Timeline */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold font-serif mb-8 text-center">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Education Journey
              </span>
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full"></div>

              <div className="space-y-12">

                {/* Bachelor's Degree */}
                <div className="relative flex flex-col sm:flex-row items-center">
                  {/* Left Card */}
                  <div className="w-full sm:w-1/2 pr-4 sm:pr-8 text-right">
                    <Card className="glass bg-card/50 hover:bg-card/70 transition-all duration-300 hover:scale-105 p-4 sm:p-6 max-h-[24rem] sm:max-h-none overflow-hidden">
                      <CardContent className="p-2 sm:p-6 flex flex-col gap-2 sm:gap-4">
                        <div className="flex items-center justify-end">
                          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm text-muted-foreground">2021 - 2025</span>
                        </div>
                        <h4 className="text-sm sm:text-xl font-semibold text-primary">
                          Bachelor of Technology in Computer Science and Engineering
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Vellore Institute of Technology
                        </p>
                        <div className="flex items-center justify-end">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-accent mr-1" />
                          <span className="text-xs sm:text-sm text-muted-foreground">India</span>
                        </div>
                        <div className="flex flex-wrap justify-end gap-1 sm:gap-2 mt-2">
                          <div className="bg-primary/20 text-primary px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                            Leadership Excellence
                          </div>
                          <div className="bg-accent/20 text-accent px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                            2 Consecutive 10 GPA Semesters
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                          Active member of multiple clubs and chapters
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 top-8 sm:top-1/2"></div>
                </div>

                {/* Intermediate */}
                <div className="relative flex flex-col sm:flex-row items-center">
                  {/* Left empty */}
                  <div className="w-full sm:w-1/2 pr-4 sm:pr-8"></div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background z-10 top-8 sm:top-1/2"></div>

                  {/* Right Card */}
                  <div className="w-full sm:w-1/2 pl-4 sm:pl-8">
                    <Card className="glass bg-card/50 hover:bg-card/70 transition-all duration-300 hover:scale-105 p-4 sm:p-6 max-h-[16rem] sm:max-h-none overflow-hidden">
                      <CardContent className="p-2 sm:p-6 flex flex-col gap-2 sm:gap-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm text-muted-foreground">2019 - 2021</span>
                        </div>
                        <h4 className="text-sm sm:text-xl font-semibold text-accent">Intermediate</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">Sri Chaitanya Junior Kalashala</p>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1" />
                          <span className="text-xs sm:text-sm text-muted-foreground">India</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* School */}
                <div className="relative flex flex-col sm:flex-row items-center">
                  {/* Left Card */}
                  <div className="w-full sm:w-1/2 pr-4 sm:pr-8 text-right">
                    <Card className="glass bg-card/50 hover:bg-card/70 transition-all duration-300 hover:scale-105 p-4 sm:p-6 max-h-[24rem] sm:max-h-none overflow-hidden">
                      <CardContent className="p-2 sm:p-6 flex flex-col gap-2 sm:gap-4">
                        <div className="flex items-center justify-end">
                          <School className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1 sm:mr-2" />
                          <span className="text-xs sm:text-sm text-muted-foreground">2017 - 2019</span>
                        </div>
                        <h4 className="text-sm sm:text-xl font-semibold text-primary">School</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">St. Joseph's School</p>
                        <div className="flex items-center justify-end">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-accent mr-1" />
                          <span className="text-xs sm:text-sm text-muted-foreground">India</span>
                        </div>
                        <div className="flex flex-wrap justify-end gap-1 sm:gap-2 mt-2">
                          <div className="bg-primary/20 text-primary px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                            Blue House Captain (2017-18)
                          </div>
                          <div className="bg-accent/20 text-accent px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                            Head Girl (2018-19)
                          </div>
                          <div className="bg-primary/20 text-primary px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                            Law & Order Minister
                          </div>
                          <div className="bg-accent/20 text-accent px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                            Prime Minister
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">Active Council Member (2017-2019)</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 top-8 sm:top-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Areas of Interest */}
          <div>
            <h3 className="text-3xl font-bold font-serif mb-8 text-center">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Areas of Interest
              </span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interestAreas.map((area, index) => {
                const Icon = area.icon
                return (
                  <Card
                    key={area.name}
                    className="glass bg-card/30 hover:bg-card/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${area.color} p-4 group-hover:scale-110 transition-all duration-300`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {area.name}
                      </h4>
                      <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto group-hover:w-full transition-all duration-500"></div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 left-10 opacity-20" style={getParallaxStyle(1)}>
            <Star className="w-8 h-8 text-primary floating" />
          </div>
          <div className="absolute bottom-40 right-20 opacity-25" style={getParallaxStyle(-1.5)}>
            <Rocket className="w-6 h-6 text-accent floating" style={{ animationDelay: "2s" }} />
          </div>
          <div className="absolute top-60 right-40 opacity-15" style={getParallaxStyle(2)}>
            <Globe className="w-10 h-10 text-primary floating" style={{ animationDelay: "4s" }} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Innovative solutions combining cutting-edge technology with real-world impact
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="glass bg-card/30 hover:bg-card/60 transition-all duration-500 hover:scale-105 hover:-translate-y-4 group cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              >
                {/* Project Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {project.bgElements.map((Icon, i) => (
                    <Icon
                      key={i}
                      className={`absolute w-4 h-4 text-primary/10 floating`}
                      style={{
                        top: `${20 + i * 30}%`,
                        right: `${10 + i * 20}%`,
                        animationDelay: `${i * 2}s`,
                      }}
                    />
                  ))}
                </div>

                <CardContent className="p-0 relative z-10">
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}
                    ></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-none`}>
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className={`text-muted-foreground mb-4 ${selectedProject === project.id ? "" : "line-clamp-3"}`}>
                      {selectedProject === project.id ? project.fullDescription : project.description}
                    </p>

                    {/* Impact Metrics */}
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-accent mb-1">Impact:</div>
                      <div className="text-sm text-muted-foreground">{project.impact}</div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, selectedProject === project.id ? project.tech.length : 4).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs glass bg-card/50">
                          {tech}
                        </Badge>
                      ))}
                      {!selectedProject && project.tech.length > 4 && (
                        <Badge variant="secondary" className="text-xs glass bg-card/50">
                          +{project.tech.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 glass-strong bg-primary/80 hover:bg-primary text-primary-foreground"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {selectedProject === project.id ? "Show Less" : "View Details"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass bg-transparent hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.githubUrl, "_blank")
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Experience Section */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold font-serif mb-8 text-center">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Professional Experience
              </span>
            </h3>

            <div className="space-y-6">
              {experiences.map((exp, index) => {
                const Icon = exp.icon
                return (
                  <Card
                    key={exp.id}
                    className="glass bg-card/30 hover:bg-card/60 transition-all duration-500 hover:scale-102 group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${exp.color} p-3 group-hover:scale-110 transition-all duration-300`}
                        >
                          <Icon className="w-full h-full text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h4 className="text-xl font-semibold text-primary">{exp.role}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              {exp.period}
                            </div>
                          </div>

                          <div className="flex items-center mb-3">
                            <Building className="w-4 h-4 text-accent mr-2" />
                            <span className="font-medium text-accent">{exp.company}</span>
                          </div>

                          <p className="text-muted-foreground mb-4">{exp.description}</p>

                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs glass bg-card/30">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-3xl font-bold font-serif mb-8 text-center">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Technical Skills
              </span>
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {skillCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Card
                    key={category.title}
                    className="glass bg-card/30 hover:bg-card/60 transition-all duration-500 hover:scale-105 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} p-4 group-hover:scale-110 transition-all duration-300`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>

                      <h4 className="text-lg font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </h4>

                      <div className="flex flex-wrap gap-2 justify-center">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs glass bg-card/50 hover:bg-primary/20 transition-colors duration-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* More Section */}
      <section id="more" className="py-20 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                More About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond coding, I'm passionate about fitness, creativity, and continuous learning
            </p>
          </div>

          {/* Hobbies Section */}
          <div>
            <h3 className="text-3xl font-bold font-serif mb-8 text-center">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Personal Interests
              </span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hobbies.map((hobby, index) => {
                const Icon = hobby.icon
                const currentIndex = currentImageIndex[hobby.id] || 0

                return (
                  <Card
                    key={hobby.id}
                    className="glass bg-card/30 hover:bg-card/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <CardContent className="p-6">
                      {/* Hobby Icon */}
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${hobby.gradient} p-4 group-hover:scale-110 transition-all duration-300`}
                      >
                        <Icon className="w-full h-full text-white" />
                      </div>

                      <h4 className="text-xl font-semibold mb-3 text-center group-hover:text-primary transition-colors duration-300">
                        {hobby.title}
                      </h4>

                      <p className="text-muted-foreground text-center mb-4">{hobby.description}</p>

                      <div className="relative h-48 mx-auto max-w-xs">
                        {hobby.images.map((image, imgIndex) => {
                          const displayIndex = (currentIndex + imgIndex) % hobby.images.length
                          const actualImage = hobby.images[displayIndex]

                          return (
                            <div
                              key={`${hobby.id}-${imgIndex}`}
                              className="absolute inset-0 rounded-xl overflow-hidden glass bg-card/20 cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-2 hover:z-20"
                              style={{
                                transform: `translateY(${imgIndex * 8}px) translateX(${imgIndex * 4}px) rotate(${imgIndex * 2 - 4}deg)`,
                                zIndex: hobby.images.length - imgIndex,
                                opacity: imgIndex < 5 ? 1 : 0,
                              }}
                              onClick={() => setSelectedImage(actualImage)}
                            >
                              <img
                                src={actualImage || "/placeholder.svg"}
                                alt={`${hobby.title} ${imgIndex + 1}`}
                                className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          )
                        })}
                        {hobby.images.length > 5 && (
                          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            +{hobby.images.length - 5}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <SimpleReviewsSection />

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Full size view"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-border/30 glass bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl font-serif bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Nidhi Kulkarni
              </div>
              <p className="text-muted-foreground text-sm mt-1">Full-Stack Developer & Tech Enthusiast</p>
              <p className="text-muted-foreground text-sm mt-1">nidhikulkarnicg2@gmail.com</p>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="https://linkedin.com/in/kulkarni-nidhi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:nidhikulkarnicg2@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/nidkulkarni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/30 text-center">
            <p className="text-muted-foreground text-sm">© 2025 Nidhi Kulkarni. All rights reserved.</p>
          </div>
        </div>

        <Button
          onClick={() => scrollToSection("home")}
          className="fixed bottom-8 right-8 glass-strong bg-primary/80 hover:bg-primary text-primary-foreground p-3 rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 z-50"
          size="sm"
        >
          ↑
        </Button>
      </footer>
    </div>
  )
}
