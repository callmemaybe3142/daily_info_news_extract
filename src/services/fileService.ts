// @ts-ignore
import mammoth from 'mammoth';
import type { FileData, MammothResult } from '../types';

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
} 