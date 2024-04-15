import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Login } from './pages/Login'
import { CreateUser } from './pages/CreateUser'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DirectMessage } from './pages/DirectMessage/DirectMessage.jsx'
import { Sidebar } from './components/Sidebar/Sidebar.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import { Home } from './pages/Home/Home.jsx'
import { Channels } from './pages/Channels/Channels.jsx'
import { DashboardLayout } from './components/DashboardLayout/DashboardLayout.jsx'


const router = createBrowserRouter([
  {
    path: "/sign_up",
    element: <CreateUser />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
       path: "home",
       element: <Home />
      },
      {
        path: "channels",
        element: <Channels />
       },
      {
        path: "direct_message",
        element:  <DirectMessage />
       }
    ]
  }

  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
