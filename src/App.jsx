import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import { Toaster } from "react-hot-toast";
import MyState from "./context/myState";
import WorkforceService from "./pages/service/WorkforceService";
import About from "./pages/about/About";
import Service from "./pages/service/Service";
import Contact from "./pages/contact/Contact";
// import Facility from './pages/service/Facility'
import Facilyty from "./pages/service/Facility";
import Logistics from "./pages/service/Logistics";
import Admin from "./pages/service/Admin";
import ScrollTop from "./components/scrollTop/ScrollTop";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import WorkInfo from "./pages/work/WorkInfo";
import AddWork from "./pages/addWork/AddWork";
import UserWorkInfo from "./pages/work/UserWorkInfo";
import UpdateUSerDetail from "./components/admin/UpdateUSerDetail";
import AvailableWork from "./pages/work/AvailableWork";
import ProtectedRouteForUser from "./protectedRoute/ProtectedRouteUser";
import ProtectedRouteForAdmin from "./protectedRoute/ProtectedRouteAdmin";
import WorkerApplication from "./pages/workerApplication/WorkerApplication";
import Review from "./pages/review/Review";
import ClientApplicationForm from "./pages/clientApplication/ClientApplicationForm";
import AdminNotificationForm from "./components/AdminNotificationForm";


// In App.jsx or wherever messaging is initialized
import { messaging } from "./firebase/messaging";
import { onMessage } from "firebase/messaging";


export default function App() {
  useEffect(() => {
    // Show foreground message (desktop + mobile)
    onMessage(messaging, (payload) => {
      console.log("📨 Message received in foreground: ", payload);
      alert(`${payload.notification.title} - ${payload.notification.body}`);
    });

    // Ask for permission (and save token) on any platform
    onAuthStateChanged(auth, (user) => {
      if (user) {
        requestNotificationPermission(user.uid);
      }
    });
  }, []);
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/review" element={<Review />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/workforce" element={<WorkforceService />} />
          <Route path="/facility" element={<Facilyty />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/admin" element={<Admin />} />

          {/* worker application */}
          <Route path="/workerApplication" element={<WorkerApplication />} />

          {/* client application form */}
          <Route
            path="/clientApplicationForm"
            element={<ClientApplicationForm />}
          />

          <Route
            path="/userDashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          />
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />

          <Route
            path="/workInfo"
            element={
              <ProtectedRouteForAdmin>
                <WorkInfo />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/addWork"
            element={
              <ProtectedRouteForAdmin>
                <AddWork />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/availableWork" element={<AvailableWork />} />

          <Route path="/work/:id" element={<UserWorkInfo />} />

          <Route
            path="/updateUSerDetail/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateUSerDetail />
              </ProtectedRouteForAdmin>
            }
          />

          <Route path="/adminNotificationForm" element={<AdminNotificationForm />} />
        </Routes>
      </Router>
    </MyState>
  );
}
