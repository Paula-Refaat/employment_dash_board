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
import ShowHistory from "./AdminPages/pages/ManageRequests/ShowHistory";
import Home from "./AdminPages/pages/Home/Home";
import ApplicantHistory from "./AdminPages/pages/ManageRequests/ApplicantHistory";
 import Header from "./AdminPages/Shared/Header";




function App() {
  return (
    <BrowserRouter>

    <div className="App">
      <ToastContainer position='top-center'/>
      <Header />
      <Routes>
        
        {/* Applicant */}
        <Route exact path="/" Component={Home} />
        <Route exact path="/applicants" Component={Applicant} />
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
        <Route path="/history-requests" Component={ShowHistory} />
        <Route path="/history-requests-applicant/:user_ID" Component={ApplicantHistory} />

       
       
      </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
