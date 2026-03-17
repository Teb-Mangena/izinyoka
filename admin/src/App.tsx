import { Route, Routes } from "react-router"
import { Toaster } from "react-hot-toast"

import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ErrorPage from "./pages/ErrorPage"

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />

        {/* Fall-back */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  )
}

export default App
