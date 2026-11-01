import React from 'react';
import { createRoot } from 'react-dom/client';
// Fonts are bundled locally (no Google Fonts request), with system fallbacks in designTokens.css
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-600-italic.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-700.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './styles/designTokens.css';
import './styles/globalStyles.css';
import App from './App.jsx';
import { ProgressProvider } from './hooks/useProgress.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </React.StrictMode>
);
