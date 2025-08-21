import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram } from 'lucide-react';
import Background3D from '@/components/Background3D';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: 'Message sent successfully!',
        description: 'We\'ll get back to you as soon as possible.',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast({
        title: 'Error sending message',
        description: err instanceof Error ? err.message : 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    {
      name: 'TV Sathwik Sai - LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/sathwik-sai-t-v-ba202830a'
    },
    {
      name: 'TV Sathwik Sai - Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/sathwik__s_a_i__'
    },
    {
      name: 'MD Ansar Vali - LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/mohammad-ansar-vali-80b099317'
    },
    {
      name: 'MD Ansar Vali - Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/_kakashi_3_'
    }
  ];

  return (
    <div className="min-h-screen pt-24 relative">
      <Background3D intensity="low" />
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Ready to start your next project? Let's discuss how we can bring your vision to life.
          </p>
        </div>
      </section>

      <div className="pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="project-card bg-card p-8 animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-1"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient w-full"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2" size={16} />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in-up animation-delay-200">
              {/* Contact Details */}
              <div className="project-card bg-card p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="font-semibold">Email</p>
                       <div className="text-muted-foreground">
                         <a href="mailto:devduocompany@gmail.com" className="hover:text-primary transition-colors">
                           devduocompany@gmail.com
                         </a>
                       </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="font-semibold">Response Time</p>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="font-semibold">Remote Services</p>
                      <p className="text-muted-foreground">Available Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="project-card bg-card p-8">
                <h2 className="text-2xl font-bold mb-6">Connect with us</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">TV Sathwik Sai</h3>
                    <div className="flex gap-3">
                      <a
                        href="https://www.linkedin.com/in/sathwik-sai-t-v-ba202830a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-primary rounded-lg hover:bg-primary-glow transition-colors"
                      >
                        <Linkedin size={20} className="text-primary-foreground" />
                      </a>
                      <a
                        href="https://www.instagram.com/sathwik__s_a_i__"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-primary rounded-lg hover:bg-primary-glow transition-colors"
                      >
                        <Instagram size={20} className="text-primary-foreground" />
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">MD Ansar Vali</h3>
                    <div className="flex gap-3">
                      <a
                        href="https://www.linkedin.com/in/mohammad-ansar-vali-80b099317"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-primary rounded-lg hover:bg-primary-glow transition-colors"
                      >
                        <Linkedin size={20} className="text-primary-foreground" />
                      </a>
                      <a
                        href="https://www.instagram.com/_kakashi_3_"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-primary rounded-lg hover:bg-primary-glow transition-colors"
                      >
                        <Instagram size={20} className="text-primary-foreground" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;