# Supabase Setup

This directory contains the database migrations and seed data for the Speedex Kennels website.

## Structure

- `migrations/` - Contains SQL migration files that set up the database schema and security policies

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