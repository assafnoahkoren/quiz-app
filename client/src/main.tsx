import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "@fontsource/heebo/200.css"
import "@fontsource/heebo/400.css";
import "@fontsource/heebo/600.css"
import "@fontsource/heebo/800.css"
import './stores/SubjectsDomain/SubjectsDomainStore.ts'
import 'virtual:uno.css'
import { authStore } from './stores/AuthStore.ts'
import { uiStore } from './stores/UIStore.ts'
import { dataStore } from './stores/DataStore.ts'
import { quizStore } from './stores/QuizStore.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

//@ts-expect-error ...
window.rootStore = {
  authStore,
  uiStore,
  dataStore,
  quizStore,
}