import { supabase } from '../lib/supabase'
import { BlogPost, BlogPostFormData, BlogPostImage } from '../types/blog'

const uploadImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  return publicUrl;
};

const uploadImages = async (images: BlogPostFormData['images']): Promise<BlogPostImage[]> => {
  const uploadedImages: BlogPostImage[] = [];

  for (const image of images) {
    if (image.file) {
      const imageUrl = await uploadImage(image.file);
      uploadedImages.push({
        id: '', // Will be set by the database
        blog_post_id: '', // Will be set when creating the post
        image_url: imageUrl,
        caption: image.caption,
        display_order: image.display_order,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } else if (image.url) {
      uploadedImages.push({
        id: '', // Will be set by the database
        blog_post_id: '', // Will be set when creating the post
        image_url: image.url,
        caption: image.caption,
        display_order: image.display_order,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  }

  return uploadedImages;
};

export const createBlogPost = async (data: BlogPostFormData): Promise<BlogPost> => {
  // First create the blog post
  const { data: post, error: postError } = await supabase
    .from('blog_posts')
    .insert([
      {
        title: data.title,
        content: data.content,
        tags: data.tags || [],
        author: data.author || 'Anonymous'
      }
    ])
    .select()
    .single();

  if (postError) throw postError;

  // Then upload and create the images
  if (data.images && data.images.length > 0) {
    const uploadedImages = await uploadImages(data.images);
    
    const { error: imageError } = await supabase
      .from('blog_post_images')
      .insert(
        uploadedImages.map(image => ({
          ...image,
          blog_post_id: post.id
        }))
      );

    if (imageError) throw imageError;
  }

  // Fetch the complete post with images
  const { data: completePost, error: fetchError } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_post_images!blog_post_id(*)
    `)
    .eq('id', post.id)
    .single();

  if (fetchError) throw fetchError;

  return completePost;
};

export const updateBlogPost = async (id: string, data: BlogPostFormData): Promise<BlogPost> => {
  // First update the blog post
  const { error: postError } = await supabase
    .from('blog_posts')
    .update({
      title: data.title,
      content: data.content,
      tags: data.tags || [],
      author: data.author || 'Anonymous'
    })
    .eq('id', id);

  if (postError) throw postError;

  // Delete existing images
  const { error: deleteError } = await supabase
    .from('blog_post_images')
    .delete()
    .eq('blog_post_id', id);

  if (deleteError) throw deleteError;

  // Upload and create new images
  if (data.images && data.images.length > 0) {
    const uploadedImages = await uploadImages(data.images);
    
    const { error: imageError } = await supabase
      .from('blog_post_images')
      .insert(
        uploadedImages.map(image => ({
          ...image,
          blog_post_id: id
        }))
      );

    if (imageError) throw imageError;
  }

  // Fetch the complete post with images
  const { data: completePost, error: fetchError } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_post_images!blog_post_id(*)
    `)
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  return completePost;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  // Delete the post (images will be deleted automatically due to CASCADE)
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getBlogPost = async (id: string): Promise<BlogPost> => {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_post_images!blog_post_id(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return post;
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_post_images!blog_post_id(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return posts;
}; 