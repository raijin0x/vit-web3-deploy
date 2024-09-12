import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TransactionsProvider } from "./context/TransactionContext";
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <App /> 
  </StrictMode>,
)
