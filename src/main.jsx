import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PrivacyProvider } from './context/PrivacyContext.jsx';
import { GlobalEventMonitor } from './services/GlobalEventMonitor.js';
import './index.css';

// Bootstrap global event monitor singleton
GlobalEventMonitor.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivacyProvider>
      <App />
    </PrivacyProvider>
  </React.StrictMode>
);
