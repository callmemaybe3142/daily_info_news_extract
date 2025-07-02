import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';
import type { TableDataItem } from '../types';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface TableViewProps {
  isFullWidth?: boolean;
  onBack?: () => void;
}

export const TableView: React.FC<TableViewProps> = ({ isFullWidth: _isFullWidth = false, onBack }) => {
  const { tableData } = useApp();
  const [copySuccess, setCopySuccess] = useState(false);

  if (!tableData || tableData.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        p: 3 
      }}>
        {/* Header with Back Button */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          borderBottom: '1px solid #e0e0e0',
          pb: 2
        }}>
          {onBack && (
            <Button
              startIcon={<ArrowBack />}
              onClick={onBack}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
          )}
          <Typography variant="h5">
            Table View
          </Typography>
        </Box>
        
        {/* Empty State */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="h6" gutterBottom>
              No Data Available
            </Typography>
            <Typography variant="body2">
              Please go back to the news list and click "Proceed" to generate table data.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  const columns: { field: keyof TableDataItem; headerName: string }[] = [
    { field: 'id', headerName: 'စဉ်' },
    { field: 'isFollowUp', headerName: 'နောက်ဆက်တွဲ' },
    { field: 'source', headerName: 'သတင်းအရင်းအမြစ်' },
    { field: 'reportNumber', headerName: 'အစီရင်ခံစာအမှတ်' },
    { field: 'reportDate', headerName: 'သတင်းတင်ပြသည့်ရက်စွဲ' },
    { field: 'caseDate', headerName: 'ဖြစ်ပွားသည့် နေ့စွဲ' },
    { field: 'state', headerName: 'တိုင်းနှင့်ပြည်နယ်' },
    { field: 'district', headerName: 'ခရိုင်' },
    { field: 'township', headerName: 'မြို့နယ်' },
    { field: 'town', headerName: 'မြို့' },
    { field: 'quarter', headerName: 'ရပ်ကွက်' },
    { field: 'village', headerName: 'ကျေးရွာ' },
    { field: 'locationDetail', headerName: 'တည်နေရာအသေးစိတ်' },
    { field: 'mgrs', headerName: 'MGRS' },
    { field: 'mainCategory', headerName: 'ပင်မကဏ္ဍကြီးများ' },
    { field: 'primaryCategory', headerName: 'သတင်းအမျိုးအစား' },
    { field: 'secondaryCategory', headerName: 'ဒုတိယအဆင့်သတင်းအမျိုးအစားခွဲများ' },
    { field: 'thirdCategory', headerName: 'တတိယအဆင့်သတင်းအမျိုးအစားခွဲများ' },
    { field: 'fourthCategory', headerName: 'စတုတ္ထအဆင့်သတင်းအမျိုးအစားခွဲများ' },
    { field: 'actorGroups', headerName: 'ပါဝင်သူအုပ်စုကြီး' },
    { field: 'actors', headerName: 'ပါဝင်သူများ' },
    { field: 'countries', headerName: 'နိုင်ငံများ' },
    { field: 'newsContent', headerName: 'သတင်းတင်ပြချက်' },
    { field: 'urls', headerName: 'Opensource Link' },
    { field: 'SACDid', headerName: 'ပြုလုပ်သူ' },
    { field: 'infrastructures', headerName: 'ရုပ်ဝတ္တုပစ္စည်း' },
    { field: 'effectRange', headerName: 'သက်ရောက်မှု' },
    { field: 'sacName', headerName: 'ရန်သူ့တပ်အမည်များ' },
    { field: 'sacAdmin', headerName: 'ရန်သူအုပ်ချုပ်မှု' },
    { field: 'sacLost', headerName: 'ဆုံးရှုံးမှု (ရန်သူ့တပ်)' },
    { field: 'alliesName', headerName: 'မိမိတပ်အမည်များ' },
    { field: 'alliesLost', headerName: 'ဆုံးရှုံးမှု (မိမိတပ်)' },
    { field: 'sacDeath', headerName: 'သေဆုံးအရေအတွက် (ရန်သူ့တပ်)' },
    { field: 'sacInjury', headerName: 'ထိခိုက်ဒဏ်ရာရရှိမှု (ရန်သူတပ်)' },
    { field: 'sacCaptive', headerName: 'သုံ့ပန်း (ရန်သူတပ်သား)' },
    { field: 'alliesDeath', headerName: 'သေဆုံးအရေအတွက် (မိမိတပ်)' },
    { field: 'alliesInjury', headerName: 'ထိခိုက်ဒဏ်ရာရရှိမှု (မိမိတပ်)' },
    { field: 'alliesCaptive', headerName: 'သုံ့ပန်း (မိမိတပ်)' },
    { field: 'publicCaptive', headerName: 'ပြည်သူအကျဉ်းကျ' },
    { field: 'publicInjury', headerName: 'ပြည်သူဒဏ်ရာရ' },
    { field: 'publicDeath', headerName: 'ပြည်သူသေဆုံး' },
    { field: 'publicBuilding', headerName: 'ပြည်သူပိုင်အဆောက်အအုံ' },
    { field: 'religionBuilding', headerName: 'ဘာသာရေးအဆောက်အအုံ' },
    { field: 'hospital', headerName: 'ဆေးရုံ' },
    { field: 'schools', headerName: 'ကျောင်း' },
    { field: 'refugeeCamp', headerName: 'ဒုက္ခသည်စခန်း' },
    { field: 'remark', headerName: 'မှတ်ချက်' },
  ];

  // Helper: Columns to export (exclude 'id')
  const exportColumns = columns.filter(col => col.field !== 'id');

  // Helper: Convert table data to tab-separated values
  const getTSV = () => {
    // const header = exportColumns.map(col => col.headerName).join('\t');
    const rows = tableData.map(row =>
      exportColumns.map(col => {
        const value = row[col.field];
        return value === null || value === undefined ? '' : String(value).replace(/\t/g, ' ');
      }).join('\t')
    );
    return rows.join('\n');
  };

  // Helper: Convert table data to CSV
  const getCSV = () => {
    const header = exportColumns.map(col => `"${col.headerName.replace(/"/g, '""')}"`).join(',');
    const rows = tableData.map(row =>
      exportColumns.map(col => {
        let value = row[col.field];
        if (value === null || value === undefined) return '';
        value = String(value).replace(/"/g, '""');
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    );
    return [header, ...rows].join('\r\n');
  };

  // Copy to clipboard handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getTSV());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch (e) {
      setCopySuccess(false);
    }
  };

  // Download CSV handler
  const handleDownloadCSV = () => {
    const csv = getCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'news_table.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      p: 3 
    }}>
      {/* Header with Back Button and Actions */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        borderBottom: '1px solid #e0e0e0',
        pb: 2
      }}>
        {onBack && (
          <Button
            startIcon={<ArrowBack />}
            onClick={onBack}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
        )}
        <Typography variant="h5">
          Table View
        </Typography>
        <Chip
          label={`${tableData.length} items`}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ ml: 2 }}
        />
        {/* Spacer */}
        <Box sx={{ flex: 1 }} />
        {/* Actions */}
        <Tooltip title={copySuccess ? 'Copied!' : ''}>
          <IconButton color="primary" onClick={handleCopy} sx={{ ml: 1 }}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download as CSV">
          <IconButton color="primary" onClick={handleDownloadCSV} sx={{ ml: 1 }}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {/* Snackbar for copy success */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setCopySuccess(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
          Copied to clipboard!
        </MuiAlert>
      </Snackbar>
      
      {/* Table */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TableContainer 
          component={Paper} 
          sx={{ 
            height: '100%',
            '& .MuiTable-root': {
              minWidth: 650,
            }
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell 
                    key={column.field}
                    sx={{ 
                      fontWeight: 'bold',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      minWidth: 120
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  sx={{ height: 48 }}
                  key={row.id}
                  style={{ cursor: 'pointer' }}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={column.field}
                      sx={{
                        fontWeight: 'medium',
                        color: 'text.secondary',
                        maxWidth: 180,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        height: 48,
                        verticalAlign: 'middle',
                        padding: '8px 12px',
                      }}
                    >
                      {row[column.field as keyof TableDataItem] || 'N/A'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}; 