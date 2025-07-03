import React from 'react';
import {
  Button,
  Box,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useApp } from '../contexts/AppContext';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const FileUpload: React.FC = () => {
  const { isLoading, error, uploadFile, uploadedFile, setTableData, setCurrentStep } = useApp();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadFile(file);
    
    // Reset the input value to allow uploading the same file again
    event.target.value = '';
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setCurrentStep('tableView');
      const tableData = await import('../services/fileService').then(m => m.FileService.parseCSVFile(file));
      setTableData(tableData);
      console.log(tableData)
    } catch (e) {
      // Optionally handle error
      console.error(e);
    }
    event.target.value = '';
  };

  return (
    <Box>
      {/* {!isLoading && !uploadedFile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
            size="large"
          >
            Upload DOCX File
            <VisuallyHiddenInput
              type="file"
              accept=".docx"
              onChange={handleFileUpload}
            />
          </Button>
        </Box>
      )} */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          size="large"
        >
          Upload DOCX File
          <VisuallyHiddenInput
            type="file"
            accept=".docx"
            onChange={handleFileUpload}
          />
        </Button>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUpload />}
          size="large"
        >
          Upload CSV
          <VisuallyHiddenInput
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
          />
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography variant="body2" color="text.secondary">
            Processing document...
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}; 