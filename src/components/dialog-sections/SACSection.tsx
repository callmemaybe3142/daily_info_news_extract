import React from 'react';
import {  Typography, Box, TextField, FormControlLabel, Checkbox, Paper } from '@mui/material';
import type { TableDataItem } from '../../types';
import TypeaheadMultiple from '../common/TypeaheadMultiple';
import { infrastructuresOptions, effectRangeOptions, sacNameOptions } from '../../data/dropdowns';

interface SACSectionProps {
  formData: TableDataItem;
  onChange: (field: keyof TableDataItem, value: any) => void;
}

const SACSection: React.FC<SACSectionProps> = ({ formData, onChange }) => {
  console.log('render this')
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
          Infrastructures and Effects
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TypeaheadMultiple
            label="ရုပ်ဝတ္ထုပစ္စည်းများ"
            value={formData.infrastructures || ''}
            options={infrastructuresOptions}
            onChange={(value) => onChange('infrastructures', value)}
            fullWidth
            size="small"
          />

          <TypeaheadMultiple
            label="သက်ရောက်မှု"
            value={formData.effectRange || ''}
            options={effectRangeOptions}
            onChange={(value) => onChange('effectRange', value)}
            fullWidth
            size="small"
          />

        </Box>
        <Typography variant="h6" gutterBottom>
          SAC Information
        </Typography>
        <FormControlLabel
            control={
              <Checkbox
                checked={formData.SACDid}
                onChange={(e) => onChange('SACDid', e.target.checked)}
              />
            }
            label="စစ်ကောင်စီမှ စတင်ပြုလုပ်ခြင်း"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.sacLost}
                onChange={(e) => onChange('sacLost', e.target.checked)}
              />
            }
            label="ဆုံးရှုံးမှု (စကစ)"
          />
        {/* SAC Details */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center' }}>
          <TypeaheadMultiple
            label="SAC Name"
            value={formData.sacName || ''}
            options={sacNameOptions}
            onChange={(value) => onChange('sacName', value)}
            fullWidth
            size="small"
          />

          <TextField
            label="SAC Admin"
            value={formData.sacAdmin || ''}
            onChange={(e) => onChange('sacAdmin', e.target.value)}
            fullWidth
            size="small"
          />
          
        </Box>
      </Paper>
  );
};

export default SACSection; 