import React from 'react';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LoadingButtonProps {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  sx?: any;
  isIconButton?: boolean;
}

const LoadingIconButton = styled(IconButton)(() => ({
  position: 'relative',
  '& .loading-spinner': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  onClick,
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  disabled = false,
  fullWidth = false,
  sx,
  isIconButton = false,
}) => {
  const isDisabled = loading || disabled;

  if (isIconButton) {
    return (
      <LoadingIconButton
        onClick={onClick}
        disabled={isDisabled}
        color={color}
        size={size}
        sx={sx}
      >
        {loading ? (
          <CircularProgress
            size={20}
            color={color === 'inherit' ? 'primary' : color}
            className="loading-spinner"
          />
        ) : (
          children
        )}
      </LoadingIconButton>
    );
  }

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      variant={variant}
      color={color}
      size={size}
      startIcon={loading ? undefined : startIcon}
      endIcon={loading ? undefined : endIcon}
      fullWidth={fullWidth}
      sx={{
        position: 'relative',
        ...sx,
      }}
    >
      {loading && (
        <CircularProgress
          size={20}
          color={color === 'inherit' ? 'primary' : color}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-10px',
            marginLeft: '-10px',
          }}
        />
      )}
      <span style={{ opacity: loading ? 0 : 1 }}>
        {children}
      </span>
    </Button>
  );
};

export default LoadingButton; 