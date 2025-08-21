import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FeedbackCard } from '@/components/FeedbackCard';
import { Loader2, AlertCircle, Star } from 'lucide-react';
import Background3D from '@/components/Background3D';

interface Feedback {
  id: string;
  client_name_sanitized: string;
  feedback: string;
  rating: number;
  project_title?: string;
  created_at: string;
}

const ClientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeedbacks();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('feedbacks-changes')
        .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'client_feedbacks'
        },
        () => {
          fetchFeedbacks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_public_feedbacks')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1)
    : '0';

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={24}
        className={`${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : index < rating
            ? 'text-yellow-400 fill-yellow-400/50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive">Error loading feedback: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 relative">
      <Background3D intensity="low" />
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Client <span className="text-primary">Feedback</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Here's what our amazing clients have to say about working with DEV DUO.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      {feedbacks.length > 0 && (
        <section className="pb-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-md mx-auto project-card bg-card p-8 text-center animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-4">Overall Rating</h3>
              <div className="flex justify-center mb-2">
                {renderStars(parseFloat(averageRating))}
              </div>
              <p className="text-3xl font-bold text-primary mb-2">{averageRating}/5</p>
              <p className="text-muted-foreground">
                Based on {feedbacks.length} review{feedbacks.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Feedback Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          {feedbacks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {feedbacks.map((feedback, index) => (
                <div
                  key={feedback.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <FeedbackCard {...feedback} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No feedback available yet. Be the first to share your experience!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClientFeedback;