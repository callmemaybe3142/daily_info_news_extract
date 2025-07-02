export class SourceExtractor {
  private static readonly sourceCodeMapping: Record<string, string> = {
    'I': 'DA',
    'II': 'MI',
    'III': 'PDO',
    'IV': 'G',
    'V': 'OS',
    'VI': 'DB',
    'VII': 'Inter',
    'VIII': 'SI',
    'IX': 'MRC'
  };

  static extractSource(newsContent: string): string | null {
    try {
      // Pattern to match "( DIA ... )" where there can be spaces between ( and DIA
      const diaPattern = /\(\s*DIA[^)]*\)/;
      const match = newsContent.match(diaPattern);
      
      if (!match) {
        return null;
      }

      // Extract the content between parentheses
      const parenthesesContent = match[0].slice(1, -1); // Remove ( and )
      
      // Split by various dash types (–, -, etc.) and trim whitespace
      // Use a more flexible regex to handle different dash characters
      const parts = parenthesesContent.split(/[–\-]/).map(part => part.trim());
      
      // Check if we have at least 3 parts (DIA, source codes, category)
      if (parts.length < 3) {
        return null;
      }

      // Get the second part (source codes) - skip the first part which is "DIA"
      const sourceCodes = parts[1];
      
      if (!sourceCodes) {
        return null;
      }

      // Split source codes by comma and trim whitespace
      const individualCodes = sourceCodes.split(',').map(code => code.trim());
      
      // Convert codes to source names
      const sourceNames: string[] = [];
      
      individualCodes.forEach(code => {
        const sourceName = this.sourceCodeMapping[code];
        if (sourceName) {
          sourceNames.push(sourceName);
        }
      });

      // Return comma-separated source names, or null if no valid sources found
      return sourceNames.length > 0 ? sourceNames.join(', ') : null;
      
    } catch (error) {
      console.error('Error extracting source:', error);
      return null;
    }
  }

  static extractSourceAndCategory(newsContent: string): { source: string | null; category: string | null } {
    try {
      // Pattern to match "( DIA ... )" where there can be spaces between ( and DIA
      const diaPattern = /\(\s*DIA[^)]*\)/;
      const match = newsContent.match(diaPattern);
      
      if (!match) {
        return { source: null, category: null };
      }

      // Extract the content between parentheses
      const parenthesesContent = match[0].slice(1, -1); // Remove ( and )
      
      // Split by various dash types (–, -, etc.) and trim whitespace
      // Use a more flexible regex to handle different dash characters
      const parts = parenthesesContent.split(/[–\-]/).map(part => part.trim());
      
      // Check if we have at least 3 parts (DIA, source codes, category)
      if (parts.length < 3) {
        return { source: null, category: null };
      }

      // Get the second part (source codes) and third part (category)
      const sourceCodes = parts[1];
      const category = parts[2];
      
      if (!sourceCodes) {
        return { source: null, category: category || null };
      }

      // Split source codes by comma and trim whitespace
      const individualCodes = sourceCodes.split(',').map(code => code.trim());
      
      // Convert codes to source names
      const sourceNames: string[] = [];
      
      individualCodes.forEach(code => {
        const sourceName = this.sourceCodeMapping[code];
        if (sourceName) {
          sourceNames.push(sourceName);
        }
      });

      // Return source names and category
      return {
        source: sourceNames.length > 0 ? sourceNames.join(', ') : null,
        category: category || null
      };
      
    } catch (error) {
      console.error('Error extracting source and category:', error);
      return { source: null, category: null };
    }
  }
} 