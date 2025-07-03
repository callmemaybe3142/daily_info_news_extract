import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TypeaheadMultipleProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  freeSolo?: boolean;
  separator?: string;
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

const TypeaheadMultiple: React.FC<TypeaheadMultipleProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder,
  size = 'small',
  fullWidth = true,
  disabled = false,
  freeSolo = true,
  separator = ', ',
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Parse comma-separated string to array
  useEffect(() => {
    if (value) {
      const values = value.split(',').map(v => v.trim()).filter(v => v);
      setSelectedValues(values);
    } else {
      setSelectedValues([]);
    }
  }, [value]);

  // Convert array back to comma-separated string
  const handleChange = (_event: any, newValue: string[]) => {
    setSelectedValues(newValue);
    const joinedValue = newValue.join(separator);
    onChange(joinedValue);
  };

  // Handle input change for typing new values
  const handleInputChange = (_event: any, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  // Handle key press for comma/enter to add values
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === ',' || event.key === 'Enter') && inputValue.trim()) {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !selectedValues.includes(trimmedValue)) {
        const newValues = [...selectedValues, trimmedValue];
        handleChange(event, newValues);
      }
      setInputValue('');
    } else if (event.key === 'Backspace' && !inputValue && selectedValues.length > 0) {
      // Remove last chip on backspace when input is empty
      const newValues = selectedValues.slice(0, -1);
      handleChange(event, newValues);
    }
  };

  // Filter options to exclude already selected values
  const filteredOptions = options.filter(option => !selectedValues.includes(option));

  return (
    <Autocomplete
      multiple
      value={selectedValues}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={filteredOptions}
      freeSolo={freeSolo}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      PaperComponent={StyledPaper}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={selectedValues.length === 0 ? placeholder : ''}
          variant="outlined"
          size={size}
          onKeyDown={handleKeyDown}
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
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            // key={index}
            label={option}
            size="small"
            {...getTagProps({ index })}
            style={{
              fontSize: '0.75rem',
              height: '24px',
              margin: '2px',
            }}
          />
        ))
      }
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
      // Allow custom values by handling blur
      onBlur={() => {
        if (inputValue.trim() && !selectedValues.includes(inputValue.trim())) {
          const newValues = [...selectedValues, inputValue.trim()];
          setSelectedValues(newValues);
          onChange(newValues.join(separator));
          setInputValue('');
        }
      }}
    />
  );
};

export default TypeaheadMultiple; 