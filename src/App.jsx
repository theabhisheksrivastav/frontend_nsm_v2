import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout} from "./store/authSlice"
import {getCurrentUser} from './services/authService'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch(() => dispatch(logout()))
    .finally(() => setLoading(false))
  }, [])

  return !loading ?  (
    <>
    <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Toaster position="top-center" reverseOrder={false}/>
        <Outlet />
      </div>
    <Footer />
    </>
  ) : (
    <div>Loading...</div> 
    // loading skeleton component
  );
}

export default App;