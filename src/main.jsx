import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Layout from './components/Layout/Layout'
import Dashboard from "./components/Dashboard/Dashboard";
import ApplicationForm from "./components/ApplicationForm/ApplicationForm";
import ApplicationDetails from "./components/ApplicationDetails/ApplicationDetails";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path='applications/new' element={<ApplicationForm mode="create"/>}/>
      <Route path='applications/:id' element={<ApplicationDetails/>}/>
      <Route path="applications/:id/edit" element={<ApplicationForm mode="edit" />} />
      <Route path='about' element={<About/>}/>
      <Route path='*' element={<NotFound/>}/>


    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
