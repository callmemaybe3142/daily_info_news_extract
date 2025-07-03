import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, AppContextType, FileData, ExtractedDocumentData, TableDataItem } from '../types';
import { FileService } from '../services/fileService';
import { BurmeseConverter } from '../utils/burmeseConverter';
import { NewsExtractor } from '../utils/newsExtractor';

// Define action types
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILE'; payload: FileData }
  | { type: 'CLEAR_FILE' }
  | { type: 'SET_EXTRACTED_DATA'; payload: any[] }
  | { type: 'SET_CURRENT_STEP'; payload: 'newsList' | 'tableView' }
  | { type: 'UPDATE_DOCUMENT_DATA'; payload: Partial<ExtractedDocumentData> }
  | { type: 'UPDATE_NEWS_ITEM'; payload: { id: string; content: string } }
  | { type: 'SET_TABLE_DATA'; payload: TableDataItem[] }
  | { type: 'UPDATE_TABLE_ITEM'; payload: TableDataItem };

// Initial state
const initialState: AppState = {
  uploadedFile: null,
  isLoading: false,
  error: null,
  extractedData: null,
  documentData: null,
  tableData: null,
  currentStep: 'newsList',
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FILE':
      return { ...state, uploadedFile: action.payload, error: null };
    case 'CLEAR_FILE':
      return { ...state, uploadedFile: null, extractedData: null, documentData: null, tableData: null, error: null, currentStep: 'newsList' };
    case 'SET_EXTRACTED_DATA':
      return { ...state, extractedData: action.payload };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_DOCUMENT_DATA':
      return { ...state, documentData: { newsItems: [], ...state.documentData, ...action.payload } as ExtractedDocumentData };
    case 'UPDATE_NEWS_ITEM':
      if (state.documentData?.newsItems) {
        const updatedNewsItems = state.documentData.newsItems.map(item =>
          item.id === action.payload.id
            ? { 
                ...item, 
                content: action.payload.content,
                urls: NewsExtractor.extractUrls ? NewsExtractor.extractUrls(action.payload.content) : item.urls
              }
            : item
        );
        return {
          ...state,
          documentData: { ...state.documentData, newsItems: updatedNewsItems }
        };
      }
      return state;
    case 'SET_TABLE_DATA':
      return { ...state, tableData: action.payload };
    case 'UPDATE_TABLE_ITEM':
      if (state.tableData) {
        const updatedTableData = state.tableData.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
        return { ...state, tableData: updatedTableData };
      }
      return state;
    default:
      return state;
  }
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const uploadFile = async (file: File): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Validate file
      const validation = FileService.validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Process file
      const fileData = await FileService.processDocxFile(file);
      dispatch({ type: 'SET_FILE', payload: fileData });

      // Extract document data after file is processed
      if (fileData.rawText) {
        const reportDate = BurmeseConverter.extractReportDate(fileData.rawText);
        const newsItems = await NewsExtractor.extractNewsItems(fileData.rawText);
        dispatch({ type: 'UPDATE_DOCUMENT_DATA', payload: { reportDate, newsItems } });
      } else {
        dispatch({ type: 'UPDATE_DOCUMENT_DATA', payload: { reportDate: null, newsItems: [] } });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearFile = (): void => {
    dispatch({ type: 'CLEAR_FILE' });
  };

  const setError = (error: string | null): void => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setExtractedData = (data: any[]): void => {
    dispatch({ type: 'SET_EXTRACTED_DATA', payload: data });
  };

  const setCurrentStep = (step: 'newsList' | 'tableView'): void => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  };

  const updateDocumentData = (data: Partial<ExtractedDocumentData>): void => {
    dispatch({ type: 'UPDATE_DOCUMENT_DATA', payload: data });
  };

  const updateNewsItem = (id: string, content: string): void => {
    dispatch({ type: 'UPDATE_NEWS_ITEM', payload: { id, content } });
  };

  const generateTableData = (): void => {
    if (state.documentData) {
      const tableData: TableDataItem[] = [];
      let idCounter = 1;
      
      state.documentData.newsItems.forEach(item => {
        // If no categories, create one row with empty categories
        if (item.categories.length === 0) {
          tableData.push({
            id: idCounter++,
            isFollowUp: false,
            source: item.source,
            reportNumber: item.index,
            reportDate: state.documentData?.reportDate || null,
            caseDate: item.caseDate,
            state: item.location.state,
            district: item.location.district,
            township: item.location.township,
            town: item.location.town,
            quarter: item.location.quarter,
            village: item.location.village,
            locationDetail: item.location.locationDetail,
            mgrs: item.location.mgrs,
            mainCategory: '',
            primaryCategory: '',
            secondaryCategory: '',
            thirdCategory: null,
            fourthCategory: null,
            actorGroups: null,
            actors: null,
            countries: null,
            newsContent: item.content,
            urls: item.urls.length > 0 ? item.urls.join(', ') : '-',
            SACDid: false,
            infrastructures: null,
            effectRange: null,
            sacName: null,
            sacAdmin: null,
            sacLost: false,
            alliesName: null,
            alliesLost: false,
            sacDeath: null,
            sacInjury: null,
            sacCaptive: null,
            alliesDeath: null,
            alliesInjury: null,
            alliesCaptive: null,
            publicCaptive: null,
            publicInjury: null,
            publicDeath: null,
            publicBuilding: null,
            religionBuilding: null,
            hospital: null,
            schools: null,
            refugeeCamp: null,
            remark: null
          });
        } else {
          // Create a row for each category
          item.categories.forEach((category, categoryIndex) => {
            tableData.push({
              id: idCounter++,
              isFollowUp: false,
              source: categoryIndex === 0 ? item.source : 'Duplicate',
              reportNumber: item.index,
              reportDate: state.documentData?.reportDate || null,
              caseDate: item.caseDate,
              state: item.location.state,
              district: item.location.district,
              township: item.location.township,
              town: item.location.town,
              quarter: item.location.quarter,
              village: item.location.village,
              locationDetail: item.location.locationDetail,
              mgrs: item.location.mgrs,
              mainCategory: category.main_category,
              primaryCategory: category.primary_category,
              secondaryCategory: category.secondary_category,
              thirdCategory: null,
              fourthCategory: null,
              actorGroups: null,
              actors: null,
              countries: null,
              newsContent: item.content,
              urls: item.urls.length > 0 ? item.urls.join(', ') : '-',
              SACDid: false,
              infrastructures: null,
              effectRange: null,
              sacName: null,
              sacAdmin: null,
              sacLost: false,
              alliesName: null,
              alliesLost: false,
              sacDeath: null,
              sacInjury: null,
              sacCaptive: null,
              alliesDeath: null,
              alliesInjury: null,
              alliesCaptive: null,
              publicCaptive: null,
              publicInjury: null,
              publicDeath: null,
              publicBuilding: null,
              religionBuilding: null,
              hospital: null,
              schools: null,
              refugeeCamp: null,
              remark: null
            });
          });
        }
      });
      
      dispatch({ type: 'SET_TABLE_DATA', payload: tableData });
    }
  };

  const updateTableItem = (item: TableDataItem): void => {
    dispatch({ type: 'UPDATE_TABLE_ITEM', payload: item });
  };

  const contextValue: AppContextType = {
    ...state,
    uploadFile,
    clearFile,
    setError,
    setExtractedData,
    setCurrentStep,
    updateDocumentData,
    updateNewsItem,
    generateTableData,
    updateTableItem,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 