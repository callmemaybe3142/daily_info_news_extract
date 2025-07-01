import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';

export const DocumentPreview: React.FC = () => {
  const { uploadedFile, clearFile } = useApp();

  if (!uploadedFile) {
    return null;
  }

  return (
    <Paper elevation={0} sx={{ 
      p: 3, 
      height: '100%', 
      overflow: 'hidden', 
      borderRadius: 0, 
      display: 'flex', 
      flexDirection: 'column',
      maxWidth: '100%',
      minWidth: 0,
      boxSizing: 'border-box'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">
          Document Preview
        </Typography>
        <Box>
          <Tooltip title="Clear document">
            <IconButton onClick={clearFile} size="small">
              <Close />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      


      <Box
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          p: 2,
          backgroundColor: '#fafafa',
          flex: 1,
          overflow: 'auto',
          overflowX: 'hidden',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          hyphens: 'auto',
          maxWidth: '100%',
          minWidth: 0,
          '& *': {
            maxWidth: '100% !important',
            minWidth: '0 !important',
            boxSizing: 'border-box',
          },
          '& p': { 
            margin: '8px 0',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          },
          '& h1, & h2, & h3': { 
            margin: '12px 0 8px 0',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          },
          '& ul, & ol': { 
            margin: '8px 0', 
            paddingLeft: '20px',
            wordWrap: 'break-word'
          },
          '& li': { 
            margin: '4px 0',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          },
          '& strong': { fontWeight: 600 },
          '& em': { fontStyle: 'italic' },
          '& table': {
            width: '100% !important',
            maxWidth: '100% !important',
            tableLayout: 'fixed',
            wordWrap: 'break-word'
          },
          '& td, & th': {
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '0',
            overflow: 'hidden'
          },
          '& img': {
            maxWidth: '30% !important',
            height: 'auto !important',
            display: 'inline'
          }
        }}
        dangerouslySetInnerHTML={{ __html: uploadedFile.content }}
      />
    </Paper>
  );
}; 