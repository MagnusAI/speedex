# Image Position Adjustment Feature - 2024-05-15

## Overview
This document logs the implementation of the image position adjustment feature, which allows users to preview and adjust the vertical position of images in post cards before submission. This ensures that the most important parts of images are visible in the fixed-height card layout.

## Implementation Details

### New Components
1. **ImagePreview Component**
   - Shows how the image will look in the PostCard
   - Fixed height of 300px to match PostCard
   - Fixed width of 460px to match PostCard
   - Slider control for vertical position adjustment
   - Real-time preview of adjustments
   - Smooth transitions for position changes
   - Border and shadow for better visibility
   - Matches PostCard's image container exactly

2. **Database Changes**
   - Added `image_position` column to posts table
   - Default value of 50 (centered)
   - Range of 0-100 for position control
   - Added descriptive comment for documentation

### Integration Points
1. **PostCreationForm**
   - Added image preview below upload
   - Position adjustment slider
   - Position value stored with post
   - Preview URL management
   - Clean state reset after submission
   - Matches PostCard dimensions exactly

2. **PostCard**
   - Updated to use image position
   - Smooth transitions for position changes
   - Maintains aspect ratio and cover fit
   - Fallback to center position if not set
   - Fixed maxOffset of 200px for consistent range

## Technical Implementation

### ImagePreview Component
```typescript
const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onPositionChange }) => {
    const [position, setPosition] = useState(50);
    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const imageRef = useRef<HTMLImageElement>(null);

    // Calculate transform value based on position
    const getTransformValue = () => {
        if (!imageHeight) return 'translateY(0)';
        const maxOffset = 200; // Match PostCard's maxOffset
        const offset = (maxOffset * (position - 50)) / 50;
        return `translateY(${offset}px)`;
    };

    return (
        <Space direction="vertical" size="middle">
            <div style={{ 
                height: '300px',
                width: '460px',
                overflow: 'hidden',
                border: `1px solid ${theme.colors.border}`,
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
                <img 
                    ref={imageRef}
                    src={imageUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: getTransformValue(),
                        transition: 'transform 0.2s ease-in-out'
                    }}
                />
            </div>
            <Slider
                min={0}
                max={100}
                value={position}
                onChange={handlePositionChange}
            />
        </Space>
    );
};
```

### PostCard Implementation
```typescript
// Calculate the transform value based on position
const getTransformValue = () => {
    if (!image) return 'translateY(0)';
    const maxOffset = 200; // Fixed offset for consistent range
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

2. **State Management**
   - Position stored with post
   - Preview URL management
   - Clean state reset
   - Proper cleanup on unmount

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

### Database Migration
```sql
ALTER TABLE posts ADD COLUMN image_position INTEGER DEFAULT 50;
COMMENT ON COLUMN posts.image_position IS 'Vertical position of the image in the post card (0-100, default 50)';
``` 