# Speedex Developer Log

## Project Overview
Speedex is a React-based website for a dog breeding kennel, featuring a modern UI with Material-UI components and client-side routing. The application is designed to showcase dogs, blog posts, and provide information about the kennel.

## Tech Stack
- **Frontend Framework**: React with TypeScript
- **UI Library**: Material-UI (MUI) v7
- **Routing**: React Router with HashRouter (for GitHub Pages compatibility)
- **Backend/Database**: Supabase
- **Authentication**: Supabase Auth
- **Deployment**: GitHub Pages
- **Version Control**: Git/GitHub

## Project Structure
```
speedex/
├── src/
│   ├── components/         # React components
│   ├── contexts/          # React contexts (Auth, etc.)
│   ├── types/            # TypeScript type definitions
│   └── App.tsx           # Main application component
├── supabase/
│   ├── migrations/       # Database migrations
│   └── seed.sql         # Seed data
└── public/              # Static assets
```

## Database Schema (Supabase)

### Tables

#### blog_posts
- `id`: uuid (primary key)
- `title`: text
- `content`: text
- `image_url`: text
- `author`: text
- `tags`: text[]
- `created_at`: timestamp with time zone
- `updated_at`: timestamp with time zone

#### dogs
- `id`: uuid (primary key)
- `name`: text
- `breed`: text
- `gender`: text
- `color`: text
- `birth_date`: date
- `image_url`: text
- `description`: text
- `family_tree`: jsonb
- `created_at`: timestamp with time zone
- `updated_at`: timestamp with time zone

### Storage Buckets
- `blog-images`: For blog post images
- `dog-images`: For dog profile images

## Security Policies (Supabase)

### Blog Posts
- Public read access
- Authenticated users can create, update, and delete posts
- Row Level Security (RLS) enabled

### Dogs
- Public read access
- Authenticated users can create, update, and delete dogs
- Row Level Security (RLS) enabled

### Storage
- Public read access for images
- Authenticated users can upload and delete images
- Bucket policies for size and type restrictions

## Features Implemented

### 1. Authentication System
- User sign-in/sign-up functionality
- Protected routes for admin features
- Persistent authentication state
- Sign-out functionality

### 2. Blog System
- Blog post listing with cards
- Individual post view with image gallery
- Admin controls for creating, editing, and deleting posts
- Image upload support
- Tag management

### 3. Dog Management
- Dog listing with cards
- Individual dog view
- Admin controls for managing dogs
- Family tree tracking
- Image upload support

### 4. Navigation
- Responsive drawer navigation
- Mobile-friendly design
- Hash-based routing for GitHub Pages compatibility

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React functional component patterns
- Use Material-UI components for consistent styling
- Implement proper error handling
- Use React hooks for state management

### Component Structure
- Keep components modular and reusable
- Use proper prop typing
- Implement loading states
- Handle error states gracefully
- Use proper semantic HTML

### State Management
- Use React Context for global state (Auth)
- Use local state for component-specific data
- Implement proper loading and error states
- Use proper data fetching patterns

### Routing
- Use hash-based routing for GitHub Pages compatibility
- Implement proper route protection
- Handle 404 cases
- Use proper navigation patterns

### Database
- Use migrations for schema changes
- Implement proper RLS policies
- Use TypeScript types for database entities
- Handle database errors gracefully

## Deployment

### GitHub Pages Setup
- Use hash-based routing
- Configure proper base URL
- Handle 404 redirects
- Optimize for static hosting

### Environment Variables
Required environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Future Features
1. Image gallery improvements
2. Advanced filtering for dogs
3. Search functionality
4. Contact form
5. Newsletter subscription
6. Social media integration

## Known Issues
1. Hash routing warnings in development
2. Image upload size restrictions
3. Mobile responsiveness improvements needed

## Maintenance Tasks
1. Regular dependency updates
2. Database backup verification
3. Performance optimization
4. Security audits
5. SEO improvements

## Documentation Updates
This log will be updated as new features are implemented or significant changes are made to the project structure or guidelines. 