export class BurmeseConverter {
  private static readonly burmeseDigits = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

  static burmeseToEnglishNumber(burmeseNumber: string): string {
    let englishNumber = '';
    for (const char of burmeseNumber.split('')) {
      const digitIndex = this.burmeseDigits.indexOf(char);
      if (digitIndex !== -1) {
        englishNumber += digitIndex.toString();
      } else {
        englishNumber += char;
      }
    }
    return englishNumber;
  }

  static extractReportDate(content: string): string | null {
    // Pattern to match "ရက်စွဲ" followed by optional spaces, dash, and date components
    // Handles various spacing patterns like:
    // ရက်စွဲ - ၁ - ၆ - ၂၀၂၅
    // ရက်စွဲ - ၂-၆-၂၀၂၅
    // ရက်စွဲ-၇-၆-၂၀၂၅
    // Captures Burmese digits, spaces, and dashes until line break
    const datePattern = /ရက်စွဲ\s*-\s*([\u1040-\u1049\s\-]+?)(?=\s*[\n\r]|$)/;
    const match = content.match(datePattern);
    
    if (match && match[1]) {
      let burmeseDate = match[1].trim();
      
      // Convert Burmese digits to English first
      const englishDate = this.burmeseToEnglishNumber(burmeseDate);
      
      // Normalize the date string: replace multiple spaces and dashes with single dash
      // This handles cases like "1 - 6 - 2025" or "2-6-2025"
      const normalizedDate = englishDate
        .replace(/\s*-\s*/g, '-')  // Replace " - " or "- " or " -" with "-"
        .replace(/\s+/g, '-')      // Replace remaining spaces with "-"
        .replace(/-+/g, '-');      // Replace multiple dashes with single dash
      
      const parts = normalizedDate.split('-').filter(part => part.length > 0);
        
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${day}/${month}/${year}`;
      }
    }
    
    return null;
  }
} 