
import './App.css'
import { Route, Routes } from 'react-router'
import JobForm from './JobFormPage/JobForm'
import JobList from './JobListPage/JobList'
import AuthPage from './AuthPage/AuthPage'
import JobEdit from './JobEditPage/JobEdit'
import SingleJob from './SingleJobPage/SingleJob'
import JobHome from './JobHomePage/JobHome'
import ErrorPage from './ErrorPage/ErrorPage'

import Accounts from './Accounts/Accounts'
import ProtectedRoute from './ProtectedRoute'
import ApplyJob from './ApplyJobPage/ApplyJob'
import Applicants from './Applicants/Applicants'
function App() {

  return (
    <>

      <Routes>
        <Route path="/register" element={<AuthPage initialMode="register" />}></Route>
        <Route path="/" element={<AuthPage initialMode="login" />}></Route>
        <Route path="/jobs/new" element={<ProtectedRoute onlyRahul={true}><JobForm></JobForm></ProtectedRoute>}></Route>
        <Route path="/jobs" element={<ProtectedRoute><JobList></JobList></ProtectedRoute>}></Route>
        <Route path="/home" element={<ProtectedRoute><JobHome></JobHome></ProtectedRoute>}></Route>
        <Route path="/jobEdit/:id" element={<ProtectedRoute onlyRahul={true}><JobEdit></JobEdit></ProtectedRoute>}></Route>
        <Route path="/jobs/:id" element={<ProtectedRoute><SingleJob></SingleJob></ProtectedRoute>}></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        <Route path="/account" element={<ProtectedRoute><Accounts></Accounts></ProtectedRoute>}></Route>
        <Route path="/applyJob/:id" element={<ProtectedRoute><ApplyJob></ApplyJob></ProtectedRoute>}></Route>
        <Route path="/applicants" element={<ProtectedRoute onlyRahul={true}><Applicants></Applicants></ProtectedRoute>}></Route>
      </Routes>

    </>
  )
}

export default App
