import { Outlet } from "react-router-dom"
import { Sidebar } from "../Sidebar"

export function DashboardLayout() {
  return(
    <div className='main-container'>
      <Sidebar />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  )
}