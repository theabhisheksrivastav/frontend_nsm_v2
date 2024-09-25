import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Home, LoginPage, RegisterPage, OtpPage} from './pages'
const router = createBrowserRouter(
  createRoutesFromElements([
    <Route key="app" path="/" element={<App />} >
      <Route key="home" path="" element={<Home />} />
      {/* <Route key="login" path="login" element={<LoginPage/>} /> */}
      <Route key="otp-verify" path="otp-verify" element={<OtpPage />} />
      <Route key="register" path="register" element={<RegisterPage/>} />
    </Route>
  ]),
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
)