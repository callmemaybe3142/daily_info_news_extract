// @ts-ignore
import mammoth from 'mammoth';
import type { FileData, MammothResult, TableDataItem } from '../types';
import Papa from 'papaparse';


export class FileService {
  static validateFile(file: File): { isValid: boolean; error?: string } {
    if (!file.name.toLowerCase().endsWith('.docx')) {
      return { isValid: false, error: 'Please upload a .docx file' };
    }

    return { isValid: true };
  }

  static async processDocxFile(file: File): Promise<FileData> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result: MammothResult = await mammoth.convertToHtml({ arrayBuffer });
      
      // Also extract plain text for data processing
      const textResult = await mammoth.extractRawText({ arrayBuffer });
      
      if (result.messages.length > 0) {
        console.warn('Mammoth warnings:', result.messages);
      }

      return {
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        content: result.value,
        rawText: textResult.value,
      };
    } catch (error) {
      console.error('Error processing docx:', error);
      throw new Error('Error reading the docx file. Please make sure it\'s a valid document.');
    }
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static async parseCSVFile(file: File): Promise<TableDataItem[]> {
    const burmeseToFieldMap: Record<string, keyof TableDataItem> = {
      'စဉ်': 'id',
      'နောက်ဆက်တွဲ': 'isFollowUp',
      'သတင်းအရင်းအမြစ်': 'source',
      'အစီရင်ခံစာအမှတ်': 'reportNumber',
      'သတင်းတင်ပြသည့်ရက်စွဲ': 'reportDate',
      'ဖြစ်ပွားသည့် နေ့စွဲ': 'caseDate',
      'တိုင်းနှင့်ပြည်နယ်': 'state',
      'ခရိုင်': 'district',
      'မြို့နယ်': 'township',
      'မြို့': 'town',
      'ရပ်ကွက်': 'quarter',
      'ကျေးရွာ': 'village',
      'တည်နေရာအသေးစိတ်': 'locationDetail',
      'MGRS': 'mgrs',
      'ပင်မကဏ္ဍကြီးများ': 'mainCategory',
      'သတင်းအမျိုးအစား': 'primaryCategory',
      'ဒုတိယအဆင့်သတင်းအမျိုးအစားခွဲများ': 'secondaryCategory',
      'တတိယအဆင့်သတင်းအမျိုးအစားခွဲများ': 'thirdCategory',
      'စတုတ္ထအဆင့်သတင်းအမျိုးအစားခွဲများ': 'fourthCategory',
      'ပါဝင်သူအုပ်စုကြီး': 'actorGroups',
      'ပါဝင်သူများ': 'actors',
      'နိုင်ငံများ': 'countries',
      'သတင်းတင်ပြချက်': 'newsContent',
      'Opensource Link': 'urls',
      'ပြုလုပ်သူ': 'SACDid',
      'ရုပ်ဝတ္တုပစ္စည်း': 'infrastructures',
      'သက်ရောက်မှု': 'effectRange',
      'ရန်သူ့တပ်အမည်များ': 'sacName',
      'ရန်သူအုပ်ချုပ်မှု': 'sacAdmin',
      'ဆုံးရှုံးမှု (ရန်သူ့တပ်)': 'sacLost',
      'မိမိတပ်အမည်များ': 'alliesName',
      'ဆုံးရှုံးမှု (မိမိတပ်)': 'alliesLost',
      'သေဆုံးအရေအတွက် (ရန်သူ့တပ်)': 'sacDeath',
      'ထိခိုက်ဒဏ်ရာရရှိမှု (ရန်သူတပ်)': 'sacInjury',
      'သုံ့ပန်း (ရန်သူတပ်သား)': 'sacCaptive',
      'သေဆုံးအရေအတွက် (မိမိတပ်)': 'alliesDeath',
      'ထိခိုက်ဒဏ်ရာရရှိမှု (မိမိတပ်)': 'alliesInjury',
      'သုံ့ပန်း (မိမိတပ်)': 'alliesCaptive',
      'ပြည်သူအကျဉ်းကျ': 'publicCaptive',
      'ပြည်သူဒဏ်ရာရ': 'publicInjury',
      'ပြည်သူသေဆုံး': 'publicDeath',
      'ပြည်သူပိုင်အဆောက်အအုံ': 'publicBuilding',
      'ဘာသာရေးအဆောက်အုံ': 'religionBuilding',
      'ဆေးရုံ': 'hospital',
      'ကျောင်း': 'schools',
      'ဒုက္ခသည်စခန်း': 'refugeeCamp',
      'မှတ်ချက်': 'remark',
    };
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors && results.errors.length > 0) {
            reject(results.errors);
            return;
          }
          // Map Burmese keys to TableDataItem keys and convert booleans
          const booleanFields = ['isFollowUp', 'SACDid', 'sacLost', 'alliesLost'];
          const data = (results.data as any[]).map((row, idx) => {
            const mapped: any = { id: idx + 1 };
            Object.entries(row).forEach(([key, value]) => {
              const field = burmeseToFieldMap[key];
              if (field) {
                if (booleanFields.includes(field)) {
                  mapped[field] = value === true || value === 'true';
                } else {
                  mapped[field] = value;
                }
              }
            });
            return mapped;
          });
          resolve(data as TableDataItem[]);
        },
        error: (error) => reject(error),
      });
    });
  }
} 