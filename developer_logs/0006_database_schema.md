# Database Schema Documentation

## Date
2024-03-20

## Type
Database Schema

## Description
Documentation of the current database schema in Supabase, including tables, relationships, and security policies.

## Tables

### dogs
Primary table for storing dog information:
- `id`: Auto-incrementing primary key
- `name`: Dog's name (required)
- `breed`: Dog's breed (required)
- `description`: Optional description
- `image`: URL to dog's image
- `age`: Dog's age
- `created_at`: Timestamp of record creation
- `updated_at`: Timestamp of last update

### dog_parents
Stores parent-child relationships:
- `id`: Auto-incrementing primary key
- `dog_id`: Reference to child dog (required)
- `father_id`: Reference to father dog
- `mother_id`: Reference to mother dog
- `created_at`: Timestamp of record creation
- `updated_at`: Timestamp of last update
- Unique constraint on `dog_id`

### dog_siblings
Stores sibling relationships:
- `id`: Auto-incrementing primary key
- `dog_id`: Reference to first dog
- `sibling_id`: Reference to sibling dog
- `created_at`: Timestamp of record creation
- Unique constraint on `dog_id`, `sibling_id` pair

### dog_offspring
Stores offspring relationships:
- `id`: Auto-incrementing primary key
- `dog_id`: Reference to parent dog
- `offspring_id`: Reference to offspring dog
- `created_at`: Timestamp of record creation
- Unique constraint on `dog_id`, `offspring_id` pair

### dog_achievements
Stores dog achievements:
- `id`: Auto-incrementing primary key
- `dog_id`: Reference to dog
- `title`: Achievement title (required)
- `date`: Achievement date (required)
- `description`: Optional description
- `created_at`: Timestamp of record creation
- `updated_at`: Timestamp of last update

## Indexes
- `idx_dogs_breed`: On dogs(breed)
- `idx_dog_parents_dog_id`: On dog_parents(dog_id)
- `idx_dog_parents_father_id`: On dog_parents(father_id)
- `idx_dog_parents_mother_id`: On dog_parents(mother_id)
- `idx_dog_siblings_dog_id`: On dog_siblings(dog_id)
- `idx_dog_siblings_sibling_id`: On dog_siblings(sibling_id)
- `idx_dog_offspring_dog_id`: On dog_offspring(dog_id)
- `idx_dog_offspring_offspring_id`: On dog_offspring(offspring_id)
- `idx_dog_achievements_dog_id`: On dog_achievements(dog_id)

## Security
- Row Level Security (RLS) enabled on all tables
- Public read access allowed for all tables
- Authenticated users can:
  - Insert new dogs
  - Select all dogs
  - Update their own dogs
  - Delete their own dogs

## Triggers
- Automatic `updated_at` timestamp updates on:
  - dogs table
  - dog_parents table
  - dog_achievements table

## Status
Active

## Notes
- All tables include audit fields (created_at, updated_at)
- Relationships are enforced through foreign key constraints
- Cascade deletion is enabled for child records
- Indexes are created for performance optimization 