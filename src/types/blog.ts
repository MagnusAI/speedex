export interface BlogPostImage {
  id: string;
  blog_post_id: string;
  image_url: string;
  caption?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  blog_post_images: BlogPostImage[];
}

export interface BlogPostFormData {
  title: string;
  content: string;
  images: {
    file?: File;
    url?: string;
    caption?: string;
    display_order: number;
  }[];
  tags: string[];
} 