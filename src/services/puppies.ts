import { supabase } from '../utils/supabase';

export interface PuppiesSetting {
    id: string;
    setting_key: string;
    setting_value: string;
    description?: string;
    url?: string;
    status?: string;
    created_at: string;
    updated_at: string;
}

export interface PuppyPost {
    id: string;
    title: string;
    description: string;
    image: string;
    image_position?: number;
    tags: string[];
    created_at: string;
    updated_at: string;
}

export interface PuppiesStatus {
    expectedDate: string | null;
    listingUrl: string | null;
    displayStatus: 'active' | 'inactive' | 'hidden';
}

/**
 * Fetches the expected date for next puppies from settings
 */
export const getNextExpectedDate = async (): Promise<string | null> => {
    try {
        const { data, error } = await supabase
            .from('puppies_settings')
            .select('setting_value')
            .eq('setting_key', 'next_expected_date')
            .single();

        if (error) {
            console.error('Error fetching next expected date:', error);
            return null;
        }

        return data?.setting_value || null;
    } catch (error) {
        console.error('Error fetching next expected date:', error);
        return null;
    }
};

/**
 * Fetches the complete puppies status including date, URL, and display status
 */
export const getPuppiesStatus = async (): Promise<PuppiesStatus> => {
    try {
        const { data, error } = await supabase
            .from('puppies_settings')
            .select('setting_key, setting_value')
            .in('setting_key', ['next_expected_date', 'puppy_listing_url', 'display_status']);

        if (error) {
            console.error('Error fetching puppies status:', error);
            return {
                expectedDate: null,
                listingUrl: null,
                displayStatus: 'hidden'
            };
        }

        const statusMap = data?.reduce((acc, item) => {
            acc[item.setting_key] = item.setting_value;
            return acc;
        }, {} as Record<string, string>) || {};

        return {
            expectedDate: statusMap.next_expected_date || null,
            listingUrl: statusMap.puppy_listing_url || null,
            displayStatus: (statusMap.display_status as 'active' | 'inactive' | 'hidden') || 'hidden'
        };
    } catch (error) {
        console.error('Error fetching puppies status:', error);
        return {
            expectedDate: null,
            listingUrl: null,
            displayStatus: 'hidden'
        };
    }
};

/**
 * Updates the expected date for next puppies (admin only)
 */
export const updateNextExpectedDate = async (date: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('puppies_settings')
            .update({ setting_value: date })
            .eq('setting_key', 'next_expected_date');

        if (error) {
            console.error('Error updating next expected date:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error updating next expected date:', error);
        return false;
    }
};

/**
 * Updates the puppy listing URL (admin only)
 */
export const updatePuppyListingUrl = async (url: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('puppies_settings')
            .update({ setting_value: url })
            .eq('setting_key', 'puppy_listing_url');

        if (error) {
            console.error('Error updating puppy listing URL:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error updating puppy listing URL:', error);
        return false;
    }
};

/**
 * Updates the display status (admin only)
 */
export const updateDisplayStatus = async (status: 'active' | 'inactive' | 'hidden'): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('puppies_settings')
            .update({ setting_value: status })
            .eq('setting_key', 'display_status');

        if (error) {
            console.error('Error updating display status:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error updating display status:', error);
        return false;
    }
};

/**
 * Updates multiple puppies settings at once (admin only)
 */
export const updatePuppiesSettings = async (settings: {
    expectedDate?: string;
    listingUrl?: string;
    displayStatus?: 'active' | 'inactive' | 'hidden';
}): Promise<boolean> => {
    try {
        const updates = [];

        if (settings.expectedDate !== undefined) {
            updates.push(
                supabase
                    .from('puppies_settings')
                    .update({ setting_value: settings.expectedDate })
                    .eq('setting_key', 'next_expected_date')
            );
        }

        if (settings.listingUrl !== undefined) {
            updates.push(
                supabase
                    .from('puppies_settings')
                    .update({ setting_value: settings.listingUrl })
                    .eq('setting_key', 'puppy_listing_url')
            );
        }

        if (settings.displayStatus !== undefined) {
            updates.push(
                supabase
                    .from('puppies_settings')
                    .update({ setting_value: settings.displayStatus })
                    .eq('setting_key', 'display_status')
            );
        }

        const results = await Promise.all(updates);
        const hasErrors = results.some(result => result.error);

        if (hasErrors) {
            console.error('Error updating puppies settings');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error updating puppies settings:', error);
        return false;
    }
};

/**
 * Fetches all posts tagged with 'hvalpe' for the gallery
 */
export const getPuppyPosts = async (): Promise<PuppyPost[]> => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .contains('tags', ['hvalpe'])
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching puppy posts:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching puppy posts:', error);
        return [];
    }
};

/**
 * Formats a date string for display (DD/MM/YYYY)
 */
export const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
};

/**
 * Validates if a URL is properly formatted
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}; 