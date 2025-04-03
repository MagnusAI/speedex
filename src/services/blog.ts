import { supabase } from '../lib/supabase'
import { BlogPost, BlogPostFormData } from '../types/blog'

export const createBlogPost = async (data: BlogPostFormData): Promise<BlogPost> => {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .insert([
      {
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        tags: data.tags || []
      }
    ])
    .select()
    .single()

  if (error) throw error
  return post
}

export const updateBlogPost = async (id: string, data: BlogPostFormData): Promise<BlogPost> => {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .update({
      title: data.title,
      content: data.content,
      image_url: data.image_url,
      tags: data.tags || []
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return post
}

export const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const getBlogPost = async (id: string): Promise<BlogPost> => {
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select()
    .eq('id', id)
    .single()

  if (error) throw error
  return post
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select()
    .order('created_at', { ascending: false })

  if (error) throw error
  return posts
} 