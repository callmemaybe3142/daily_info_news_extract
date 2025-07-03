import React from 'react';
import {  Typography, Box, TextField, FormControlLabel, Checkbox, Paper } from '@mui/material';
import type { TableDataItem } from '../../types';

interface AlliesSectionProps {
  formData: TableDataItem;
  onChange: (field: keyof TableDataItem, value: any) => void;
}

const AlliesSection: React.FC<AlliesSectionProps> = ({ formData, onChange }) => {
  return (
   <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Allies Information
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Allies Name"
            value={formData.alliesName || ''}
            onChange={(e) => onChange('alliesName', e.target.value)}
            fullWidth
            size="small"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.alliesLost}
                onChange={(e) => onChange('alliesLost', e.target.checked)}
              />
            }
            label="Allies Lost"
          />
        </Box>
      </Paper>
  );
};

export default AlliesSection; 