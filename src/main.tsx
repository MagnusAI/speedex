import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/fonts/Alice/Alice-Regular.ttf'
import './assets/fonts/Sacramento/Sacramento-Regular.ttf'
import './assets/fonts/PlusJakartaSans/PlusJakartaSans-Regular.ttf'
import './assets/fonts/PlusJakartaSans/PlusJakartaSans-Bold.ttf'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
