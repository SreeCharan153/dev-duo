import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Upload, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Project = Tables<'projects'>;

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web',
    project_url: '',
    technologies: [] as string[],
    image_file: null as File | null
  });

  const categories = [
    { value: 'web', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'desktop', label: 'Desktop Application' },
    { value: 'ai', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'other', label: 'Other' }
  ];

  const commonTechnologies = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 
    'Django', 'Flask', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 
    'Kubernetes', 'GraphQL', 'REST API', 'Tailwind CSS', 'Material UI'
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `projects/${fileName}`;

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
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setUploading(true);

    try {
      let imageUrl = editingProject?.image_url || null;

      if (formData.image_file) {
        imageUrl = await uploadImage(formData.image_file);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        project_url: formData.project_url.trim() || null,
        technologies: formData.technologies,
        image_url: imageUrl
      };

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        
        // Update local state immediately
        setProjects(prev => prev.map(p => 
          p.id === editingProject.id ? { ...p, ...projectData } : p
        ));
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert([projectData])
          .select();

        if (error) throw error;
        
        // Add to local state immediately
        if (data && data[0]) {
          setProjects(prev => [data[0], ...prev]);
        }
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert(`Error saving project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update local state immediately
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project. Please try again.');
      // Refresh on error to ensure consistency
      await fetchProjects();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'web',
      project_url: '',
      technologies: [],
      image_file: null
    });
    setEditingProject(null);
  };

  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      project_url: project.project_url || '',
      technologies: project.technologies || [],
      image_file: null
    });
    setIsDialogOpen(true);
  };

  const handleTechnologyToggle = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
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
          <h2 className="text-2xl font-bold cyber-text">Project Management</h2>
          <p className="text-foreground/70">Manage your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="cyber-text">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="neon-border"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="neon-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="neon-border"
                />
              </div>

              <div>
                <Label htmlFor="project_url">Project URL</Label>
                <Input
                  id="project_url"
                  type="url"
                  value={formData.project_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_url: e.target.value }))}
                  placeholder="https://..."
                  className="neon-border"
                />
              </div>

              <div>
                <Label htmlFor="image">Project Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData(prev => ({ ...prev, image_file: e.target.files?.[0] || null }))}
                  className="neon-border"
                />
                {editingProject?.image_url && (
                  <p className="text-sm text-foreground/60 mt-1">Current image will be replaced if new file is selected</p>
                )}
              </div>

              <div>
                <Label>Technologies</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {commonTechnologies.map((tech) => (
                    <Button
                      key={tech}
                      type="button"
                      variant={formData.technologies.includes(tech) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTechnologyToggle(tech)}
                      className="justify-start"
                    >
                      {tech}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={uploading || !formData.title.trim() || !formData.description.trim()} 
                  className="btn-gradient"
                >
                  {uploading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      {editingProject ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      {editingProject ? 'Update Project' : 'Create Project'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="glass-card admin-card hover:shadow-neon transition-all duration-300">
            <CardHeader className="pb-3">
              {project.image_url && (
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg cyber-text">{project.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    <Tag className="w-3 h-3 mr-1" />
                    {categories.find(c => c.value === project.category)?.label || project.category}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline" onClick={() => openEditDialog(project)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-foreground/60">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(project.created_at || '').toLocaleDateString()}
                </div>
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
            <p className="text-foreground/60 mb-4">Start building your portfolio by adding your first project</p>
            <Button onClick={() => setIsDialogOpen(true)} className="btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectManagement;
