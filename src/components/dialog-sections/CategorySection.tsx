import React from 'react';
import { Typography, Box, TextField, Paper } from '@mui/material';
import type { TableDataItem } from '../../types';
import TypeaheadSingle from '../common/TypeaheadSingle';

interface CategorySectionProps {
  formData: TableDataItem;
  onChange: (field: keyof TableDataItem, value: any) => void;
}

const thirdCategoryOptions = [
"စခန်းသိမ်းခြင်း",
"စီးနင်းတိုက်ခိုက်ခြင်း",
"လေကြောင်းတိုက်ခိုက်ခြင်း",
"လက်နက်ကြီးဖြင့်တစ်ဖက်သတ်ပစ်ခတ်ခြင်း",
"စစ်ကြောင်းကိုကြားဖြတ်တိုက်ခိုက်ခြင်း",
"ယာဉ်တန်းကိုကြားဖြတ်တိုက်ခိုက်ခြင်း",
"ရင်ဆိုင်တိုက်ပွဲ",
"ပြောက်ကျားပစ်ခတ်တိုက်ခိုက်ခြင်း",
"ဖောက်ခွဲတိုက်ခိုက်ခြင်း",
"ဖမ်းဆီးခြင်း",
"အကြမ်းဖက်သတ်ဖြတ်ခြင်း",
"အကြမ်းဖက်ရမ်းကားပစ်ခတ်ခြင်း",
"လိင်ပိုင်းဆိုင်ရာအကြမ်းဖက်မှု",
"စီးနင်းခြင်း",
"လုယက်ခြင်း",
"ခြိမ်းခြောက်ခြင်း",
"မီးရှို့ဖျက်ဆီးခြင်း",
"လေကြောင်းဖြင့်အကြမ်းဖက်ခြင်း",
"မြို့ရွာများကိုလက်နက်ကြီးဖြင့်ပစ်ခတ်ခြင်း",
"လူသားဒိုင်း/ပေါ်တာအသုံးပြုခြင်း",
"မြေမြှုပ်မိုင်း/နင်းမိုင်းများအသုံးပြုခြင်း",
"ထောင်ချခြင်းနှင့်ထောင်တွင်းအကြမ်းဖက်ခြင်း",
"ချိတ်ပိတ်ခြင်း",
"အကြမ်းဖက်ညှင်းပမ်းနှိပ်စက်ခြင်း",
"အခြား",
"စစ်ကြောင်း",
"ယာဉ်တန်း",
"လေကြောင်း",
"ရေကြောင်း",
"မီးရထားလမ်းကြောင်း",
"မြေပြင်စစ်ကြောင်း",
"လက်နက်ထုတ်လုပ်ခြင်း",
"စစ်သင်တန်းပေးခြင်း",
"လက်နက်တပ်ဆင်ခြင်း"
]

const fourthCategoryOptions = [
  "မီးရှို့သတ်ဖြတ်ခြင်း",
"လည်လှီးသတ်ဖြတ်ခြင်း",
"ကိုယ်လက်အင်္ဂါဖြတ်တောက်သတ်ဖြတ်ခြင်း",
"သေနတ်ဖြင့်ပစ်သတ်ခြင်း",
"အခြားလူမဆန်သတ်ဖြတ်ခြင်းများ"
]

const CategorySection: React.FC<CategorySectionProps> = ({ formData, onChange }) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Category Information
        </Typography>
        
        {/* First row - Main categories */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="ပင်မကဏ္ဍကြီးများ"
            value={formData.mainCategory || ''}
            onChange={(e) => onChange('mainCategory', e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="သတင်းအမျိုးအစား"
            value={formData.primaryCategory || ''}
            onChange={(e) => onChange('primaryCategory', e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="ဒုတိယအဆင့်သတင်းအမျိုးအစားခွဲများ"
            value={formData.secondaryCategory || ''}
            onChange={(e) => onChange('secondaryCategory', e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        {/* Second row - Additional categories */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TypeaheadSingle
            label="တတိယအဆင့်သတင်းအမျိုးအစားခွဲများ"
            value={formData.thirdCategory || ''}
            options={thirdCategoryOptions}
            onChange={(value) => onChange('thirdCategory', value)}
            fullWidth
            size="small"
          />
          <TypeaheadSingle
            label="စတုတ္ထအဆင့်သတင်းအမျိုးအစားခွဲများ"
            value={formData.fourthCategory || ''}
            options={fourthCategoryOptions}
            onChange={(value) => onChange('fourthCategory', value)}
            fullWidth
            size="small"
          />
        </Box>
        </Paper>
  );
};

export default CategorySection; 