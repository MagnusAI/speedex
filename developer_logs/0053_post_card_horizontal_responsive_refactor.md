# PostCard Horizontal & Responsive Refactor - 2024-05-XX

## Overview
This update refactors the PostCard component to use a modern, horizontal layout with improved responsiveness and visual polish. The card now adapts gracefully to both desktop and mobile screens, and the code is cleaner and more maintainable.

## Implementation Details

### Layout & Responsiveness
- Switched to a horizontal flex layout for desktop: image on the right, text on the left.
- On mobile, the image appears above the text (using `flex-direction: column-reverse`).
- Card and image containers now use 100% width for full-row display.
- Card border removed for a cleaner look; border and radius added on mobile for separation.

### Image Handling
- Image is always the same size for all posts: fixed max width and height on desktop, full width and fixed height on mobile.
- Used Ant Design's `<Image preview={false} />` for better UX and performance.
- Image container uses `object-fit: cover` for consistent cropping.
- Subtle gradient overlay at the bottom of the image for visual depth.

### Content & Actions
- Title and description are left-aligned, with a max width for readability.
- Tags, date, and action buttons (edit/delete) are neatly aligned and spaced.
- Action buttons are larger and more accessible.
- Date is always right-aligned.
- Improved truncation and "Read more" handling for long descriptions.

### Styling & Structure
- Used classNames and a style block for all layout and media queries.
- All sizing, spacing, and border radius values are consistent with the theme.
- Cleaned up inline styles and reduced code duplication.
- Improved accessibility and click handling for modal and actions.

## Technical Implementation

```typescript
<Card
  className="post-card-horizontal"
  style={{
    border: 'none',
    borderRadius: 0,
    width: '100%',
    overflow: 'hidden',
    margin: '0 auto',
    padding: 0,
  }}
  bodyStyle={{
    padding: 0,
  }}
  onClick={() => setIsDescriptionExpanded(true)}
>
  <div className="post-card-flex">
    <div className="post-card-content">
      {/* ...title, description, tags, actions, date... */}
    </div>
    <div className='post-card-image' style={{
      width: '100%',
      height: '100%',
      maxWidth: '340px',
      maxHeight: '180px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.backgroundAlt,
      position: 'relative',
    }}>
      <Image
        preview={false}
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: getTransformValue(),
          transition: 'transform 0.2s ease-in-out'
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0))',
        pointerEvents: 'none'
      }} />
    </div>
  </div>
  <style>{`
    .post-card-flex {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 180px;
    }
    .post-card-content {
      flex: 1;
      padding: 12px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .post-card-image {
      border-radius: 12px 12px 12px 12px;
    }
    @media (max-width: 600px) {
      .post-card-flex {
        flex-direction: column-reverse;
        height: auto;
        border: 1px solid ${theme.colors.border};
        border-radius: 12px;
      }
      .post-card-image {
        border-radius: 12px 12px 0 0;
      }
      .post-card-horizontal {
        max-width: 300px;
      }
    }
  `}</style>
</Card>
```

## Impact
- The PostCard component now looks modern and professional on all devices.
- Layout is more visually appealing and easier to scan.
- Code is easier to maintain and extend for future features.
- User experience is improved for both desktop and mobile users. 