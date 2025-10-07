import { FounderCard } from '@/components/FounderCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Smartphone, Megaphone, Palette, Cpu, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import Background3D from '@/components/Background3D';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const services = [
    {
      icon: Code,
      title: 'Website Creation',
      description: 'Futuristic web experiences with next-gen technologies',
      color: 'from-primary to-primary-glow'
    },
    {
      icon: Smartphone,
      title: 'App Development',
      description: 'Cutting-edge mobile applications with AI integration',
      color: 'from-accent to-primary'
    },
    {
      icon: Megaphone,
      title: 'AI-Powered Ads',
      description: 'Neural network-driven marketing that adapts and evolves',
      color: 'from-primary-glow to-accent'
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      description: 'Holographic visuals and cyber-aesthetic design systems',
      color: 'from-secondary to-primary'
    },
    {
      icon: Cpu,
      title: 'PCB Designing',
      description: 'Custom circuit board design and prototyping services',
      color: 'from-primary to-accent'
    },
    {
      icon: Video,
      title: 'Video Editing',
      description: 'Professional video production and post-processing',
      color: 'from-accent to-secondary'
    }
  ];

  const founders = [
    {
      name: 'TV Sathwik Sai',
      image: '/images/10c986ba-e64c-4f36-b0f7-3c31e81c6649.png',
      linkedin: 'https://www.linkedin.com/in/sathwik-sai-t-v-ba202830a',
      instagram: 'https://www.instagram.com/sathwik__s_a_i__',
      email: 'mailto:devduocompany@gmail.com'
    },
    {
      name: 'MD Ansar Vali',
      image: '/images/0250e237-9743-4be2-b11b-1f501eea372d.png',
      linkedin: 'https://www.linkedin.com/in/mohammad-ansar-vali-80b099317',
      instagram: 'https://www.instagram.com/_kakashi_3_',
      email: 'mailto:devduocompany@gmail.com'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Helmet>
      <title>DevDuo | Web & App Development Agency</title>
      <meta
      name="description"
      content="We design and develop custom web and mobile solutions using React, Vite, and scalable cloud infrastructure."
      />
      </Helmet>
      <Background3D intensity="medium" />
      {/* Hero Section */}
      <section className="pt-40 pb-32 px-4 relative">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rotate-45 animate-float-cyber" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary/10 rounded-full animate-float-cyber" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-accent/40 animate-float-cyber" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="glass-effect p-12 rounded-3xl max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in-cyber">
              <span className="cyber-text animate-hologram">
                DEV DUO
              </span>
            </h1>
            
            <div className="space-y-6 mb-12">
              <p className="text-2xl md:text-3xl text-primary-glow font-mono animate-fade-in-cyber" style={{ animationDelay: '0.2s' }}>
                Crafting Tomorrow's Digital Reality
              </p>
              <p className="text-lg md:text-xl text-foreground/90 max-w-4xl mx-auto animate-fade-in-cyber leading-relaxed" style={{ animationDelay: '0.4s' }}>
                We engineer next-generation digital experiences through advanced web technologies, 
                AI-driven applications, neural network marketing, and immersive visual designs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-cyber" style={{ animationDelay: '0.6s' }}>
              <Link to="/projects">
                <Button className="btn-gradient group text-lg px-12 py-6">
                  <span className="flex items-center">
                    Our Projects
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
                  </span>
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="btn-neon text-lg px-12 py-6">
                  Connect With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-cyber">
              Our <span className="cyber-text">Services</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-primary-glow to-accent mx-auto mb-8" />
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto font-mono">
              Professional web and app development services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card p-8 text-center transform-3d hover:scale-105 animate-fade-in-cyber group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-card/50 border border-primary/30 flex items-center justify-center mx-auto">
                    <service.icon className="w-10 h-10 text-primary-glow group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 cyber-text">{service.title}</h3>
                <p className="text-foreground/80 font-mono text-sm leading-relaxed">{service.description}</p>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-32 px-4 relative">
        {/* Background matrix effect */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-cyber">
              System <span className="cyber-text">Architects</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-accent via-primary to-primary-glow mx-auto mb-8" />
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto font-mono">
              The visionaries behind the digital revolution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="animate-fade-in-cyber"
                style={{ animationDelay: `${index * 400}ms` }}
              >
                <FounderCard {...founder} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Floating data streams */}
        <div className="absolute top-1/4 left-0 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent animate-data-stream" />
        <div className="absolute top-1/3 right-0 w-px h-1/3 bg-gradient-to-b from-transparent via-accent/40 to-transparent animate-data-stream" style={{ animationDelay: '2s' }} />
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative">
        <div className="container mx-auto text-center">
          <div className="glass-effect p-16 max-w-5xl mx-auto relative overflow-hidden animate-fade-in-cyber">
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 cyber-text">
                Initialize Your Vision
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact">
                  <Button className="btn-gradient text-lg px-12 py-6 group">
                    <span className="flex items-center">
                      Start Your Journey
                      <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
                    </span>
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button className="btn-neon text-lg px-12 py-6">
                    High Lights Over Time
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Floating orbs */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-primary rounded-full animate-float-cyber opacity-60" />
            <div className="absolute bottom-8 left-8 w-3 h-3 bg-accent rounded-full animate-float-cyber opacity-40" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-8 w-2 h-2 bg-primary-glow rounded-full animate-float-cyber opacity-80" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;