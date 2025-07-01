import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, AppContextType, FileData, ExtractedDocumentData } from '../types';
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
  | { type: 'UPDATE_NEWS_ITEM'; payload: { id: string; content: string } };

// Initial state
const initialState: AppState = {
  uploadedFile: null,
  isLoading: false,
  error: null,
  extractedData: null,
  documentData: null,
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
      return { ...state, uploadedFile: null, extractedData: null, documentData: null, error: null, currentStep: 'newsList' };
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
        const newsItems = NewsExtractor.extractNewsItems(fileData.rawText);
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

  const contextValue: AppContextType = {
    ...state,
    uploadFile,
    clearFile,
    setError,
    setExtractedData,
    setCurrentStep,
    updateDocumentData,
    updateNewsItem,
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