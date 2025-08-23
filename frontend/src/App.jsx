
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
function App() {
  
  return (
    <>
   
      <Routes>
          <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route path="/jobs/new" element={<JobForm></JobForm>}></Route>
          <Route path="/jobs" element={<JobList></JobList>}></Route>
          <Route path="/home" element={<JobHome></JobHome>}></Route>
          <Route path="/jobEdit/:id" element={<JobEdit></JobEdit>}></Route>
          <Route path="/jobs/:id" element={<SingleJob></SingleJob>}></Route>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          <Route path="/account" element={<Accounts></Accounts>}></Route>
      </Routes>
      
    </>
  )
}

export default App
