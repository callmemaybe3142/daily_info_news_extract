import React, { useState, useEffect } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Slide,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { TableDataItem } from '../types';
import { useApp } from '../contexts/AppContext';
import LoadingButton from './common/LoadingButton';
import LoadingSkeleton from './common/LoadingSkeleton';
import NewsContentSection from './dialog-sections/NewsContentSection';
import BasicInfoSection from './dialog-sections/BasicInfoSection';
import CategorySection from './dialog-sections/CategorySection';
import ActorsSection from './dialog-sections/ActorsSection';
import SACSection from './dialog-sections/SACSection';
import AlliesSection from './dialog-sections/AlliesSection';
import CasualtiesSection from './dialog-sections/CasualtiesSection';
import InfrastructureSection from './dialog-sections/InfrastructureSection';
import RemarkSection from './dialog-sections/RemarkSection';

interface TableRowEditDialogProps {
  open: boolean;
  row: TableDataItem | null;
  onClose: () => void;
  onSave: (updatedRow: TableDataItem) => void;
}

const SlideTransition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TableRowEditDialog: React.FC<TableRowEditDialogProps> = ({ open, row, onClose, onSave }) => {
  const { tableData, updateTableItem } = useApp();
  const [formData, setFormData] = useState<TableDataItem | null>(row);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (row) {
      setIsLoading(true);
      // Simulate loading time for form data
      setTimeout(() => {
        setFormData(row);
        setIsLoading(false);
      }, 200);
    }
  }, [row]);

  if (!formData || !tableData) return null;

  const currentIndex = tableData.findIndex(item => item.id === formData.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < tableData.length - 1;

  const handleChange = (field: keyof TableDataItem, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const saveCurrentData = async () => {
    if (formData) {
      setIsSaving(true);
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 500));
      updateTableItem(formData);
      onSave(formData);
      setNotificationMessage('Data saved successfully!');
      setShowNotification(true);
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    await saveCurrentData();
  };

  const handlePrevious = async () => {
    if (hasPrevious && !isNavigating) {
      setIsNavigating(true);
      // Save current data first
      if (formData) {
        updateTableItem(formData);
        setNotificationMessage('Data saved successfully!');
        setShowNotification(true);
      }
      // Simulate navigation delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Navigate to previous row
      const previousRow = tableData[currentIndex - 1];
      setFormData(previousRow);
      setIsNavigating(false);
    }
  };

  const handleNext = async () => {
    if (hasNext && !isNavigating) {
      setIsNavigating(true);
      // Save current data first
      if (formData) {
        updateTableItem(formData);
        setNotificationMessage('Data saved successfully!');
        setShowNotification(true);
      }
      // Simulate navigation delay
      await new Promise(resolve => setTimeout(resolve, 300));
      // Navigate to next row
      const nextRow = tableData[currentIndex + 1];
      setFormData(nextRow);
      setIsNavigating(false);
    }
  };

  const handleClose = async () => {
    setIsClosing(true);
    // Save current data before closing
    if (formData) {
      updateTableItem(formData);
    }
    // Simulate close delay
    await new Promise(resolve => setTimeout(resolve, 200));
    setIsClosing(false);
    onClose();
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={SlideTransition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <LoadingButton
              loading={isClosing}
              onClick={handleClose}
              color="inherit"
              isIconButton={true}
              sx={{ mr: 1 }}
            >
              <CloseIcon />
            </LoadingButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Row ({currentIndex + 1} of {tableData.length})
            </Typography>
            
            {/* Navigation and Save buttons */}
            <LoadingButton
              loading={isNavigating}
              onClick={handlePrevious}
              disabled={!hasPrevious || isNavigating || isSaving}
              color="inherit"
              isIconButton={true}
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </LoadingButton>
            
            <LoadingButton
              loading={isNavigating}
              onClick={handleNext}
              disabled={!hasNext || isNavigating || isSaving}
              color="inherit"
              isIconButton={true}
              sx={{ mr: 2 }}
            >
              <ArrowForwardIcon />
            </LoadingButton>
            
            <LoadingButton
              loading={isSaving}
              onClick={handleSave}
              color="primary"
              disabled={isNavigating || isClosing}
            >
              Save
            </LoadingButton>
          </Toolbar>
        </AppBar>
        
        {isLoading ? (
          <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
            {/* Left side loading skeleton */}
            <Box sx={{
              width: '30%',
              minWidth: 250,
              p: 3,
              borderRight: '1px solid #e0e0e0',
            }}>
              <LoadingSkeleton variant="news-content" />
            </Box>
            {/* Right side loading skeleton */}
            <Box sx={{
              flex: 1,
              p: 3,
              overflowY: 'auto',
            }}>
              <LoadingSkeleton variant="dialog-form" count={8} />
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
            {/* Left side - News Content (30% width, sticky) */}
            <Box sx={{
              width: '30%',
              minWidth: 250,
              p: 3,
              borderRight: '1px solid #e0e0e0',
              position: 'sticky',
              top: 0,
              alignSelf: 'flex-start',
              height: '100%',
              overflowY: 'auto',
              backgroundColor: 'background.paper',
              zIndex: 1
            }}>
              <NewsContentSection
                newsContent={formData.newsContent}
                urls={formData.urls}
                onChange={handleChange}
              />
            </Box>
            {/* Right side - Scrollable sections */}
            <Box sx={{
              flex: 1,
              p: 3,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              height: '100%',
            }}>
              <BasicInfoSection
                formData={formData}
                onChange={handleChange}
              />
              <CategorySection
                formData={formData}
                onChange={handleChange}
              />
              <ActorsSection
                formData={formData}
                onChange={handleChange}
              />
              <SACSection
                formData={formData}
                onChange={handleChange}
              />
              <AlliesSection
                formData={formData}
                onChange={handleChange}
              />
              <CasualtiesSection
                formData={formData}
                onChange={handleChange}
              />
              <InfrastructureSection
                formData={formData}
                onChange={handleChange}
              />
              <RemarkSection
                remark={formData.remark}
                onChange={handleChange}
              />
            </Box>
          </Box>
        )}
      </Dialog>

      {/* Success Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TableRowEditDialog; 