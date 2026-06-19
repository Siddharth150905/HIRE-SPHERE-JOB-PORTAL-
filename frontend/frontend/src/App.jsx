import {
 Routes,
 Route,
} from "react-router-dom";

// Layouts

import PublicLayout
from "./layouts/PublicLayout";

import ApplicantLayout
from "./layouts/ApplicantLayout";

import RecruiterLayout
from "./layouts/RecruiterLayout";

import AdminLayout
from "./layouts/AdminLayout";

// Route Guards

import ProtectedRoute
from "./routes/ProtectedRoute";

import RoleRoute
from "./routes/RoleRoute";

// PUBLIC

import HomePage
from "./pages/public/HomePage";

import JobsPage
from "./pages/public/JobsPage";

import JobDetailsPage
from "./pages/public/JobDetailsPage";
import Notifications from "./pages/shared/Notifications";

// AUTH

import LoginPage
from "./pages/auth/LoginPage";

import RegisterPage
from "./pages/auth/RegisterPage";

import ForgotPasswordPage
from "./pages/auth/ForgotPasswordPage";

import ResetPasswordPage
from "./pages/auth/ResetPasswordPage";

import VerifyEmailPage
from "./pages/auth/VerifyEmailPage";

// APPLICANT

import ApplicantDashboard
from "./pages/applicant/ApplicantDashboard";

import ApplicantProfile
from "./pages/applicant/ApplicantProfile";

import EditProfile
from "./pages/applicant/EditProfile";

import MyApplications
from "./pages/applicant/MyApplications";

import SavedJobs
from "./pages/applicant/SavedJobs";

import RecruiterProfile from "./pages/recruiter/RecruiterProfile";

// RECRUITER
import EditCompany from "./pages/recruiter/EditCompany";
import JobAnalytics from "./pages/recruiter/JobAnalytics";

import RecruiterDashboard
from "./pages/recruiter/RecruiterDashboard";

import CompanyProfile
from "./pages/recruiter/CompanyProfile";

import CreateCompany
from "./pages/recruiter/CreateCompany";

import MyJobs
from "./pages/recruiter/MyJobs";

import CreateJob
from "./pages/recruiter/CreateJob";

import EditJob
from "./pages/recruiter/EditJob";
import EditRecruiterProfile from "./pages/recruiter/EditRecruiterProfile";

import JobApplicants from "./pages/recruiter/JobApplicants";

// ADMIN

import AdminDashboard
from "./pages/admin/AdminDashboard";
import AuthLayout from "./layouts/AuthLayout";

function App() {

 return (

  <Routes>

   {/* PUBLIC */}

   <Route
    element={<PublicLayout />}
   >

    <Route
     path="/"
     element={<HomePage />}
    />

    <Route
     path="/jobs"
     element={<JobsPage />}
    />

    <Route
     path="/jobs/:id"
     element={
      <JobDetailsPage />
     }
    />
</Route>

<Route element={<AuthLayout/>}>


    <Route
     path="/login"
     element={<LoginPage />}
     />

    <Route
     path="/register"
     element={<RegisterPage />}
     />

    <Route
     path="/forgot-password"
     element={
       <ForgotPasswordPage />
      }
      />

    <Route
     path="/reset-password/:token"
     element={
       <ResetPasswordPage />
      }
      />

    <Route
     path="/verify-email/:token"
     element={
       <VerifyEmailPage />
      }
      />
      </Route>


   {/* APPLICANT */}

   <Route
    element={<ProtectedRoute />}
   >

    <Route
     element={
      <RoleRoute
       allowedRoles={[
        "applicant",
       ]}
      />
     }
    >

      <Route
 path="/applicant/notifications"
 element={
  <Notifications />
 }
/>

     <Route
      element={
       <ApplicantLayout />
      }
     >

      <Route
       path="/applicant/dashboard"
       element={
        <ApplicantDashboard />
       }
      />

      <Route
       path="/applicant/profile"
       element={
        <ApplicantProfile />
       }
      />

      <Route
       path="/applicant/profile/edit"
       element={
        <EditProfile />
       }
      />

      <Route
       path="/applicant/applications"
       element={
        <MyApplications />
       }
      />

      <Route
       path="/applicant/saved-jobs"
       element={
        <SavedJobs />
       }
      />

     </Route>

    </Route>

   </Route>

   {/* RECRUITER */}

   <Route
    element={<ProtectedRoute />}
   >

    <Route
     element={
      <RoleRoute
       allowedRoles={[
        "recruiter",
       ]}
      />
     }
    >

     <Route
      element={
       <RecruiterLayout />
      }
     >

      <Route
       path="/recruiter/dashboard"
       element={
        <RecruiterDashboard />
       }
      />

       <Route
 path="/recruiter/notifications"
 element={
  <Notifications />
 }
/>

      <Route
       path="/recruiter/company"
       element={
        <CompanyProfile />
       }
      />

      <Route
       path="/recruiter/company/create"
       element={
        <CreateCompany />
       }
      />


      <Route
 path="/recruiter/profile"
 element={
  <RecruiterProfile />
 }
/>

      <Route
 path="recruiter/company/edit/:id"
 element={<EditCompany />}
/>

      <Route
       path="/recruiter/jobs"
       element={
        <MyJobs />
       }
      />

      <Route
       path="/recruiter/jobs/create"
       element={
        <CreateJob />
       }
      />

      <Route
       path="/recruiter/jobs/edit/:id"
       element={
        <EditJob />
       }
      />

<Route
 path="/recruiter/profile/edit"
 element={
  <EditRecruiterProfile />
 }
/>

      <Route
       path="/recruiter/jobs/:id/applicants"
       element={
        <JobApplicants  />
       }
      />

      <Route
 path=
 "/recruiter/jobs/:id/analytics"

 element={
  <JobAnalytics />
 }
/>

     </Route>

    </Route>

   </Route>

   {/* ADMIN */}

   <Route
    element={<ProtectedRoute />}
   >

    <Route
     element={
      <RoleRoute
       allowedRoles={[
        "admin",
       ]}
      />
     }
    >

     <Route
      element={
       <AdminLayout />
      }
     >

      <Route
       path="/admin/dashboard"
       element={
        <AdminDashboard />
       }
      />

     </Route>

    </Route>

   </Route>

  </Routes>

 );
}

export default App;