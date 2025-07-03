import React from 'react';
import {
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { DataObject } from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';
import { NewsList } from './NewsList';
import { TableView } from './TableView';

interface DataExtractionProps {
  isFullWidth?: boolean;
}

export const DataExtraction: React.FC<DataExtractionProps> = ({ isFullWidth = false }) => {
  const { uploadedFile, currentStep, setCurrentStep, tableData } = useApp();

  const hasData = !!uploadedFile || (tableData && tableData.length > 0);

  const handleProceed = () => {
    setCurrentStep('tableView');
  };

  const handleBack = () => {
    setCurrentStep('newsList');
  };

  if (!hasData) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          borderRadius: 0,
          borderLeft: isFullWidth ? 'none' : '1px solid #e0e0e0'
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
          <DataObject sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" gutterBottom>
            No Document Uploaded
          </Typography>
          <Typography variant="body2">
            Upload a DOCX file to extract and process data
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        height: '100%', 
        width: isFullWidth ? '100vw' : '100%',
        borderRadius: 0,
        borderLeft: isFullWidth ? 'none' : '1px solid #e0e0e0',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Step-based navigation content */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {currentStep === 'newsList' && (
          <NewsList 
            isFullWidth={isFullWidth} 
            onProceed={handleProceed}
          />
        )}

        {currentStep === 'tableView' && (
          <TableView 
            isFullWidth={isFullWidth} 
            onBack={handleBack}
          />
        )}
      </Box>
    </Paper>
  );
}; 