import React from 'react';
import {  Typography, Box,  Paper } from '@mui/material';
import type { TableDataItem } from '../../types';
import TypeaheadMultiple from '../common/TypeaheadMultiple';
import { actorGroupsOptions, actorsOptions, countriesOptions } from '../../data/dropdowns';

interface ActorsSectionProps {
  formData: TableDataItem;
  onChange: (field: keyof TableDataItem, value: any) => void;
}

const ActorsSection: React.FC<ActorsSectionProps> = ({ formData, onChange }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Actors Information
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TypeaheadMultiple
            label="Actor Groups"
            value={formData.actorGroups || ''}
            options={actorGroupsOptions}
            onChange={(value) => onChange('actorGroups', value)}
            fullWidth
            size="small"
          />
          <TypeaheadMultiple
            label='Actors'
            value={formData.actors || ''}
            options={actorsOptions}
            onChange={(value) => onChange('actors', value)}
            fullWidth
            size="small"
          />
          <TypeaheadMultiple
            label='Countries'
            value={formData.countries || ''}
            options={countriesOptions}
            onChange={(value) => onChange('countries', value)}
            fullWidth
            size="small"
          />
        </Box>
        </Paper>
  );
};

export default ActorsSection; 