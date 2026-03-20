import { Navigate, Route, Routes } from "react-router"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/useAuthStore"

import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ErrorPage from "./pages/ErrorPage"
import { useEffect } from "react"

function App() {
  const {checkAuth,user,authChecked} = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  if(!authChecked) return <div>Loading...</div>

  console.log(user);

  return (
    <div>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="sign-up" element={<SignupPage />} />

        {/* PROTECTED ROUTE */}
        <Route 
          path="login" 
          element={
            !user ? <LoginPage /> : <Navigate to={'/'} />
          } 
        />

        {/* Fall-back */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  )
}

export default App
