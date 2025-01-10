import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/toaster'
import SiteHeader  from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
// import Si


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='flex h-screen flex-col justify-between'>
      <div className='flex flex-col w-screen justify-center'>
        
        <BrowserRouter>
          <SiteHeader />
          <App />
          <Toaster />
        
        </BrowserRouter >
      </div>
      <SiteFooter className="w-full"/>
    </div>
    
  </StrictMode>
)
