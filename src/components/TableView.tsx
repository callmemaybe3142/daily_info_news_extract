import React from 'react';
import {
  Typography,
  Box,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface TableViewProps {
  isFullWidth?: boolean;
  onBack?: () => void;
}

export const TableView: React.FC<TableViewProps> = ({ isFullWidth: _isFullWidth = false, onBack }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      p: 3 
    }}>
      {/* Header with Back Button */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        borderBottom: '1px solid #e0e0e0',
        pb: 2
      }}>
        {onBack && (
          <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
        )}
        <Typography variant="h5">
          Table View
        </Typography>
      </Box>
      
      {/* Content */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="text.secondary" paragraph>
          This section will display extracted data in a structured table format.
        </Typography>
        
        {/* Placeholder for table */}
        <Box sx={{ 
          border: '2px dashed #e0e0e0', 
          borderRadius: 2, 
          p: 4, 
          textAlign: 'center',
          backgroundColor: '#fafafa'
        }}>
          <Typography variant="body1" color="text.secondary">
            Structured data table will be displayed here after processing.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}; 