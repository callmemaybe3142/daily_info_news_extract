import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  IconButton,
  Chip,
  Link,
  Divider,
} from '@mui/material';
import {
  Article,
  Edit,
  Save,
  Cancel,
  AutoAwesome,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useApp } from '../contexts/AppContext';
import type { NewsItem } from '../types';

interface NewsExtractionProps {
  className?: string;
}

interface EditingState {
  [key: string]: boolean;
}

interface EditingContent {
  [key: string]: string;
}

export const NewsExtraction: React.FC<NewsExtractionProps> = ({ className }) => {
  const { documentData, updateNewsItem } = useApp();
  const [editing, setEditing] = useState<EditingState>({});
  const [editingContent, setEditingContent] = useState<EditingContent>({});

  const newsItems = documentData?.newsItems || [];

  const handleEditStart = (item: NewsItem) => {
    setEditing({ ...editing, [item.id]: true });
    setEditingContent({ ...editingContent, [item.id]: item.content });
  };

  const handleEditSave = (item: NewsItem) => {
    const newContent = editingContent[item.id] || item.content;
    updateNewsItem(item.id, newContent);
    setEditing({ ...editing, [item.id]: false });
    setEditingContent({ ...editingContent, [item.id]: '' });
  };

  const handleEditCancel = (item: NewsItem) => {
    setEditing({ ...editing, [item.id]: false });
    setEditingContent({ ...editingContent, [item.id]: '' });
  };

  const handleContentChange = (itemId: string, content: string) => {
    setEditingContent({ ...editingContent, [itemId]: content });
  };



  if (!documentData || newsItems.length === 0) {
    return (
      <Card className={className} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Article sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">
              Extracted News
            </Typography>
          </Box>
          
          <Box sx={{ 
            border: '2px dashed #e0e0e0', 
            borderRadius: 2, 
            p: 4, 
            textAlign: 'center',
            backgroundColor: '#fafafa'
          }}>
            <Typography variant="body1" color="text.secondary">
              No news items found in the document
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className} sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Article sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">
            Extracted News
          </Typography>
          <Chip
            icon={<AutoAwesome />}
            label={`${newsItems.length} items`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ ml: 2 }}
          />
        </Box>

        <Box 
          sx={{ 
            maxHeight: '600px',
            overflowY: 'auto',
            overflowX: 'hidden',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            backgroundColor: '#fafafa',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#a8a8a8',
              },
            },
          }}
        >
          <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {newsItems.map((item) => {
              const isEditing = editing[item.id];
              const currentContent = isEditing ? editingContent[item.id] : item.content;

              return (
                <Card 
                  key={item.id}
                  variant="outlined" 
                  sx={{ 
                    width: '100%',
                    transition: 'all 0.2s',
                    backgroundColor: 'white',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: 2,
                    }
                  }}
                >
                  {/* Edit Button - Absolute positioned */}
                  {!isEditing && (
                    <IconButton 
                      onClick={() => handleEditStart(item)}
                      sx={{ 
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        width: 32,
                        height: 32,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        }
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  )}

                  {/* Save/Cancel Buttons - Absolute positioned */}
                  {isEditing && (
                    <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 1 }}>
                      <IconButton 
                        onClick={() => handleEditSave(item)}
                        sx={{ 
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          width: 32,
                          height: 32,
                          '&:hover': {
                            backgroundColor: 'rgba(76, 175, 80, 0.2)',
                          }
                        }}
                      >
                        <Save fontSize="small" color="success" />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleEditCancel(item)}
                        sx={{ 
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                          width: 32,
                          height: 32,
                          '&:hover': {
                            backgroundColor: 'rgba(244, 67, 54, 0.2)',
                          }
                        }}
                      >
                        <Cancel fontSize="small" color="error" />
                      </IconButton>
                    </Box>
                  )}

                  <CardContent sx={{ pb: 2, pr: 6 }}>
                    {isEditing ? (
                      <TextField
                        multiline
                        fullWidth
                        rows={8}
                        value={editingContent[item.id] || ''}
                        onChange={(e) => handleContentChange(item.id, e.target.value)}
                        variant="outlined"
                        size="small"
                        placeholder="Edit news content..."
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            lineHeight: 1.6,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            color: 'text.primary',
                            mt: 1
                          }}
                        >
                          {currentContent}
                        </Typography>

                        {/* URLs Section */}
                        {item.urls && item.urls.length > 0 && (
                          <>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <LinkIcon sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
                              <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                Related Links ({item.urls.length})
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {item.urls.map((url, urlIndex) => (
                                <Link
                                  key={urlIndex}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{
                                    fontSize: '0.75rem',
                                    wordBreak: 'break-all',
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    '&:hover': {
                                      textDecoration: 'underline',
                                    }
                                  }}
                                >
                                  {url}
                                </Link>
                              ))}
                            </Box>
                          </>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 