import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AppProvider, useApp } from './contexts/AppContext';
import { FileUpload } from './components/FileUpload';
import { DocumentPreview } from './components/DocumentPreview';
import { DataExtraction } from './components/DataExtraction';

const AppContent: React.FC = () => {
  const { uploadedFile, currentStep } = useApp();
  const [showDocumentPreview, setShowDocumentPreview] = useState(true);

  // Hide document preview when switching to table view
  React.useEffect(() => {
    if (currentStep === 'tableView') {
      setShowDocumentPreview(false);
    } else if (currentStep === 'newsList') {
      setShowDocumentPreview(true);
    }
  }, [currentStep]);

  const toggleDocumentPreview = () => {
    setShowDocumentPreview(!showDocumentPreview);
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Top section with upload button */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <FileUpload />
      </Box>

      {/* Absolute positioned toggle button */}
      {uploadedFile && (
        <Tooltip title={showDocumentPreview ? "Hide Document Preview" : "Show Document Preview"}>
          <IconButton 
            onClick={toggleDocumentPreview}
            color="primary"
            size="small"
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 1001,
              backgroundColor: 'background.paper',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            {showDocumentPreview ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Tooltip>
      )}

      {uploadedFile && (
        <>
          {/* Split layout when document preview is shown */}
          {showDocumentPreview && (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                flex: 1,
                overflow: 'hidden'
              }}
            >
              {/* Left panel - Document Preview */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '50%' },
                  height: { xs: '50vh', md: '100%' },
                  minWidth: 0,
                  maxWidth: { xs: '100%', md: '50%' },
                  overflow: 'hidden'
                }}
              >
                <DocumentPreview />
              </Box>

              {/* Right panel - Data Processing */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: '50%' },
                  height: { xs: '50vh', md: '100%' },
                  minWidth: 0,
                  maxWidth: { xs: '100%', md: '50%' },
                  overflow: 'hidden'
                }}
              >
                <DataExtraction isFullWidth={false} />
              </Box>
            </Box>
          )}

          {/* Full-width layout when document preview is hidden */}
          {!showDocumentPreview && (
            <Box 
              sx={{ 
                width: '100%',
                height: '100%',
                flex: 1,
                overflow: 'hidden'
              }}
            >
              <DataExtraction isFullWidth={true} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
