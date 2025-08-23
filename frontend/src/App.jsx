
import './App.css'
import { Route,Routes } from 'react-router'
import JobForm from './JobFormPage/JobForm'
import JobList from './JobListPage/JobList'
import RegisterPage from './RegisterPage/RegisterPage'
import JobEdit from './JobEditPage/JobEdit'
import SingleJob from './SingleJobPage/SingleJob'
import JobHome from './JobHomePage/JobHome'
import ErrorPage from './ErrorPage/ErrorPage'
import LoginPage from './LoginPage/Login'
import Accounts from './Accounts/Accounts'
import ProtectedRoute from './ProtectedRoute'
function App() {
  
  return (
    <>
   
      <Routes>
          <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route path="/jobs/new" element={<ProtectedRoute><JobForm></JobForm></ProtectedRoute>}></Route>
          <Route path="/jobs" element={<ProtectedRoute><JobList></JobList></ProtectedRoute>}></Route>
          <Route path="/home" element={<ProtectedRoute><JobHome></JobHome></ProtectedRoute>}></Route>
          <Route path="/jobEdit/:id" element={<ProtectedRoute><JobEdit></JobEdit></ProtectedRoute>}></Route>
          <Route path="/jobs/:id" element={<ProtectedRoute><SingleJob></SingleJob></ProtectedRoute>}></Route>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          <Route path="/account" element={<ProtectedRoute><Accounts></Accounts></ProtectedRoute>}></Route>
      </Routes>
      
    </>
  )
}

export default App
