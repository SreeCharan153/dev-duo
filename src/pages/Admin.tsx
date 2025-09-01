import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, MessageSquare, Settings, BarChart3, Shield, Star, FolderOpen } from 'lucide-react';
import { Logo } from '@/components/Logo';
import ContactMessages from '@/components/admin/ContactMessages';
import ProjectManagement from '@/components/admin/ProjectManagement';
import TestimonialManagement from '@/components/admin/TestimonialManagement';

const Admin = () => {
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalFeedback: 0,
    totalMessages: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const [projectsRes, feedbackRes, messagesRes, profilesRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('client_feedbacks').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        totalUsers: profilesRes.count || 0,
        totalProjects: projectsRes.count || 0,
        totalFeedback: feedbackRes.count || 0,
        totalMessages: messagesRes.count || 0
      });

      // Fetch recent activity
      const { data: recentProjects } = await supabase
        .from('projects')
        .select('title, created_at')
        .order('created_at', { ascending: false })
        .limit(2);

      const { data: recentFeedback } = await supabase
        .from('client_feedbacks')
        .select('client_name, created_at')
        .order('created_at', { ascending: false })
        .limit(2);

      const { data: recentMessages } = await supabase
        .from('contact_messages')
        .select('name, created_at')
        .order('created_at', { ascending: false })
        .limit(2);

      const activities = [];
      
      if (recentProjects) {
        activities.push(...recentProjects.map(p => ({
          action: `Project "${p.title}" was added`,
          time: getTimeAgo(p.created_at),
          type: 'project'
        })));
      }
      
      if (recentFeedback) {
        activities.push(...recentFeedback.map(f => ({
          action: `New feedback from ${f.client_name}`,
          time: getTimeAgo(f.created_at),
          type: 'feedback'
        })));
      }
      
      if (recentMessages) {
        activities.push(...recentMessages.map(m => ({
          action: `New message from ${m.name}`,
          time: getTimeAgo(m.created_at),
          type: 'message'
        })));
      }

      // Sort by most recent
      activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setRecentActivity(activities.slice(0, 4));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string | null) => {
    if (!dateString) return 'Unknown';
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center cyber-background">
        <Card className="glass-card w-full max-w-md">
          <CardHeader className="text-center">
            <Logo size="lg" className="mx-auto mb-4" animated />
            <CardTitle className="cyber-text">Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-foreground/80 mb-6">Please authenticate to access the admin panel</p>
            <Button className="btn-gradient w-full">
              Login to Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const adminStats = [
    { title: 'Total Users', value: stats.totalUsers.toString(), icon: Users, color: 'text-blue-400' },
    { title: 'Projects', value: stats.totalProjects.toString(), icon: FileText, color: 'text-green-400' },
    { title: 'Testimonials', value: stats.totalFeedback.toString(), icon: Star, color: 'text-purple-400' },
    { title: 'Messages', value: stats.totalMessages.toString(), icon: MessageSquare, color: 'text-cyan-400' },
  ];

  const quickActions = [
    { 
      title: 'Project Management', 
      icon: FolderOpen, 
      description: 'Add, edit, and manage portfolio projects',
      action: () => setActiveSection('projects')
    },
    { 
      title: 'Testimonials', 
      icon: Star, 
      description: 'Manage client testimonials and feedback',
      action: () => setActiveSection('testimonials')
    },
    { 
      title: 'Contact Messages', 
      icon: MessageSquare, 
      description: 'View and manage contact messages', 
      action: () => setActiveSection('contact-messages') 
    },
    { 
      title: 'User Management', 
      icon: Users, 
      description: 'Manage user accounts and permissions' 
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'contact-messages':
        return <ContactMessages />;
      case 'projects':
        return <ProjectManagement />;
      case 'testimonials':
        return <TestimonialManagement />;
      default:
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-foreground/20 rounded mb-2"></div>
                        <div className="h-8 bg-foreground/20 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                adminStats.map((stat, index) => (
                  <Card key={index} className="glass-card hover:shadow-neon transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold cyber-text">{stat.value}</p>
                        </div>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="glass-card admin-card hover:shadow-cyber transition-all duration-300 cursor-pointer group"
                  onClick={action.action}
                >
                  <CardHeader className="text-center">
                    <action.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-primary-glow transition-colors" />
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70 text-center">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-primary/20">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-foreground/20" />
                            <div className="h-4 bg-foreground/20 rounded w-48"></div>
                          </div>
                          <div className="h-4 bg-foreground/20 rounded w-20"></div>
                        </div>
                      </div>
                    ))
                  ) : recentActivity.length > 0 ? (
                    recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-primary/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-foreground">{activity.action}</span>
                        </div>
                        <span className="text-sm text-foreground/60">{activity.time}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-foreground/60">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 text-foreground/30" />
                      <p>No recent activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen cyber-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Logo size="md" />
            <div>
              <h1 className="text-3xl font-bold cyber-text">Admin Panel</h1>
              <p className="text-foreground/80">Welcome back, {user.email}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeSection === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setActiveSection('dashboard')}
              className="neon-border"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={activeSection === 'projects' ? 'default' : 'outline'}
              onClick={() => setActiveSection('projects')}
              className="neon-border"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Projects
            </Button>
            <Button
              variant={activeSection === 'testimonials' ? 'default' : 'outline'}
              onClick={() => setActiveSection('testimonials')}
              className="neon-border"
            >
              <Star className="w-4 h-4 mr-2" />
              Testimonials
            </Button>
            <Button
              variant={activeSection === 'contact-messages' ? 'default' : 'outline'}
              onClick={() => setActiveSection('contact-messages')}
              className="neon-border"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </Button>
            <Button onClick={signOut} variant="outline" className="neon-border">
              <Shield className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Admin;