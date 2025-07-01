import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useApp } from '../contexts/AppContext';

interface ReportDateProps {
  className?: string;
}

export const ReportDate: React.FC<ReportDateProps> = ({ className }) => {
  const { documentData, updateDocumentData } = useApp();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // Initialize date when documentData changes
  useEffect(() => {
    if (documentData?.reportDate) {
      const parsedDate = parseDateString(documentData.reportDate);
      setSelectedDate(parsedDate);
    } else {
      setSelectedDate(null);
    }
  }, [documentData?.reportDate]);

  // Parse DD/MM/YYYY format to dayjs
  const parseDateString = (dateStr: string): Dayjs | null => {
    if (!dateStr) return null;
    
    // Handle DD/MM/YYYY format
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const dayjsDate = dayjs(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      return dayjsDate.isValid() ? dayjsDate : null;
    }
    
    return null;
  };

  // Format dayjs to DD/MM/YYYY
  const formatDateForStorage = (date: Dayjs | null): string => {
    if (!date || !date.isValid()) return '';
    return date.format('DD/MM/YYYY');
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate); // User manually changed the date
    
    const formattedDate = formatDateForStorage(newDate);
    updateDocumentData({ reportDate: formattedDate });
  };

  if (!documentData) {
    return null;
  }

  return (
    <Card className={className} sx={{ mb: 3 }}>
      <CardContent>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DatePicker
            label="Report Date"
            value={selectedDate}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                size: 'small',
                sx: { width: 200 }
              }
            }}
          />
          
          {selectedDate && (
            <Typography variant="body2" color="text.secondary">
              {selectedDate.format('dddd, MMMM D, YYYY')}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}; 