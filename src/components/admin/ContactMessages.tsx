import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type ContactMessage = Tables<'contact_messages'>;

const ContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state immediately
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ));
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return;
    }

    try {
      console.log('Attempting to delete message with ID:', id);
      
      // First check if user has admin permissions
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (profileError) {
        console.error('Error checking user profile:', profileError);
        throw new Error('Unable to verify admin permissions');
      }

      if (!profile || !['admin', 'founder'].includes(profile.role)) {
        throw new Error('Insufficient permissions to delete messages');
      }
      
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }
      
      console.log('Message deleted successfully from database');
      
      // Update local state immediately
      setMessages(prev => {
        const updated = prev.filter(msg => msg.id !== id);
        console.log('Updated messages count:', updated.length);
        return updated;
      });
      
      // Clear selection if deleted message was selected
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
      
      alert('Message deleted successfully!');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert(`Error deleting message: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // Refresh on error to ensure consistency
      await fetchMessages();
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'new':
        return <Badge variant="default" children="New" />;
      case 'read':
        return <Badge variant="secondary" children="Read" />;
      case 'replied':
        return <Badge variant="default" children="Replied" />;
      case 'archived':
        return <Badge variant="outline" children="Archived" />;
      default:
        return <Badge variant="default" children="New" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Messages List */}
      <div className="lg:col-span-1">
        <Card className="glass-card admin-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Messages
              <Badge className="ml-2 bg-primary">{messages.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{message.name}</div>
                    {getStatusBadge(message.status)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 truncate">
                    {message.subject || 'No subject'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(message.created_at || '').toLocaleDateString()}
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No messages found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <Card className="glass-card admin-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedMessage.subject || 'No subject'}</CardTitle>
                  <div className="flex items-center mt-2">
                    <div className="font-medium">{selectedMessage.name}</div>
                    <div className="mx-2">•</div>
                    <div className="text-muted-foreground">{selectedMessage.email}</div>
                  </div>
                </div>
                {getStatusBadge(selectedMessage.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-4">
                  Received on {new Date(selectedMessage.created_at || '').toLocaleString()}
                </div>
                <div className="prose max-w-none">
                  {selectedMessage.message}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedMessage.status === 'read' ? 'default' : 'outline'}
                  onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Read
                </Button>
                <Button
                  variant={selectedMessage.status === 'replied' ? 'default' : 'outline'}
                  onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Mark as Replied
                </Button>
                <Button
                  variant={selectedMessage.status === 'archived' ? 'default' : 'outline'}
                  onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="ml-auto"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass-card admin-card h-full flex items-center justify-center">
            <CardContent className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Select a message to view details</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;