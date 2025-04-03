import { Dog } from './dog'

export interface BlogPost {
  id: string
  title: string
  content: string
  image_url: string | null
  tags: string[]
  created_at: string
  updated_at: string
}

export interface BlogPostFormData {
  title: string
  content: string
  image_url: string | null
  tags: string[]
} 