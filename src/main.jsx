import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContactsApp from './ContactsApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactsApp />
  </StrictMode>,
)
