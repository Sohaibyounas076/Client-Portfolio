import React, { useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    // Mouse move listener
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    // Particles array
    const particles = [];
    const particleCount = 80;
    
    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = `hsla(${Math.random() * 60 + 200}, 70%, 60%, ${Math.random() * 0.3 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off walls
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        
        // Mouse interaction
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.speedX += dx * 0.0005;
          this.speedY += dy * 0.0005;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation function
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(250, 70%, 60%, ${0.2 * (1 - distance/120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw mouse influence area
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 100, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.1)';
      ctx.stroke();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce platform with secure payment integration and user authentication",
      technologies: ["Django", "React", "MySQL", "AWS"],
      githubLink: "https://github.com/IqraMajeed-Dev/ecommerce-platform",
      icon: "🛒"
    },
    {
      id: 2,
      title: "Hotel Booking System",
      description: "Hotel reservation system with real-time availability and booking management",
      technologies: ["Python", "Django", "React", "PostgreSQL"],
      githubLink: "https://github.com/IqraMajeed-Dev/hotel-booking",
      icon: "🏨"
    },
    {
      id: 3,
      title: "Flutter E-Commerce App",
      description: "Cross-platform mobile e-commerce application with beautiful UI",
      technologies: ["Flutter", "Dart", "REST API", "Firebase"],
      githubLink: "https://github.com/IqraMajeed-Dev/flutter-ecommerce",
      icon: "📱"
    },
    {
      id: 4,
      title: "RESTful APIs Collection",
      description: "Collection of 90+ RESTful APIs for various applications and microservices",
      technologies: ["Django REST", "Python", "JWT", "PostgreSQL"],
      githubLink: "https://github.com/IqraMajeed-Dev/restful-apis",
      icon: "🔗"
    }
  ];

  const skills = [
    { name: "Python", level: 90, icon: "🐍" },
    { name: "Django", level: 85, icon: "⚡" },
    { name: "React JS", level: 80, icon: "⚛️" },
    { name: "JavaScript", level: 85, icon: "📜" },
    { name: "MySQL", level: 80, icon: "🗄️" },
    { name: "PostgreSQL", level: 75, icon: "🐘" },
    { name: "AWS", level: 70, icon: "☁️" },
    { name: "Flutter", level: 75, icon: "📱" },
    { name: "HTML & CSS", level: 95, icon: "🎨" },
    { name: "Git & GitHub", level: 85, icon: "🔧" },
    { name: "RESTful APIs", level: 90, icon: "🔗" },
    { name: "C++", level: 70, icon: "⚙️" }
  ];

  return (
    <div className="App">
      {/* Animated Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="animated-background"
      />
      
      {/* Gradient Overlays */}
      <div className="gradient-overlay top-left"></div>
      <div className="gradient-overlay bottom-right"></div>
      <div className="noise-overlay"></div>

      {/* Header */}
      <header className="glass-header">
        <div className="container">
          <nav className="navbar">
            <div className="logo">
              <div className="logo-icon">🚀</div>
              <span>Iqra Majeed</span>
            </div>
            <div className="nav-links">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                  {item}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="badge">Full Stack Developer</div>
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">Iqra Majeed</span>
              </h1>
              <p className="hero-description">
                I craft digital experiences using modern technologies. 
                Passionate about creating scalable web and mobile applications 
                that make a difference.
              </p>
              <div className="hero-buttons">
                <button className="btn primary-btn">
                  <span>View My Work</span>
                  <div className="btn-hover-effect"></div>
                </button>
                <button className="btn secondary-btn">
                  <span>Download CV</span>
                </button>
              </div>
              <div className="social-links">
                {[
                  { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/IqraMajeed-Dev' },
                  { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
                  { name: 'Email', icon: 'fas fa-envelope', url: 'mailto:iqramajeed.dev@gmail.com' }
                ].map((social) => (
                  <a key={social.name} href={social.url} className="social-link">
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-cards">
                <div className="card code-card">
                  <div className="card-icon">💻</div>
                  <span>Clean Code</span>
                </div>
                <div className="card design-card">
                  <div className="card-icon">🎨</div>
                  <span>Modern Design</span>
                </div>
                <div className="card responsive-card">
                  <div className="card-icon">📱</div>
                  <span>Responsive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <div className="section-subtitle">Get to know me better</div>
          </div>
          <div className="about-content">
            <div className="about-card glass-card">
              <div className="about-text">
                <p>
                  I'm a passionate <strong>Full Stack Developer</strong> currently pursuing 
                  a <strong>Bachelor of Science in Engineering Technology</strong> at the 
                  University of Lahore.
                </p>
                <p>
                  My expertise spans across backend development with <strong>Python, Django, 
                  and RESTful APIs</strong>, as well as frontend technologies like 
                  <strong> React, JavaScript, and Flutter</strong>.
                </p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">6+</div>
                    <div className="stat-label">Projects</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">2+</div>
                    <div className="stat-label">Certificates</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">90+</div>
                    <div className="stat-label">APIs Built</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">My Skills</h2>
            <div className="section-subtitle">Technologies I work with</div>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-card glass-card" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="skill-header">
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="skill-info">
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-percentage">{skill.level}%</div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">My Projects</h2>
            <div className="section-subtitle">Some of my recent work</div>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.id} className="project-card glass-card" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="project-icon">{project.icon}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <a href={project.githubLink} className="project-link">
                  <i className="fab fa-github"></i>
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-subtitle">Let's work together</div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-card glass-card">
                <i className="fas fa-envelope"></i>
                <h3>Email</h3>
                <p>iqramajeed.dev@gmail.com</p>
              </div>
              <div className="contact-card glass-card">
                <i className="fab fa-github"></i>
                <h3>GitHub</h3>
                <p>IqraMajeed-Dev</p>
              </div>
              <div className="contact-card glass-card">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Location</h3>
                <p>Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Iqra Majeed. Built with ❤️ using React</p>
        </div>
      </footer>
    </div>
  );
};

export default App;