# Ancestry Image Upload Implementation - 2024-04-22

## Overview
This document logs the implementation of image upload functionality for ancestors in the ancestry edit form. The feature allows users to upload, view, and manage profile images for each ancestor in the family tree, enhancing the visual representation of ancestry data.

## Implementation Details

### Supabase Storage Bucket Setup
1. **Created dedicated storage bucket**
   - Created a new storage bucket called 'ancestor-images'
   - Set up proper security policies for public reading and authenticated uploads
   - Added appropriate access control for authenticated users
   - Added database migration to ensure consistent deployment

### Image Upload Implementation
1. **UI Components**
   - Added Ant Design Upload component with picture-card display
   - Implemented image preview for existing images
   - Added upload button with proper loading states
   - Included file validation for type and size (JPG/PNG, under 2MB)

2. **State Management**
   - Implemented clean state management for tracking uploads
   - Added fileList state to track uploaded files per ancestor
   - Implemented uploading state to show loading indicators
   - Properly initialized fileList from existing data

3. **Upload Process**
   - Implemented direct upload to Supabase storage
   - Generated unique filenames with ancestor prefix
   - Properly handled file upload errors
   - Updated form state with image URLs after successful upload
   - Added proper cleanup when images are removed

4. **Form Integration**
   - Used hidden form field to store image URLs
   - Ensured proper form submission with image URLs
   - Maintained original image when no new upload is performed
   - Properly cleared image URLs when uploads are removed

### Database Structure Understanding
1. **Ancestors Table Schema**
   - Primary key is a UUID (`id`) auto-generated in the database
   - `dog_id` is a foreign key to `dogs.id` (references the dog this ancestor belongs to)
   - `ancestor_id` stores the ancestor's registration ID (not a foreign key)
   - `relation` defines the relationship type (e.g., mother, father, mothers_mother, etc.)
   - Added columns for ancestor details:
     - `name` - The ancestor's name
     - `profile_image_url` - URL to the ancestor's profile image
     - `champion_titles` - Array of titles the ancestor has earned

2. **Ancestor Relationships Model**
   - All ancestors are attached to the single main dog via dog_id
   - The relationship is encoded in the relation field, not in the table structure
   - Direct parents use relation values 'mother' and 'father'
   - Grandparents use compound relations like 'mothers_mother', 'fathers_father'
   - Great-grandparents use longer compound relations like 'mothers_mothers_mother'
   - This flat structure allows all ancestors to be stored in a single table
   - The relationship tree is constructed by interpreting the relation field values

3. **Data Integrity**
   - All ancestors reference a single dog (the main dog being viewed)
   - No creation of placeholder dogs is needed
   - The ancestor_id field stores the registration ID but isn't used as a foreign key
   - Clear naming conventions in the relation field enable building the family tree
   - This structure allows for a simpler data model while maintaining relationship clarity

## Technical Decisions
1. **Upload Handling**
   - Used customRequest to handle Ant Design Upload component
   - Implemented manual upload to have better control over the process
   - Used separate upload handler to maintain clean code structure
   - Added proper validation before upload to prevent invalid files

2. **Storage Structure**
   - Used ancestor-specific prefixes for filenames
   - Added timestamps to ensure unique filenames
   - Used structured path in storage bucket
   - Maintained public URLs for easy display

3. **Error Handling**
   - Added proper error handling for upload failures
   - Displayed user-friendly error messages
   - Added console logs for debugging
   - Properly tracked loading states during uploads
   - Added validation to prevent incorrect data submissions

## Notes
- The image upload functionality enhances the visual aspect of the ancestry form
- Images are stored in a dedicated bucket with appropriate security policies
- The implementation follows the same patterns used in the dog image uploads
- UI provides clear feedback during the upload process
- Error handling ensures a smooth user experience even when issues occur
- All ancestors are attached to a single dog record, with relationships defined by the relation field
- This approach simplifies the database structure while maintaining a clear ancestral hierarchy 