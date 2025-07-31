import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabase';
import { DATABASE, ERROR_MESSAGES } from '@/constants';
import type { Dog } from '@/types/dog';

interface UseDogsReturn {
  dogs: Dog[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseDogsOptions {
  enabled?: boolean;
  orderBy?: 'created_at' | 'name';
  ascending?: boolean;
}

export const useDogs = (options: UseDogsOptions = {}): UseDogsReturn => {
  const { enabled = true, orderBy = 'created_at', ascending = false } = options;
  
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const fetchDogs = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from(DATABASE.TABLES.DOGS)
        .select('*')
        .order(orderBy, { ascending });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setDogs(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.FETCH_DOGS_FAILED;
      setError(errorMessage);
      console.error('Error fetching dogs:', err);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, orderBy, ascending]);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return {
    dogs,
    isLoading,
    error,
    refetch: fetchDogs,
  };
};

// Hook for fetching a single dog
interface UseDogReturn {
  dog: Dog | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDog = (id: string | undefined): UseDogReturn => {
  const [dog, setDog] = useState<Dog | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  const fetchDog = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const decodedId = decodeURIComponent(id);
      const { data, error: supabaseError } = await supabase
        .from(DATABASE.TABLES.DOGS)
        .select('*')
        .eq('id', decodedId)
        .single();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setDog(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.FETCH_DOGS_FAILED;
      setError(errorMessage);
      console.error('Error fetching dog:', err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDog();
  }, [fetchDog]);

  return {
    dog,
    isLoading,
    error,
    refetch: fetchDog,
  };
};