import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/toaster'
// import SiteHeader  from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* <SiteHeader /> */}
      <App />
      <Toaster />
    <SiteFooter className="mt-auto"/>
    </BrowserRouter >
  </StrictMode>,
)
