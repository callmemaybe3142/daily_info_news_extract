import React from 'react';
import { Box, Skeleton, Card, CardContent } from '@mui/material';

interface LoadingSkeletonProps {
  variant?: 'table-row' | 'dialog-form' | 'news-content';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  variant = 'dialog-form', 
  count = 1 
}) => {
  if (variant === 'table-row') {
    return (
      <Box sx={{ width: '100%', p: 2 }}>
        {Array.from({ length: count }).map((_, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
            <Skeleton variant="text" width="5%" height={48} />
            <Skeleton variant="text" width="15%" height={48} />
            <Skeleton variant="text" width="20%" height={48} />
            <Skeleton variant="text" width="25%" height={48} />
            <Skeleton variant="text" width="15%" height={48} />
            <Skeleton variant="text" width="20%" height={48} />
          </Box>
        ))}
      </Box>
    );
  }

  if (variant === 'news-content') {
    return (
      <Card variant="outlined">
        <CardContent>
          <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="80%" height={24} />
        </CardContent>
      </Card>
    );
  }

  // Default: dialog-form variant
  return (
    <Box sx={{ width: '100%' }}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={40} />
              <Skeleton variant="rectangular" width="100%" height={40} />
              <Skeleton variant="rectangular" width="100%" height={40} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={40} />
              <Skeleton variant="rectangular" width="100%" height={40} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default LoadingSkeleton; 