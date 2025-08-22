
import './App.css'
import { Route,Routes } from 'react-router'
import JobForm from './JobFormPage/JobForm'
import JobList from './JobListPage/JobList'
import JobEdit from './JobEditPage/JobEdit'
import SingleJob from './SingleJobPage/SingleJob'
function App() {
  
  return (
    <>
      <Routes>
      <Route path="/jobForm" element={<JobForm></JobForm>}></Route>
      <Route path="/" element={<JobList></JobList>}></Route>
      <Route path="/jobEdit/:id" element={<JobEdit></JobEdit>}></Route>
      <Route path="/jobView/:id" element={<SingleJob></SingleJob>}></Route>
      </Routes>
    </>
  )
}

export default App
