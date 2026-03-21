import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import PageLoader from "./components/PageLoader";
import AllReports from "./pages/Admin/AllReports";
import ReportDetails from "./pages/Admin/ReportDetails";

function App() {
  const { checkAuth, user, authChecked } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(user);

  return (
    <div>
      <Navbar />
      {!authChecked ? (
        <PageLoader />
      ) : (
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route 
            index 
            element={<HomePage />} 
          />

          <Route 
            path="about" 
            element={<About />} 
          />

          {/* PROTECTED ROUTE */}
          <Route
            path="login"
            element={!user ? <LoginPage /> : <Navigate to={"/"} />}
          />

          <Route 
            path="sign-up" 
            element={!user ? <SignupPage /> : <Navigate to={"/"} />} 
          />

          {/* ADMIN ROUTES */}
          <Route 
            path="all-reports" 
            element={user ? <AllReports /> : <Navigate to={"/login"} />} 
          />

          <Route 
            path="/report/:id" 
            element={user ? <ReportDetails /> : <Navigate to={"/login"} />} 
          />

          {/* Fall-back */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
