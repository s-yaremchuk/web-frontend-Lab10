import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Booking from './pages/Booking'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/:trainId" element={<Booking />} />
    </Routes>
  )
}

export default App
