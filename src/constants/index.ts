// App-wide constants
export const APP_NAME = 'Kennel Speedex';

// Navigation routes
export const ROUTES = {
  HOME: '/',
  DOGS: '/dogs',
  DOGS_ADD: '/dogs/add',
  DOGS_EDIT: (id: string) => `/dogs/${id}/edit`,
  DOGS_EDIT_ANCESTRY: (id: string) => `/dogs/${id}/edit-ancestry`,
  DOG_DETAILS: (id: string) => `/dogs/${id}`,
  POSTS: '/posts',
  PUPPIES: '/puppies',
  LOGIN: '/login',
} as const;

// Contact information
export const CONTACT = {
  EMAIL: 'tinearnild@hotmail.com',
  FACEBOOK_URL: 'https://www.facebook.com/KennelSpeedex',
  DKK_URL: 'https://dkk.dk',
} as const;

// Image paths
export const IMAGES = {
  HERO: './dogs/images/dogs_bubbles_169.png',
  DKK_LOGO: '/speedex/dkk-uddannet.png',
  FACEBOOK_LOGO: '/speedex/facebook-logo.svg',
  PLACEHOLDER: 'https://placehold.co/400x400?text=No+Photo+Available',
} as const;

// UI constants
export const UI = {
  HERO_HEIGHT: '360px',
  HERO_MAX_WIDTH: '720px',
  DOG_CARD_IMAGE_HEIGHT: '200px',
  TOUCH_TARGET_SIZE: '44px',
  MAX_CONTENT_WIDTH: '1052px',
  DEFAULT_POSTS_LIMIT: 3,
} as const;

// Database constants
export const DATABASE = {
  TABLES: {
    DOGS: 'dogs',
    POSTS: 'posts',
    ANCESTORS: 'ancestors',
  },
  STORAGE: {
    DOG_IMAGES: 'dog-images',
    POST_IMAGES: 'post-images',
    ANCESTOR_IMAGES: 'ancestor-images',
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  FETCH_DOGS_FAILED: 'Failed to fetch dogs',
  FETCH_POSTS_FAILED: 'Failed to load posts. Please try again later.',
  AUTH_REQUIRED: 'Authentication required',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  DOG_CREATED: 'Dog created successfully',
  DOG_UPDATED: 'Dog updated successfully',
  DOG_DELETED: 'Dog deleted successfully',
  POST_CREATED: 'Post created successfully',
  POST_UPDATED: 'Post updated successfully',
  POST_DELETED: 'Post deleted successfully',
} as const;

// Form validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 2000,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;