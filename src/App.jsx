import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import CreateListing from "./pages/CreateListing"
import ForgotPassword from "./pages/ForgotPassword"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import Offers from "./pages/Offers"

function App() {
  

  return (
    <>
     <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/create-listing" element={<CreateListing/>}></Route>
        <Route path="/offer" element={<Offers/>}></Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
