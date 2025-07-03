# News Report Processor

A React application built with Material UI for processing docx news report files and extracting data into structured tables.

## Features

### Currently Implemented
- ✅ Modern Material UI interface
- ✅ Clean architecture with separate components
- ✅ React Context API for state management
- ✅ DOCX file upload with drag-and-drop styling
- ✅ File validation (only .docx files accepted, no size limit)
- ✅ Document preview on the left side of the screen
- ✅ File information display (name, size, last modified)
- ✅ Loading states and error handling
- ✅ Responsive layout with mobile support
- ✅ Clear document functionality

### Coming Next
- 🔄 Text extraction and data parsing
- 🔄 Table generation from extracted data
- 🔄 CSV export functionality
- 🔄 Copy to clipboard for Google Sheets

## Architecture

### Clean Component Structure
- **AppContext**: Centralized state management using React Context API
- **FileService**: Handles file processing and validation logic
- **FileUpload**: Component for file upload functionality
- **DocumentPreview**: Component for displaying document content
- **DataExtraction**: Component for data processing (placeholder)

### State Management
The application uses React Context API with useReducer for state management:
- File upload state
- Loading states
- Error handling
- Document content storage
- Future extracted data storage

## Technologies Used

- **React 19** with TypeScript
- **Material UI** for the user interface
- **Mammoth.js** for docx file processing
- **Vite** for development and building
- **React Context API** for state management

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the local development URL (usually `http://localhost:5173`)

3. Click the "Upload DOCX File" button to select a news report document

4. The document content will be displayed in the left panel for preview

5. Use the "X" button to clear the document and upload a new one

## File Structure

```
src/
├── components/
│   ├── FileUpload.tsx       # File upload component
│   ├── DocumentPreview.tsx  # Document preview component
│   └── DataExtraction.tsx   # Data processing component
├── contexts/
│   └── AppContext.tsx       # React Context for state management
├── services/
│   └── fileService.ts       # File processing service
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
├── App.css                 # Application styles
└── index.css               # Global styles
```

## Key Features

### File Processing
- Validates file type and size
- Extracts both HTML content for preview and raw text for processing
- Handles errors gracefully with user-friendly messages

### Responsive Design
- Mobile-first approach
- Stacked layout on mobile devices
- Side-by-side layout on desktop

### Error Handling
- File validation with clear error messages
- Processing error handling
- Loading states during file processing

## Dependencies

- `@mui/material` - Material UI components
- `@mui/icons-material` - Material UI icons
- `@emotion/react` & `@emotion/styled` - Required for Material UI
- `mammoth` - DOCX file processing
- `react` & `react-dom` - React framework

## Next Steps

The next phase will involve:
1. Implementing text parsing logic for news reports
2. Creating a data table component with Material UI Table
3. Adding CSV export functionality
4. Adding clipboard copy functionality for Google Sheets integration
5. Adding data filtering and search capabilities

"NUG",
"NUCC",
"CRPH",
"PDF",
"ပကဖ",
"ပလဖ",
"ပအဖ",
"IEC (Karini) ",
"Chinland Council ",
"ကြားကာလအမျိုးသားအတိုင်ပင်ခံကောင်စီ",
"တိုင်း/ယူနစ်/ပြည်နယ်လွှတ်တော်များ",
"စကစ",
"ရဲ",
"ပျူစောထီး/ပြည်သူ့စစ်",
"BGF",
"အခြားပြည်သူ့စစ်",
"တိုင်းနှင့်ပြည်နယ်အစိုးရများ",
"KIO/KIA",
"ABSDF",
"SNA",
"ULA/AA",
"ALP/ALA",
"ARSA",
"RSO",
"CNF/CNA",
"CDF",
"ZRA",
"CB",
"CNO/CNDF",
"MNTJP/MNDAA",
"PSLF/TNLA",
"UWSP/UWSA",
"PSC/NDAA",
"SSPP/SSA",
"RCSS/SSA",
"PNO",
"PNLO/PNLA",
"PNDF",
"LDU",
"KNPP/KA",
"KNLP",
"KNPLF",
"KNDF",
"NMSP/MNLA",
"NMSP-AD",
"KNU/KNLA",
"KTLA",
"DKBA",
"KNLA-PC",
"NLD",
"DPNS",
"USDP",
"NUP",
"NDF",
"PPP",
"SNLD",
"ANP",
"MUP",
"TNP",
"PNO",
"KNDP",
"KSPP",
"CNP",
"LNDP",
"ZCD",
"Unions",
"Strike Forces",
"CDM Forces",
"CSOs",
"NGOs",
"INGOs",
"BPLA",
"BNRA",
"BLDF",
"96 Soliders",
"PIO/PIA",
"PDO/PDA",
"PRA",
"YDF",
"YA",
"SF/SAF",
"LDFs",