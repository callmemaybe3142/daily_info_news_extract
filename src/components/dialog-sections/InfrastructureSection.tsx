import React from 'react';
import {  Typography, Box, TextField, Paper } from '@mui/material';
import type { TableDataItem } from '../../types';

interface InfrastructureSectionProps {
  formData: TableDataItem;
  onChange: (field: keyof TableDataItem, value: any) => void;
}

const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({ formData, onChange }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Infrastructure Information
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Public Building"
            type="number"
            value={formData.publicBuilding || ''}
            onChange={(e) => onChange('publicBuilding', parseInt(e.target.value) || null)}
            size="small"
            sx={{ minWidth: 150 }}
          />
          <TextField
            label="Religion Building"
            type="number"
            value={formData.religionBuilding || ''}
            onChange={(e) => onChange('religionBuilding', parseInt(e.target.value) || null)}
            size="small"
            sx={{ minWidth: 150 }}
          />
          <TextField
            label="Hospital"
            type="number"
            value={formData.hospital || ''}
            onChange={(e) => onChange('hospital', parseInt(e.target.value) || null)}
            size="small"
            sx={{ minWidth: 150 }}
          />
          <TextField
            label="Schools"
            type="number"
            value={formData.schools || ''}
            onChange={(e) => onChange('schools', parseInt(e.target.value) || null)}
            size="small"
            sx={{ minWidth: 150 }}
          />
          <TextField
            label="Refugee Camp"
            type="number"
            value={formData.refugeeCamp || ''}
            onChange={(e) => onChange('refugeeCamp', parseInt(e.target.value) || null)}
            size="small"
            sx={{ minWidth: 150 }}
          />
        </Box>
        </Paper>
  );
};

export default InfrastructureSection; 