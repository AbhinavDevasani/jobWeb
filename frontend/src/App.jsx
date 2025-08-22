
import './App.css'
import { Route,Routes } from 'react-router'
import JobForm from './JobFormPage/JobForm'
import JobList from './JobListPage/JobList'
import JobEdit from './JobEditPage/JobEdit'
import SingleJob from './SingleJobPage/SingleJob'
import JobHome from './JobHomePage/JobHome'

function App() {
  
  return (
    <>
   
      <Routes>
        
          <Route path="/jobs/new" element={<JobForm></JobForm>}></Route>
          <Route path="/jobs" element={<JobList></JobList>}></Route>
          <Route path="/" element={<JobHome></JobHome>}></Route>
          <Route path="/jobEdit/:id" element={<JobEdit></JobEdit>}></Route>
          <Route path="/jobs/:id" element={<SingleJob></SingleJob>}></Route>
        
      </Routes>
      
    </>
  )
}

export default App
