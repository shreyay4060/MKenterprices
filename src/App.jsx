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

import { onAuthStateChanged } from "firebase/auth";
import { messaging, requestNotificationPermission, onMessage } from "./firebase/messaging";
import { auth } from "./firebase/FirebaseConfig";
import toast from "react-hot-toast";

export default function App() {
  useEffect(() => {
    // ✅ Foreground push notification handler
    const unsubscribe = onMessage((payload) => {
      console.log("📨 Foreground message:", payload);
      const { title, body, icon, image } = payload?.notification || {};

      if (Notification.permission === "granted") {
        new Notification(title || "Notification", {
          body,
          icon: icon || "/images/logo.jpg",
          image: image || undefined,
          badge: icon || "/images/logo.jpg",
          requireInteraction: true,
        });
      } else {
        toast(`${title || "🔔 New Message"}: ${body || ""}`);
      }
    });

    // ✅ Request notification permission on auth change
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        requestNotificationPermission(user.uid);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
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
          <Route path="/workerApplication" element={<WorkerApplication />} />
          <Route path="/clientApplicationForm" element={<ClientApplicationForm />} />
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
