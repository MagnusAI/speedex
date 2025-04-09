import { supabase } from '../lib/supabase';
import { Dog } from '../types/dog';

export const dogService = {
  async getDogs(): Promise<Dog[]> {
    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching dogs:', error);
      throw error;
    }

    return data || [];
  },

  async getDogById(id: number): Promise<Dog | null> {
    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching dog:', error);
      throw error;
    }

    return data;
  },

  async createDog(dog: Omit<Dog, 'id'>): Promise<Dog> {
    const { data, error } = await supabase
      .from('dogs')
      .insert(dog)
      .select()
      .single();

    if (error) {
      console.error('Error creating dog:', error);
      throw error;
    }

    return data;
  },

  async updateDog(id: number, dog: Partial<Dog>): Promise<Dog> {
    const { data, error } = await supabase
      .from('dogs')
      .update(dog)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating dog:', error);
      throw error;
    }

    return data;
  },

  async deleteDog(id: number): Promise<void> {
    const { error } = await supabase
      .from('dogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting dog:', error);
      throw error;
    }
  }
}; 