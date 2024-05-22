import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "@fontsource/heebo/200.css"
import "@fontsource/heebo/400.css";
import "@fontsource/heebo/600.css"
import "@fontsource/heebo/800.css"
import axios from 'axios'
import './stores/SubjectsDomain/SubjectsDomainStore.ts'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
