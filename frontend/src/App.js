import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Applicant from "./AdminPages/pages/MangeApplicant/Applicant";
import AddEdit from "./AdminPages/pages/MangeApplicant/AddEdit";
import ViewApplicants from "./AdminPages/pages/MangeApplicant/ViewApplicants";
import Qualifications from "./AdminPages/pages/ManageQualifications/Qualifications";
import AddEditQualification from "./AdminPages/pages/ManageQualifications/AddEditQualification";
import Jobs from "./AdminPages/pages/ManageJobs/Jobs";
import AddEditJob from "./AdminPages/pages/ManageJobs/AddEditJob";
import ShowRequests from "./AdminPages/pages/ManageRequests/ShowRequests";



function App() {
  return (
    <BrowserRouter>

    <div className="App">
      <ToastContainer position='top-center'/>

      <Routes>
        {/* Applicant */}
        <Route exact path="/" Component={Applicant} />
        <Route path="/adduser" Component={AddEdit} />
        <Route path="/updateuser/:id" Component={AddEdit} />
        <Route path="/viewuser/:id" Component={ViewApplicants} />

        {/* Qualifications */}
        <Route path="/qualifications" Component={Qualifications} />
        <Route path="/addqualification" Component={AddEditQualification} />
        <Route path="/updatequalification/:id" Component={AddEditQualification} />

        {/* Jobs */}
        <Route path="/jobs" Component={Jobs} />
        <Route path="/addjob" Component={AddEditJob} />
        <Route path="/updatejob/:ID" Component={AddEditJob} />

        {/* Requsts */}
        <Route  path="/requests" Component={ShowRequests} />
       
       
      </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
