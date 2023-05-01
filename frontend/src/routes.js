import { createBrowserRouter, Navigate } from "react-router-dom";
import ListSearchJobs from "./ApplicantPages/Pages/ListJobs/ListSearchJobs";
import App from "./App";
import Home from "./AdminPages/pages/Home/Home";
import Guest from "./middleware/Guest";
import Applicant from "./AdminPages/pages/MangeApplicant/Applicant";
import Admin from "./middleware/Admin";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ViewJob from "./ApplicantPages/Pages/ListJobs/ViewJob";
import User from "./middleware/User";
import AddEdit from "./AdminPages/pages/MangeApplicant/AddEdit";
import ViewApplicants from "./AdminPages/pages/MangeApplicant/ViewApplicants";
import Qualifications from "./AdminPages/pages/ManageQualifications/Qualifications";
import AddEditQualification from "./AdminPages/pages/ManageQualifications/AddEditQualification";
import Jobs from "./AdminPages/pages/ManageJobs/Jobs";
import AddEditJob from "./AdminPages/pages/ManageJobs/AddEditJob";
import ShowRequests from "./AdminPages/pages/ManageRequests/ShowRequests";
import ShowHistory from "./AdminPages/pages/ManageRequests/ShowHistory";
import ApplicantHistory from "./AdminPages/pages/ManageRequests/ApplicantHistory";
import PageNotFound from "./NotFound/PageNotFound";





export const routes = createBrowserRouter([
    {
      path: "",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
            path:"/oops",
            element:<PageNotFound/>
        },
  
        // GUEST MIDDLEWARE
        {
          element: <Guest />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
          
          ],
        },

        // Applicant MIDDLEWARE
        {
            element: <User />,
            children: [
              {
                path: "/list-jobs",
                element: <ListSearchJobs />,
              },
              {
                path: "/viewjob/:ID",
                element: <ViewJob />,
              },
            
            ],
          },
          // Admin MIDDLEWARE
          {
            element: <Admin />,
            children: [
              {
                path: "/applicants",
                element: <Applicant />,
              },
              {
                path: "/adduser",
                element: <AddEdit />,
              },

              {
                path: "/updateuser/:id",
                element: <AddEdit />,
              },
              {
                path: "/viewuser/:id",
                element: <ViewApplicants />,
              },


              {
                path: "/qualifications",
                element: <Qualifications />,
              },
              {
                path: "/addqualification",
                element: <AddEditQualification />,
              },

              {
                path: "/updatequalification/:id",
                element: <AddEditQualification />,
              },
              {
                path: "/jobs",
                element: <Jobs />,
              },

              {
                path: "/addjob",
                element: <AddEditJob />,
              },
              {
                path: "/updatejob/:ID",
                element: <AddEditJob />,
              },

              {
                path: "/requests",
                element: <ShowRequests />,
              },
              {
                path: "/history-requests",
                element: <ShowHistory />,
              },
              {
                path: "/history-requests-applicant/:user_ID",
                element: <ApplicantHistory />,
              },
            
            ],
          },
      ],
    },
    {
      path: "*",
      element: <Navigate to={"/oops"} />,
    },
  ]);