# Image Position Adjustment Feature - 2024-05-15

## Overview
This document logs the implementation of the image position adjustment feature, which allows users to preview and adjust the vertical position of images in post cards before submission. This ensures that the most important parts of images are visible in the fixed-height card layout.

## Implementation Details

### Components
1. **ImagePreview Component**
   - Shows how the image will look in the PostCard
   - Fixed height of 300px to match PostCard
   - Fixed width of 460px to match PostCard
   - Slider control for vertical position adjustment
   - Real-time preview of adjustments
   - Smooth transitions for position changes
   - Border and shadow for better visibility
   - Maintains aspect ratio while allowing translation
   - Shows full image in preview area
   - Supports initial position value for editing

2. **PostCard Component**
   - Uses image position for display
   - Fixed maxOffset of 200px for consistent range
   - Smooth transitions for position changes
   - Maintains aspect ratio and cover fit
   - Fallback to center position if not set

3. **EditPostForm Component**
   - Reuses ImagePreview component
   - Loads and displays existing image position
   - Allows adjusting position of existing images
   - Maintains position when updating post
   - Proper image upload and replacement handling

### Database Changes
- Added `image_position` column to posts table
- Default value of 50 (centered)
- Range of 0-100 for position control
- Added descriptive comment for documentation

## Technical Implementation

### ImagePreview Component
```typescript
interface ImagePreviewProps {
    imageUrl: string;
    onPositionChange?: (position: number) => void;
    initialPosition?: number;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
    imageUrl, 
    onPositionChange,
    initialPosition = 50 
}) => {
    const [position, setPosition] = useState(initialPosition);
    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);

    // Calculate transform value based on position
    const getTransformValue = () => {
        if (!imageHeight) return 'translateY(0)';
        const maxOffset = 200; // Match PostCard's maxOffset
        const offset = (maxOffset * (position - 50)) / 50;
        return `translateY(${offset}px)`;
    };

    // Calculate image style based on dimensions
    const getImageStyle = (): CSSProperties => {
        if (!imageHeight || !imageWidth) return {};

        const aspectRatio = imageWidth / imageHeight;
        const containerWidth = 460;
        const width = containerWidth;
        const height = width / aspectRatio;

        return {
            width: `${width}px`,
            height: `${height}px`,
            objectFit: 'cover',
            transform: getTransformValue(),
            transition: 'transform 0.2s ease-in-out'
        };
    };
};
```

### PostCard Implementation
```typescript
const getTransformValue = () => {
    if (!image) return 'translateY(0)';
    const maxOffset = 200;
    const offset = (maxOffset * (image_position - 50)) / 50;
    return `translateY(${offset}px)`;
};
```

## Technical Decisions

### Position Range
1. **0-100 Scale**
   - 0: Top of image
   - 50: Center of image (default)
   - 100: Bottom of image
   - Intuitive for users
   - Easy to understand percentage

2. **Fixed Offset Range**
   - Set to 200px for consistent behavior
   - Same range in preview and PostCard
   - Prevents excessive movement
   - Ensures preview matches final display

### Preview Implementation
1. **Real-time Preview**
   - Shows exact card appearance
   - Immediate feedback on adjustments
   - Matches final display
   - Helps users make better decisions
   - Border and shadow for better visibility

2. **Aspect Ratio Handling**
   - Maintains image proportions
   - Shows full image in preview
   - Prevents distortion
   - Allows proper translation
   - Matches PostCard display

3. **State Management**
   - Position stored with post
   - Preview URL management
   - Clean state reset
   - Proper cleanup on unmount
   - Initial position support for editing

## User Experience
1. **Intuitive Controls**
   - Slider for easy adjustment
   - Real-time preview
   - Clear visual feedback
   - Smooth transitions
   - Consistent range of movement

2. **Preview Benefits**
   - See final appearance before posting
   - Adjust focus on important elements
   - Ensure proper image framing
   - Better post quality
   - Exact match with PostCard display

3. **Edit Form Integration**
   - Loads existing position
   - Maintains position during edit
   - Smooth position adjustments
   - Consistent preview behavior
   - Proper image replacement

## Notes
- Implementation maintains existing card design
- Smooth transitions for better UX
- Proper cleanup of preview URLs
- Maintains aspect ratio and image quality
- Helps users create better-looking posts
- Consistent with existing UI patterns
- Improves overall post quality
- Better control over image presentation
- Fixed offset range prevents excessive movement
- Preview matches PostCard exactly
- Border and shadow improve preview visibility
- Full image visible during position adjustment
- Proper aspect ratio maintenance
- Seamless edit form integration

### Database Migration
```sql
ALTER TABLE posts ADD COLUMN image_position INTEGER DEFAULT 50;
COMMENT ON COLUMN posts.image_position IS 'Vertical position of the image in the post card (0-100, default 50)';
``` 