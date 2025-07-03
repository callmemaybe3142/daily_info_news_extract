import React, { useState } from 'react';
import {
  Typography,
  Box,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { ReportDate } from './ReportDate';
import { NewsExtraction } from './NewsExtraction';
import { useApp } from '../contexts/AppContext';
import LoadingButton from './common/LoadingButton';

interface NewsListProps {
  isFullWidth?: boolean;
  onProceed?: () => void;
}

export const NewsList: React.FC<NewsListProps> = ({ isFullWidth: _isFullWidth = false, onProceed }) => {
  const { generateTableData } = useApp();
  const [isProceeding, setIsProceeding] = useState(false);

  const handleProceed = async () => {
    setIsProceeding(true);
    // Simulate processing time for generating table data
    await new Promise(resolve => setTimeout(resolve, 800));
    generateTableData();
    onProceed?.();
    setIsProceeding(false);
  };

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
          <LoadingButton
            loading={isProceeding}
            variant="contained"
            size="large"
            endIcon={!isProceeding ? <ArrowForward /> : undefined}
            onClick={handleProceed}
            sx={{ minWidth: 120 }}
          >
            {isProceeding ? 'Processing...' : 'Proceed'}
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
}; 