import { BurmeseConverter } from './burmeseConverter';

export class DateTimeExtractor {
  private static readonly burmeseMonths: Record<string, string> = {
    'ဇန်နဝါရီလ': '01',
    'ဖေဖော်ဝါရီလ': '02',
    'မတ်လ': '03',
    'ဧပြီလ': '04',
    'မေလ': '05',
    'ဇွန်လ': '06',
    'ဇူလိုင်လ': '07',
    'သြဂုတ်လ': '08',
    'စက်တင်ဘာလ': '09',
    'အောက်တိုဘာလ': '10',
    'နိုဝင်ဘာလ': '11',
    'ဒီဇင်ဘာလ': '12'
  };

  private static isValidYear(year: string): boolean {
    try {
      const yearNum = parseInt(year, 10);
      return 2020 <= yearNum && yearNum <= 2050;
    } catch (e) {
      return false;
    }
  }

  static extractDateTime(newsText: string): { date: string | null; time: string | null } {
    try {
      // Create month pattern
      const monthsPattern = Object.keys(this.burmeseMonths).join('|');
      
      // Pattern for datetime with time
      const datetimePattern = new RegExp(
        `([\\u1040-\\u1049]+)\\s+(${monthsPattern})\\s+([\\u1040-\\u1049]+)\\s*ချိန်`
      );
      
      // Pattern for date only
      const dateOnlyPattern = new RegExp(
        `([\\u1040-\\u1049]+)\\s+(${monthsPattern})\\s+([\\u1040-\\u1049]+)\\s*ရက်`
      );
      
      // Try datetime pattern first
      let match = newsText.match(datetimePattern);
      if (match) {
        const year = BurmeseConverter.burmeseToEnglishNumber(match[1]!);
        if (!this.isValidYear(year)) {
          return { date: null, time: null };
        }
        
        const month = this.burmeseMonths[match[2]!];
        const numberStr = BurmeseConverter.burmeseToEnglishNumber(match[3]!);
        
        if (numberStr.length >= 6) {
          const day = numberStr.substring(0, 2);
          const hour = numberStr.substring(2, 4);
          const minute = numberStr.substring(4, 6);
          return { 
            date: `${day}/${month}/${year}`, 
            time: `${hour}:${minute}` 
          };
        }
      }
      
      // Try date only pattern
      match = newsText.match(dateOnlyPattern);
      if (match) {
        const year = BurmeseConverter.burmeseToEnglishNumber(match[1]!);
        if (!this.isValidYear(year)) {
          return { date: null, time: null };
        }
        
        const month = this.burmeseMonths[match[2]!];
        const day = BurmeseConverter.burmeseToEnglishNumber(match[3]!);
        return { 
          date: `${day.padStart(2, '0')}/${month}/${year}`, 
          time: null 
        };
      }
      
      return { date: null, time: null };
    } catch (e) {
      console.error('Error extracting datetime:', e);
      return { date: null, time: null };
    }
  }

  static extractCaseDate(newsText: string): string | null {
    const result = this.extractDateTime(newsText);
    return result.date;
  }
} 