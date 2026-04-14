import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Layout from './components/Layout.jsx'
import Otp from './Otp.jsx'
import Avatar from './Avatar.jsx'
import Home from './Home.jsx'
import Room from './Room.jsx'
import App from './App.jsx'   // your Home page (or rename to Home)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Layout wrapper */}
        <Route path="/" element={<Layout />}>

          {/* Child routes */}
          <Route index element={<App />} />   {/* "/" */}
          {/* Example extra routes */}
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} /> 
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes> 
    </BrowserRouter>
  </StrictMode>
)