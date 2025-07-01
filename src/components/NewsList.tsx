import React from 'react';
import {
  Typography,
  Box,
  Button,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { ReportDate } from './ReportDate';
import { NewsExtraction } from './NewsExtraction';

interface NewsListProps {
  isFullWidth?: boolean;
  onProceed?: () => void;
}

export const NewsList: React.FC<NewsListProps> = ({ isFullWidth: _isFullWidth = false, onProceed }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      p: 3 
    }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom>
        News List
      </Typography>
      
      {/* Report Date Component */}
      <ReportDate />
      
      {/* News Extraction Component */}
      <NewsExtraction />

      
      {/* Bottom Action Button */}
      {onProceed && (
        <Box sx={{ 
          borderTop: '1px solid #e0e0e0', 
          pt: 2, 
          display: 'flex', 
          justifyContent: 'flex-end' 
        }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={onProceed}
            sx={{ minWidth: 120 }}
          >
            Proceed
          </Button>
        </Box>
      )}
    </Box>
  );
}; 