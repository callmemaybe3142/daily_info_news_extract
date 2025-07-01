export interface FileData {
  name: string;
  size: number;
  lastModified: number;
  content: string;
  rawText?: string;
}

export interface NewsItem {
  id: string;
  originalText: string;
  content: string;
  index: number;
  urls: string[];
}

export interface ExtractedDocumentData {
  reportDate: string | null;
  newsItems: NewsItem[];
}

export interface AppState {
  uploadedFile: FileData | null;
  isLoading: boolean;
  error: string | null;
  extractedData: any[] | null;
  documentData: ExtractedDocumentData | null;
  currentStep: 'newsList' | 'tableView';
}

export interface AppContextType extends AppState {
  uploadFile: (file: File) => Promise<void>;
  clearFile: () => void;
  setError: (error: string | null) => void;
  setExtractedData: (data: any[]) => void;
  setCurrentStep: (step: 'newsList' | 'tableView') => void;
  updateDocumentData: (data: Partial<ExtractedDocumentData>) => void;
  updateNewsItem: (id: string, content: string) => void;
}

export interface MammothResult {
  value: string;
  messages: any[];
} 