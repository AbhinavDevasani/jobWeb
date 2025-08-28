import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './Context/AuthProvider.jsx'
import { BrowserRouter} from 'react-router'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( 
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
      
          <App />
        
        </BrowserRouter>
       </AuthProvider>
     
    </StrictMode>
    
  
)
