import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.createElement('div');
// root.id = 'parrot-app-root';
document.documentElement.appendChild(root);
createRoot(root).render(<App />);
