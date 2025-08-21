import { Users, Target, Award, Heart } from 'lucide-react';
import Background3D from '@/components/Background3D';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We stay ahead of the curve with cutting-edge technologies and creative solutions.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients to understand their vision and exceed expectations.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Quality is at the core of everything we do, from code to design to client service.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do and it shows in every project we deliver.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 relative">
      <Background3D intensity="low" />
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            About <span className="text-primary">DEV DUO</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            We are a dynamic duo of passionate developers and designers, 
            committed to transforming ideas into exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="project-card bg-card p-8 md:p-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-lg mb-6">
                  DEV DUO was born from a shared vision between two passionate technologists: 
                  <strong className="text-primary"> TV Sathwik Sai</strong> and <strong className="text-primary">MD Ansar Vali</strong>. 
                  What started as late-night coding sessions and brainstorming marathons has evolved into 
                  a full-service digital agency dedicated to helping businesses thrive in the digital landscape.
                </p>
                
                <p className="text-lg mb-6">
                  Our journey began when we realized that many businesses struggle to bridge the gap 
                  between their vision and the technical implementation. We founded DEV DUO to be that 
                  bridge - combining technical expertise with creative innovation to deliver solutions 
                  that not only work flawlessly but also inspire and engage users.
                </p>
                
                <p className="text-lg">
                  Today, we specialize in creating modern websites, developing powerful applications, 
                  implementing AI-driven marketing strategies, and crafting compelling visual designs. 
                  Every project is an opportunity for us to push boundaries and create something 
                  extraordinary together with our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
            Our <span className="text-primary">Values</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="project-card bg-card p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">
            The <span className="text-primary">Team</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="project-card bg-card p-8 animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-4 text-primary">TV Sathwik Sai</h3>
              <p className="text-lg font-semibold mb-4">Co-Founder & Full-Stack Developer</p>
              <p className="text-muted-foreground mb-4">
                Sathwik brings a wealth of experience in modern web technologies and has a passion 
                for creating scalable, user-friendly applications. His expertise spans from frontend 
                frameworks to backend architectures, ensuring every project is built on solid foundations.
              </p>
              <p className="text-muted-foreground">
                When he's not coding, you'll find him exploring the latest tech trends and contributing 
                to open-source projects.
              </p>
            </div>
            
            <div className="project-card bg-card p-8 animate-fade-in-up animation-delay-200">
              <h3 className="text-2xl font-bold mb-4 text-primary">MD Ansar Vali</h3>
              <p className="text-lg font-semibold mb-4">Co-Founder & Creative Developer</p>
              <p className="text-muted-foreground mb-4">
                Ansar combines technical skills with creative vision, specializing in UI/UX design 
                and frontend development. His eye for detail and user-centric approach ensures that 
                every interface is not just functional, but delightful to use.
              </p>
              <p className="text-muted-foreground">
                His diverse background in design and development allows him to bridge the gap between 
                aesthetics and functionality seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;