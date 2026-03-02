import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './Context/AuthProvider.jsx'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>

        <App />
        <ToastContainer position="top-right" autoClose={3000} />

      </BrowserRouter>
    </AuthProvider>

  </StrictMode>


)
