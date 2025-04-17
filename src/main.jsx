import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from 'react-router-dom';
import './index.css'


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
  <ThemeProvider>
      <App />
    </ThemeProvider>
    </BrowserRouter>
 
)
