import { BurmeseConverter } from './burmeseConverter';
import type { NewsItem } from '../types';

export class NewsExtractor {
  static extractNewsItems(content: string): NewsItem[] {
    try {
      const newsItems: NewsItem[] = [];
      
      // Pattern to find news items: from Burmese number + ။ to ( DIA ... )
      const newsPattern = /([၀-၉]+။)([\s\S]*?\(\s*DIA.*?\))((?:\s*\n\s*(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+|facebook\.com\/[^\s<>"']+))*)/gm;
      const matches = [...content.matchAll(newsPattern)];
      
      if (matches) {
        matches.forEach((match) => {
          const burmeseNumber = match[1].replace('။', '');
          const englishNumber = BurmeseConverter.burmeseToEnglishNumber(burmeseNumber);
          const newsContent = (match[1] + match[2]).trim();
          // URLs block (may be empty)
          const urlsBlock = match[3] || '';
          // Extract URLs from the urlsBlock
          const urls = this.extractUrls(urlsBlock);
          newsItems.push({
            id: `news-${englishNumber}`,
            originalText: newsContent + urlsBlock,
            content: newsContent,
            index: parseInt(englishNumber, 10),
            urls: urls
          });
        });
      }
      
      // Sort by index to maintain order
      return newsItems.sort((a, b) => a.index - b.index);
    } catch (error) {
      console.error('Error extracting news items:', error);
      return [];
    }
  }

  static extractUrls(text: string): string[] {
    try {
      // Comprehensive URL patterns
      const urlPatterns = [
        // HTTP/HTTPS URLs
        /https?:\/\/[^\s<>"]+/gi,
        // URLs starting with www
        /www\.[^\s<>"]+/gi,
        // Facebook URLs (common pattern in news)
        /facebook\.com\/[^\s<>"]+/gi,
        // Generic domain patterns
        /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}\.(?:com|org|net|gov|edu|info|co|io|me|ly|to|cc|tv|fm)[^\s<>"]*/gi
      ];
      
      const urls: string[] = [];
      
      urlPatterns.forEach(pattern => {
        const matches = text.match(pattern);
        if (matches) {
          matches.forEach(url => {
            // Clean up the URL
            let cleanUrl = url.trim();
            // Remove trailing punctuation
            cleanUrl = cleanUrl.replace(/[.,;!?)\]]+$/, '');
            // Normalize facebook URLs
            if (cleanUrl.match(/^(https?:\/\/)?(www\.)?facebook\.com\//)) {
              // Remove protocol and www
              cleanUrl = cleanUrl.replace(/^(https?:\/\/)?(www\.)?/, '');
              cleanUrl = 'https://' + cleanUrl;
            } else if (cleanUrl.startsWith('www.') && !cleanUrl.startsWith('http')) {
              cleanUrl = 'https://' + cleanUrl;
            }
            // Avoid duplicates (after normalization)
            if (!urls.includes(cleanUrl) && cleanUrl.length > 4) {
              urls.push(cleanUrl);
            }
          });
        }
      });
      
      return urls;
    } catch (error) {
      console.error('Error extracting URLs:', error);
      return [];
    }
  }


} 