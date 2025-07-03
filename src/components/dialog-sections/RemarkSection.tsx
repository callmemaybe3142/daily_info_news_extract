import React from 'react';
import {  Typography, TextField, Paper } from '@mui/material';
import type { TableDataItem } from '../../types';

interface RemarkSectionProps {
  remark: string | null;
  onChange: (field: keyof TableDataItem, value: any) => void;
}

const RemarkSection: React.FC<RemarkSectionProps> = ({ remark, onChange }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Remarks
        </Typography>
        
        <TextField
          label="Remark"
          value={remark || ''}
          onChange={(e) => onChange('remark', e.target.value)}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
      </Paper>
  );
};

export default RemarkSection; 