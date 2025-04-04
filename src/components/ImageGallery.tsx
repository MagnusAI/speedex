import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { BlogPostImage } from '../types/blog';

interface ImageGalleryProps {
  images: BlogPostImage[];
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function ImageGallery({ images, open, onClose, initialIndex = 0 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const currentImage = images[currentIndex];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogContent sx={{ p: 0, position: 'relative', height: '100%' }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
            },
            zIndex: 1
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black'
        }}>
          <img
            src={currentImage.image_url}
            alt={currentImage.caption || 'Blog post image'}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              width: 'auto',
              height: 'auto'
            }}
          />

          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: 'absolute',
                  left: 8,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                  }
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 8,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)'
                  }
                }}
              >
                <NavigateNextIcon />
              </IconButton>
            </>
          )}
        </Box>

        {currentImage.caption && (
          <Paper
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white'
            }}
          >
            <Typography variant="body1">
              {currentImage.caption}
            </Typography>
          </Paper>
        )}

        {images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: currentImage.caption ? 80 : 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              p: 1,
              borderRadius: 1
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
} 