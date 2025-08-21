import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Projects', href: '/projects' },
      { name: 'Client Feedback', href: '/feedback' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Website Creation', href: '/services#web' },
      { name: 'App Development', href: '/services#app' },
      { name: 'AI-Powered Ads', href: '/services#ai' },
      { name: 'Graphic Design', href: '/services#design' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sathwik-sai-t-v-ba202830a', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'Email', href: 'mailto:devduocompany@gmail.com', icon: Mail },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-[hsl(258,80%,4%)] to-[hsl(258,80%,6%)] border-t border-[hsl(258,40%,20%)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[hsl(285,100%,55%,0.1)] to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[hsl(285,100%,55%,0.1)] to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[hsl(280,70%,45%)] to-[hsl(285,75%,55%)] bg-clip-text text-transparent">
                  DEV DUO
                </span>
              </h3>
              <p className="text-[hsl(290,10%,70%)] leading-relaxed">
                Engineering tomorrow's digital reality through cutting-edge web technologies, 
                AI-driven applications, and immersive visual experiences.
              </p>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[hsl(258,60%,15%)] border border-[hsl(258,40%,20%)] flex items-center justify-center text-[hsl(285,100%,75%)] hover:bg-[hsl(285,100%,55%,0.1)] hover:border-[hsl(285,100%,55%,0.5)] transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[hsl(300,20%,95%)] mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[hsl(290,10%,70%)] hover:text-[hsl(285,100%,75%)] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-[hsl(285,100%,55%,0)] group-hover:bg-[hsl(285,100%,55%,0.5)] mr-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[hsl(300,20%,95%)] mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[hsl(290,10%,70%)] hover:text-[hsl(285,100%,75%)] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-[hsl(285,100%,55%,0)] group-hover:bg-[hsl(285,100%,55%,0.5)] mr-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[hsl(300,20%,95%)] mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[hsl(285,100%,75%)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[hsl(290,10%,70%)] text-sm">Email</p>
                  <a 
                    href="mailto:devduocompany@gmail.com" 
                    className="text-[hsl(300,20%,95%)] hover:text-[hsl(285,100%,75%)] transition-colors"
                  >
                    devduocompany@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[hsl(285,100%,75%)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[hsl(290,10%,70%)] text-sm">Phone</p>
                  <a 
                    href="tel:+919000000000" 
                    className="text-[hsl(300,20%,95%)] hover:text-[hsl(285,100%,75%)] transition-colors"
                  >
                    +91 90000 00000
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[hsl(285,100%,75%)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[hsl(290,10%,70%)] text-sm">Location</p>
                  <p className="text-[hsl(300,20%,95%)]">India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-[hsl(258,40%,20%)]">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold text-[hsl(300,20%,95%)] mb-4">
              Stay Updated with Our Latest Innovations
            </h4>
            <p className="text-[hsl(290,10%,70%)] mb-6">
              Get notified about new projects, AI breakthroughs, and exclusive insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[hsl(258,60%,10%)] border border-[hsl(258,40%,20%)] rounded-lg text-[hsl(300,20%,95%)] placeholder-[hsl(290,10%,70%)] focus:border-[hsl(285,100%,55%)] focus:outline-none transition-colors"
              />
              <Button className="bg-gradient-to-r from-[hsl(280,70%,45%)] to-[hsl(285,75%,55%)] text-white hover:from-[hsl(280,70%,50%)] hover:to-[hsl(285,75%,60%)] transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[hsl(258,40%,20%)]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[hsl(290,10%,70%)] text-sm">
              © {currentYear} Dev Duo Creative Hub. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className="text-[hsl(290,10%,70%)] hover:text-[hsl(285,100%,75%)] text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-[hsl(290,10%,70%)] hover:text-[hsl(285,100%,75%)] text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
