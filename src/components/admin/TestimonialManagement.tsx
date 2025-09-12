import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Upload, Star, User, Calendar, Mail } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type ClientFeedback = Tables<'client_feedbacks'>;

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<ClientFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<ClientFeedback | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    project_title: '',
    feedback: '',
    rating: 5,
    image_file: null as File | null
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('client_feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `testimonials/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.client_name.trim() || !formData.feedback.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setUploading(true);

    try {
      let imageUrl = editingTestimonial?.client_image_url || null;

      if (formData.image_file) {
        imageUrl = await uploadImage(formData.image_file);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      const testimonialData = {
        client_name: formData.client_name.trim(),
        client_email: formData.client_email.trim() || null,
        project_title: formData.project_title.trim() || null,
        feedback: formData.feedback.trim(),
        rating: formData.rating,
        client_image_url: imageUrl
      };

      if (editingTestimonial) {
        const { error } = await supabase
          .from('client_feedbacks')
          .update(testimonialData)
          .eq('id', editingTestimonial.id);

        if (error) throw error;
        
        // Update local state immediately
        setTestimonials(prev => prev.map(t => 
          t.id === editingTestimonial.id ? { ...t, ...testimonialData } : t
        ));
      } else {
        const { data, error } = await supabase
          .from('client_feedbacks')
          .insert([testimonialData])
          .select();

        if (error) throw error;
        
        // Add to local state immediately
        if (data && data[0]) {
          setTestimonials(prev => [data[0], ...prev]);
        }
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert(`Error saving testimonial: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('client_feedbacks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state immediately
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error deleting testimonial. Please try again.');
      // Refresh on error to ensure consistency
      await fetchTestimonials();
    }
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      client_email: '',
      project_title: '',
      feedback: '',
      rating: 5,
      image_file: null
    });
    setEditingTestimonial(null);
  };

  const openEditDialog = (testimonial: ClientFeedback) => {
    setEditingTestimonial(testimonial);
    setFormData({
      client_name: testimonial.client_name,
      client_email: testimonial.client_email || '',
      project_title: testimonial.project_title || '',
      feedback: testimonial.feedback,
      rating: testimonial.rating,
      image_file: null
    });
    setIsDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Testimonial Management</h2>
          <p className="text-foreground/70">Manage client testimonials and feedback</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background border border-border max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg rounded-lg">
            <DialogHeader>
              <DialogTitle className="font-semibold">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name *</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                    required
                    className="border-input focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <Label htmlFor="client_email">Client Email</Label>
                  <Input
                    id="client_email"
                    type="email"
                    value={formData.client_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
                    className="border-input focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project_title">Project Title</Label>
                  <Input
                    id="project_title"
                    value={formData.project_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, project_title: e.target.value }))}
                    className="border-input focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                <Label htmlFor="rating">Rating *</Label>
                <div className="flex items-center space-x-1 mt-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className={`h-10 w-10 p-0 ${formData.rating >= star ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-muted hover:bg-muted/80'}`}
                    >
                      <Star className={`h-5 w-5 ${formData.rating >= star ? 'fill-current' : ''}`} />
                    </Button>
                  ))}
                </div>
              </div>
              </div>

              <div>
                <Label htmlFor="feedback">Testimonial Text *</Label>
                <Textarea
                  id="feedback"
                  value={formData.feedback}
                  onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
                  required
                  rows={4}
                  className="border-input focus:ring-2 focus:ring-primary/20"
                  placeholder="Share the client's feedback about your work..."
                />
              </div>

              <div>
                <Label htmlFor="image">Client Photo</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData(prev => ({ ...prev, image_file: e.target.files?.[0] || null }))}
                  className="border-input focus:ring-2 focus:ring-primary/20"
                />
                {editingTestimonial?.client_image_url && (
                  <p className="text-sm text-foreground/60 mt-1">Current photo will be replaced if new file is selected</p>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-input hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={uploading || !formData.client_name.trim() || !formData.feedback.trim()} 
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {uploading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      {editingTestimonial ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {testimonial.client_image_url ? (
                    <img
                      src={testimonial.client_image_url}
                      alt={testimonial.client_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-lg font-semibold">{testimonial.client_name}</CardTitle>
                    {testimonial.project_title && (
                      <p className="text-sm text-foreground/60">{testimonial.project_title}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline" onClick={() => openEditDialog(testimonial)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(testimonial.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-3">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-sm text-foreground/70">({testimonial.rating}/5)</span>
              </div>
              
              <blockquote className="text-sm text-foreground/80 italic mb-4 line-clamp-4">
                "{testimonial.feedback}"
              </blockquote>

              <div className="space-y-2 text-xs text-foreground/60">
                {testimonial.client_email && (
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {testimonial.client_email}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(testimonial.created_at || '').toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <Card className="border border-border bg-card shadow-sm">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Testimonials Yet</h3>
            <p className="text-foreground/60 mb-4">Start collecting client feedback to showcase your work</p>
            <Button onClick={() => setIsDialogOpen(true)} className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Testimonial
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestimonialManagement;
