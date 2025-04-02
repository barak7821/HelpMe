import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Service from "./pages/Service"

function App() {
  return (
    <Routes>
      <Route index element={<Register /> } />
      <Route path="/user/:userName" element={<Home /> } />
      <Route path="/service/:service" element={<Service /> } />
      <Route path="*" element={<p className="flex min-h-screen justify-center items-center text-5xl">Not Found</p> } />
    </Routes>
  )
}

export default App
