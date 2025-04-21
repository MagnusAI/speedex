# Ancestors Table Implementation

## Overview
Implemented a new `ancestors` table to support the Ancestry Tree feature, enabling proper storage and retrieval of dog ancestry relationships. The table is designed to maintain referential integrity while allowing efficient querying of ancestry data.

## Implementation Details

### Table Structure
- Created `ancestors` table with UUID primary key
- Established foreign key relationship with `dogs` table using `dog_id`
- Added `ancestor_id` field to store registration IDs of ancestors
- Included `relation` field to specify the relationship type (e.g., "mother", "father")
- Implemented timestamps for tracking creation and updates
- Added unique constraint to prevent duplicate relationships

### Performance Optimization
- Created indexes on `dog_id` and `ancestor_id` for faster queries
- Implemented automatic timestamp updates via trigger
- Used UUID for primary key to ensure uniqueness across distributed systems

### Security
- Enabled Row Level Security (RLS)
- Implemented policies for authenticated users:
  - Read access to view ancestry data
  - Write access to add/update relationships
  - Delete access to remove relationships

### Data Integrity
- Added ON DELETE CASCADE to maintain referential integrity
- Implemented unique constraint to prevent duplicate relationships
- Used timestamps with timezone for accurate tracking

## Technical Decisions

### Primary Key Choice
- Used UUID instead of registration ID to allow multiple instances of the same ancestor
- Ensures uniqueness across the entire system
- Supports future scaling and distributed systems

### Relationship Management
- One-to-many relationship between dogs and ancestors
- Flexible relation field to support various relationship types
- Maintains data integrity through foreign key constraints

### Security Model
- Row Level Security for fine-grained access control
- Authenticated-only access to maintain data privacy
- Separate policies for different operations

## Features Implemented
1. Ancestors table with proper relationships
2. Indexes for performance optimization
3. RLS policies for security
4. Automatic timestamp management
5. Data integrity constraints

## Notes
- Table structure supports future expansion of relationship types
- Performance optimizations in place for large datasets
- Security model aligned with existing authentication system
- Maintains compatibility with existing dog table structure 