import './styles.css'
import logo from '../../assets/images/logo.png';
import { Outlet, Link, useLocation } from "react-router-dom";



export function Sidebar() {
  return(
    <div className='sidebar-container'>
      <div className='logo-container'>
        <img src={logo} alt="Logo" style={{ width: '3rem', height: "3rem", display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }} />
      </div>
      <p className="logo-label" style={{ fontWeight: 'bold', fontSize: '2rem'}}>JustChatApp</p>
      <Link to='/dashboard/home' style={{ fontSize: '25px' }}> Home  </Link>
      <Link to='/dashboard/channels' style={{ fontSize: '25px' }}> Channels  </Link>
      <Link to='/dashboard/direct_message' style={{ fontSize: '25px' }}> Direct messages </Link>
      <Link to='Logout' style={{ fontSize: '25px' }}> Logout </Link>
    </div>
  )
}