# Supabase Setup

This directory contains the database migrations and seed data for the Speedex Kennels website.

## Structure

- `migrations/` - Contains SQL migration files that set up the database schema and security policies
- `seed.sql` - Contains initial data to populate the database

## Setup Instructions

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Push the migrations:
   ```bash
   supabase db push
   ```

5. (Optional) Reset the database and apply migrations with seed data:
   ```bash
   supabase db reset
   ```

## Database Schema

The `blog_posts` table has the following structure:
- `id`: UUID (primary key)
- `created_at`: Timestamp with timezone
- `title`: Text (required)
- `content`: Text (required)
- `image_url`: Text (optional)
- `author`: Text (required)
- `tags`: Text array

## Security Policies

The following Row Level Security (RLS) policies are in place:
- Public read access for all users
- Authenticated users can create posts
- Authenticated users can update their own posts
- Authenticated users can delete their own posts 