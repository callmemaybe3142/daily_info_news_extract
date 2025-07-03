import React from 'react';
import { Autocomplete, TextField, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TypeaheadSingleProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string | null) => void;
  placeholder?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  freeSolo?: boolean;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  '& .MuiAutocomplete-listbox': {
    maxHeight: 200,
    '& .MuiAutocomplete-option': {
      fontSize: '0.875rem',
      padding: theme.spacing(1),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&[aria-selected="true"]': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      },
    },
  },
}));

const TypeaheadSingle: React.FC<TypeaheadSingleProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder,
  size = 'small',
  fullWidth = true,
  disabled = false,
  freeSolo = true,
}) => {
  const handleChange = (_event: any, newValue: string | null) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      value={value || ''}
      onChange={handleChange}
      options={options}
      freeSolo={freeSolo}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      PaperComponent={StyledPaper}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          size={size}
          InputProps={{
            ...params.InputProps,
            style: {
              fontSize: '0.875rem',
            },
          }}
          InputLabelProps={{
            style: {
              fontSize: '0.875rem',
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option}>
          {option}
        </li>
      )}
      filterOptions={(options, { inputValue }) => {
        return options.filter(option =>
          option.toLowerCase().includes(inputValue.toLowerCase())
        );
      }}
      noOptionsText="No matching options"
      clearOnBlur={false}
      selectOnFocus
      handleHomeEndKeys
    />
  );
};

export default TypeaheadSingle; 