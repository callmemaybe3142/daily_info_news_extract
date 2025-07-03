import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import type { TableDataItem } from '../../types';

interface NewsContentSectionProps {
  newsContent: string;
  urls: string;
  onChange: (field: keyof TableDataItem, value: any) => void;
}

const NewsContentSection: React.FC<NewsContentSectionProps> = ({ newsContent, urls }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        News Content
      </Typography>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Content:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {newsContent || 'No content available'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            URLs:
          </Typography>
          <Typography variant="body1">
            {urls || 'No URLs available'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewsContentSection; 