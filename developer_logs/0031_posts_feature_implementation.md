# Posts Feature Implementation - 2024-05-15

## Overview
This document logs the implementation of the posts feature, which allows authenticated users to create, read, update, and delete posts with images and tags. The implementation includes database tables, storage buckets, and helper functions for efficient post retrieval.

## Database Structure

### Posts Table
1. **Core Fields**
   - `id`: UUID primary key with auto-generation
   - `user_id`: References auth.users with cascade delete
   - `title`: Required text field
   - `description`: Required text field
   - `image`: Required text field for image URL
   - `tags`: Array of text with default empty array
   - `created_at` and `updated_at`: Timestamps with timezone

2. **Performance Optimizations**
   - Index on `user_id` for faster user-based queries
   - Index on `created_at` DESC for efficient chronological ordering
   - GIN index on `tags` for efficient tag-based searches

3. **Automatic Timestamp Updates**
   - Trigger function to automatically update `updated_at`
   - Trigger on the posts table to maintain timestamps

### Storage Structure
1. **Post Images Bucket**
   - Created `post_images` bucket for storing post images
   - Public read access for all users
   - Authenticated user upload access
   - Owner-only update and delete access

## Security Implementation

### Row Level Security (RLS)
1. **Table Policies**
   - Public read access for all users
   - Authenticated user insert (with user_id check)
   - User-specific update and delete operations

2. **Storage Policies**
   - Public read access to post images
   - Authenticated user upload access
   - Owner-only update and delete access for images

## Helper Functions

### Latest Posts Function
1. **Purpose**
   - Efficiently fetch the most recent posts
   - Support pagination for better performance
   - Include user information in a single query

2. **Features**
   - Default limit of 10 posts
   - Configurable offset for pagination
   - Returns posts with user email information
   - Orders by created_at DESC (newest first)

### Posts by Tag Function
1. **Purpose**
   - Efficiently fetch posts containing a specific tag
   - Support pagination for better performance
   - Include user information in a single query

2. **Features**
   - Tag-based filtering using array containment
   - Default limit of 10 posts
   - Configurable offset for pagination
   - Returns posts with user email information
   - Orders by created_at DESC

## Technical Decisions

### Database Design
1. **Array Type for Tags**
   - Chose TEXT[] over separate tags table for simplicity
   - GIN index for efficient tag searching
   - Easier to maintain and query

2. **Direct User Reference**
   - Direct reference to auth.users instead of separate ownership table
   - Cascade delete for automatic cleanup
   - Simplified user-based queries

### Performance Considerations
1. **Indexing Strategy**
   - GIN index for efficient tag searching
   - B-tree index for chronological ordering
   - Index on user_id for user-based queries

2. **Query Optimization**
   - Single query for post and user information
   - Pagination support to prevent large result sets
   - Efficient tag searching using array containment

## Usage Examples

### Fetching Latest Posts
```typescript
const { data: latestPosts } = await supabase
  .rpc('get_latest_posts', { p_limit: 10, p_offset: 0 });
```

### Fetching Posts by Tag
```typescript
const { data: taggedPosts } = await supabase
  .rpc('get_posts_by_tag', { 
    p_tag: 'your-tag',
    p_limit: 10, 
    p_offset: 0 
  });
```

## Notes
- The implementation follows existing patterns in the codebase
- Security is maintained through RLS and storage policies
- Performance is optimized through proper indexing
- Helper functions simplify common query patterns
- Pagination support prevents performance issues with large datasets 