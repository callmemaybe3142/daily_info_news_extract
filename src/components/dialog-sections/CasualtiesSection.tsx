import React from 'react';
import { Typography, Box, TextField, Paper } from '@mui/material';
import type { TableDataItem } from '../../types';

interface CasualtiesSectionProps {
  formData: TableDataItem;
  onChange: (field: keyof TableDataItem, value: any) => void;
}

const CasualtiesSection: React.FC<CasualtiesSectionProps> = ({ formData, onChange }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Casualties Information
        </Typography>
        
        {/* SAC Casualties */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          SAC Casualties
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="သေဆုံးအရေအတွက် (ရန်သူ့တပ်)"
            type="number"
            value={formData.sacDeath || ''}
            onChange={(e) => onChange('sacDeath', parseInt(e.target.value) || null)}
            fullWidth
            size="small"
          />
          <TextField
            label="ထိခိုက်ဒဏ်ရာရရှိမှု (ရန်သူတပ်)"
            type="number"
            value={formData.sacInjury || ''}
            onChange={(e) => onChange('sacInjury', parseInt(e.target.value) || null)}
            fullWidth
            size="small"
          />
          <TextField
            label="သုံ့ပန်း (ရန်သူတပ်သား)"
            type="number"
            value={formData.sacCaptive || ''}
            onChange={(e) => onChange('sacCaptive', parseInt(e.target.value) || null)}
            fullWidth
            size="small"
          />
        </Box>

        {/* Allies Casualties */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Allies Casualties
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="သေဆုံးအရေအတွက် (မိမိတပ်)"
            type="number"
            value={formData.alliesDeath || ''}
            onChange={(e) => onChange('alliesDeath', parseInt(e.target.value) || null)}
            fullWidth
            size="small"
          />
          <TextField
            label="ထိခိုက်ဒဏ်ရာရရှိမှု (မိမိတပ်)"
            type="number"
            value={formData.alliesInjury || ''}
            onChange={(e) => onChange('alliesInjury', parseInt(e.target.value) || null)}
            fullWidth
            size="small"
          />
          <TextField
            label="သုံ့ပန်း (မိမိတပ်သား)"
            type="number"
            value={formData.alliesCaptive || ''}
            onChange={(e) => onChange('alliesCaptive', parseInt(e.target.value) || null)}
            fullWidth
            size="small"
          />
        </Box>

        {/* Public Casualties */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Public Casualties
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="သေဆုံးအရေအတွက် (ပြည်သူ)"
            type="number"
            value={formData.publicDeath || ''}
            onChange={(e) => onChange('publicDeath', parseInt(e.target.value) || null)}
            fullWidth
            size="small"
          />
          <TextField
            label="ထိခိုက်ဒဏ်ရာရရှိမှု (ပြည်သူ)"
            type="number"
            value={formData.publicInjury || ''}
            onChange={(e) => onChange('publicInjury', parseInt(e.target.value) || null)}
            fullWidth
            size="small"
          />
          <TextField
            label="သုံ့ပန်း (ပြည်သူ)"
            type="number"
            value={formData.publicCaptive || ''}
            onChange={(e) => onChange('publicCaptive', parseInt(e.target.value) || null)}
            fullWidth
            size="small"
          />
        </Box>
        </Paper>
  );
};

export default CasualtiesSection; 