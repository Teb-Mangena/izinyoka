import { Route, Routes } from "react-router"
import { Toaster } from "react-hot-toast"

import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
      </Routes>
      <Toaster />
      <Footer />
    </>
  )
}

export default App
