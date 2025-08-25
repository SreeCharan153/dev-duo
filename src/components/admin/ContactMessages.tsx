import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';
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
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ));
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
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
        <Card className="glass-card">
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
          <Card className="glass-card">
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
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass-card h-full flex items-center justify-center">
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