import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabase';
import { DATABASE, ERROR_MESSAGES, UI } from '@/constants';

interface Post {
  id: string;
  title: string;
  description: string;
  image: string | null;
  image_position?: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

interface UsePostsReturn {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  refetch: (searchTag?: string) => Promise<void>;
}

interface UsePostsOptions {
  enabled?: boolean;
  tags?: string | string[];
  limit?: number;
  orderBy?: 'created_at' | 'title';
  ascending?: boolean;
}

export const usePosts = (options: UsePostsOptions = {}): UsePostsReturn => {
  const { 
    enabled = true, 
    tags, 
    limit,
    orderBy = 'created_at', 
    ascending = false 
  } = options;
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (searchTag?: string) => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);

      let query = supabase
        .from(DATABASE.TABLES.POSTS)
        .select('*')
        .order(orderBy, { ascending });

      // Apply tag filtering
      const finalTags = searchTag || tags;
      if (finalTags) {
        if (typeof finalTags === 'string') {
          // Handle search string with multiple tags
          const tagArray = finalTags.split(',').map(t => t.trim()).filter(t => t);
          if (tagArray.length > 0) {
            query = query.or(tagArray.map(t => `tags.cs.{${t}}`).join(','));
          }
        } else {
          // Handle array of tags
          const lowercaseTagArray = finalTags.map(tag => tag.toLowerCase());
          query = query.overlaps('tags', lowercaseTagArray);
        }
      }

      // Apply limit if specified
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setPosts(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.FETCH_POSTS_FAILED;
      setError(errorMessage);
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, tags, limit, orderBy, ascending]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    error,
    refetch: fetchPosts,
  };
};

// Hook specifically for recent posts
export const useRecentPosts = (limit: number = UI.DEFAULT_POSTS_LIMIT) => {
  return usePosts({
    limit,
    orderBy: 'created_at',
    ascending: false,
  });
};

// Hook for posts with specific tags
export const usePostsByTags = (tags: string | string[]) => {
  return usePosts({
    tags,
    orderBy: 'created_at',
    ascending: false,
  });
};