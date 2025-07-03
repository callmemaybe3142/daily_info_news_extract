import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import type { TableDataItem } from '../../types';
import TypeaheadSingle from '../common/TypeaheadSingle';
import LocationService from '../../services/locationService';

interface BasicInfoSectionProps {
  formData: TableDataItem;
  onChange: (field: keyof TableDataItem, value: any) => void;
}

const parseDate = (value: string | null): Dayjs | null => {
  if (!value) return null;
  // Try to parse as yyyy-MM-dd, fallback to other formats
  const d = dayjs(value, 'DD/MM/YYYY', true);
  if (d.isValid()) return d;
  return dayjs(value);
};



const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, onChange }) => {
  const [locationService] = useState(() => LocationService.getInstance());
  const [isLocationDataLoaded, setIsLocationDataLoaded] = useState(false);
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);
  const [townshipOptions, setTownshipOptions] = useState<string[]>([]);
  const [townOptions, setTownOptions] = useState<string[]>([]);

  // Load location data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await locationService.loadLocationData();
        setStateOptions(locationService.getAllStates());
        setIsLocationDataLoaded(true);
      } catch (error) {
        console.error('Failed to load location data:', error);
      }
    };
    loadData();
  }, [locationService]);

  // Load all options for each field (not filtered by parents)
  useEffect(() => {
    if (!isLocationDataLoaded) return;

    // Load all available options for each field
    setDistrictOptions(locationService.getAllDistricts());
    setTownshipOptions(locationService.getAllTownships());
    setTownOptions(locationService.getAllTowns());
  }, [isLocationDataLoaded, locationService]);

  // Handle location selection and auto-fill parent fields only
  const handleLocationChange = (field: 'state' | 'district' | 'township' | 'town', value: string) => {
    if (!isLocationDataLoaded) return;

    // Find location data based on the selected value
    const locationData = locationService.findLocationByValue(value);
    
    if (locationData) {
      // Auto-fill parent fields only (bottom-up approach)
      if (field === 'town') {
        // If town is selected, fill all parent fields
        onChange('town', value);
        onChange('township', locationData.township);
        onChange('district', locationData.district);
        onChange('state', locationData.state);
      } else if (field === 'township') {
        // If township is selected, fill parent fields only
        onChange('township', value);
        onChange('district', locationData.district);
        onChange('state', locationData.state);
      } else if (field === 'district') {
        // If district is selected, fill parent field only
        onChange('district', value);
        onChange('state', locationData.state);
      } else if (field === 'state') {
        // If state is selected, just update the field
        onChange('state', value);
      }
    } else {
      // If no location data found, just update the field
      onChange(field, value);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
    
        <Typography variant="h6" gutterBottom>
          Basic Information
        </Typography>
        
        {/* First row */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isFollowUp}
                onChange={(e) => onChange('isFollowUp', e.target.checked)}
              />
            }
            label="Follow Up"
          />
          <TextField
            label="Source"
            value={formData.source || ''}
            onChange={(e) => onChange('source', e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Report Number"
            type="number"
            value={formData.reportNumber || ''}
            onChange={(e) => onChange('reportNumber', parseInt(e.target.value) || 0)}
            fullWidth
            size="small"
          />
        </Box>

        {/* Second row - Dates */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <DatePicker
            label="Report Date"
            value={parseDate(formData.reportDate)}
            format="DD/MM/YYYY"
            onChange={(date) => {
              onChange('reportDate', date ? dayjs(date).format('DD/MM/YYYY') : '');
            }}
            slotProps={{ textField: { fullWidth: true, size: 'small' } }}
          />
          <DatePicker
            label="Case Date"
            value={parseDate(formData.caseDate)}
            format="DD/MM/YYYY"
            onChange={(date) => {
              onChange('caseDate', date ? dayjs(date).format('DD/MM/YYYY') : '');
            }}
            slotProps={{ textField: { fullWidth: true, size: 'small' } }}
          />
        </Box>

        {/* Third row - State, District, Township */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TypeaheadSingle
            label="State"
            value={formData.state || ''}
            onChange={(value) => handleLocationChange('state', value || '')}
            options={stateOptions}
            disabled={!isLocationDataLoaded}
            size="small"
          />
          <TypeaheadSingle
            label="District"
            value={formData.district || ''}
            onChange={(value) => handleLocationChange('district', value || '')}
            options={districtOptions}
            disabled={!isLocationDataLoaded}
            size="small"
          />
          <TypeaheadSingle
            label="Township"
            value={formData.township || ''}
            onChange={(value) => handleLocationChange('township', value || '')}
            options={townshipOptions}
            disabled={!isLocationDataLoaded}
            size="small"
          />
        </Box>

        {/* Fourth row - Town, Quarter, Village */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TypeaheadSingle
            label="Town"
            value={formData.town || ''}
            onChange={(value) => handleLocationChange('town', value || '')}
            options={townOptions}
            disabled={!isLocationDataLoaded}
            size="small"
          />
          <TextField
            label="Quarter"
            value={formData.quarter || ''}
            onChange={(e) => onChange('quarter', e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Village"
            value={formData.village || ''}
            onChange={(e) => onChange('village', e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        {/* Fifth row - Location Detail and MGRS */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Location Detail"
            value={formData.locationDetail || ''}
            onChange={(e) => onChange('locationDetail', e.target.value)}
            fullWidth
            size="small"
            sx={{ flex: 2 }}
          />
          <TextField
            label="MGRS"
            value={formData.mgrs || ''}
            onChange={(e) => onChange('mgrs', e.target.value)}
            fullWidth
            size="small"
            sx={{ flex: 1 }}
          />
        </Box>
    </Paper>
  );
};

export default BasicInfoSection; 