import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, MessageSquare, Settings, BarChart3, Shield } from 'lucide-react';
import { Logo } from '@/components/Logo';

const Admin = () => {
  const { user, signOut } = useAuth();

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
    { title: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-400' },
    { title: 'Projects', value: '56', icon: FileText, color: 'text-green-400' },
    { title: 'Feedback', value: '89', icon: MessageSquare, color: 'text-purple-400' },
    { title: 'System Health', value: '98%', icon: BarChart3, color: 'text-cyan-400' },
  ];

  const quickActions = [
    { title: 'User Management', icon: Users, description: 'Manage user accounts and permissions' },
    { title: 'Content Management', icon: FileText, description: 'Update projects and portfolio content' },
    { title: 'Feedback Review', icon: MessageSquare, description: 'Review and respond to client feedback' },
    { title: 'System Settings', icon: Settings, description: 'Configure system preferences' },
  ];

  return (
    <div className="min-h-screen cyber-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Logo size="md" />
            <div>
              <h1 className="text-3xl font-bold cyber-text">Admin Panel</h1>
              <p className="text-foreground/80">Welcome back, {user.email}</p>
            </div>
          </div>
          <Button onClick={signOut} variant="outline" className="neon-border">
            <Shield className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
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
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="glass-card hover:shadow-cyber transition-all duration-300 cursor-pointer group">
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
              {[
                { action: 'New user registration', time: '2 minutes ago', type: 'user' },
                { action: 'Project updated', time: '15 minutes ago', type: 'project' },
                { action: 'Feedback received', time: '1 hour ago', type: 'feedback' },
                { action: 'System backup completed', time: '2 hours ago', type: 'system' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-foreground">{activity.action}</span>
                  </div>
                  <span className="text-sm text-foreground/60">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;