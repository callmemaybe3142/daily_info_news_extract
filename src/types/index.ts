export interface FileData {
  name: string;
  size: number;
  lastModified: number;
  content: string;
  rawText?: string;
}

export interface CategoryInfo {
  main_category: string;
  primary_category: string;
  secondary_category: string;
}

export interface LocationInfo {
  state: string | null;
  district: string | null;
  township: string | null;
  town: string | null;
  quarter: string | null;
  village: string | null;
  locationDetail: string | null;
  mgrs: string | null;
}

export interface NewsItem {
  id: string;
  originalText: string;
  content: string;
  index: number;
  urls: string[];
  caseDate: string | null;
  source: string | null;
  categories: CategoryInfo[];
  location: LocationInfo;
}

export interface ExtractedDocumentData {
  reportDate: string | null;
  newsItems: NewsItem[];
}

export interface TableDataItem {
  id: number;
  isFollowUp: boolean;
  source: string | null;
  reportNumber: number;
  reportDate: string | null;
  caseDate: string | null;
  state: string | null;
  district: string | null;
  township: string | null;
  town: string | null;
  quarter: string | null;
  village: string | null;
  locationDetail: string | null;
  mgrs: string | null;
  mainCategory: string;
  primaryCategory: string;
  secondaryCategory: string;
  thirdCategory: string | null;
  fourthCategory: string | null;
  actorGroups: string | null;
  actors: string | null;
  countries: string | null;
  newsContent: string;
  urls: string;
  SACDid: boolean;
  infrastructures: string | null;
  effectRange: string | null;
  sacName: string | null;
  sacAdmin: string | null;
  sacLost: boolean;
  alliesName: string | null;
  alliesLost: boolean;
  sacDeath: number | null;
  sacInjury: number | null;
  sacCaptive: number | null;
  alliesDeath: number | null;
  alliesInjury: number | null;
  alliesCaptive: number | null;
  publicCaptive: number | null;
  publicInjury: number | null;
  publicDeath: number | null;
  publicBuilding: number | null;
  religionBuilding: number | null;
  hospital: number | null;
  schools: number | null;
  refugeeCamp: number | null;
  remark: string | null;
}

export interface AppState {
  uploadedFile: FileData | null;
  isLoading: boolean;
  error: string | null;
  extractedData: any[] | null;
  documentData: ExtractedDocumentData | null;
  tableData: TableDataItem[] | null;
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
  generateTableData: () => void;
}

export interface MammothResult {
  value: string;
  messages: any[];
} 