import React, { useState } from 'react';
import '../Layout.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from 'antd';

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false); // Initialize useState correctly

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const location = useLocation(); // No need to pass 'true'
  const navigate = useNavigate();

  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line'
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-file-list-3-line'
    },
    {
      name: 'Apply Doctor',
      path: '/apply-doctor',
      icon: 'ri-hospital-line'
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: 'ri-user-line'
    }
  ];

  const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line'
    },
    {
      name: "Users",
      path: "users",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "ri-user-star-fill"
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: 'ri-profile-line'
    }
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className='main'>
      <div className='d-flex layout'>
        <div className="sidebar">
          <div className='sidebar-header'>
            <h1 className='logo'>SH</h1>
          </div>

          <div className='menu'>
            {menuToBeRendered.map((menu, index) => { // Added 'index' for unique key
              const isActive = location.pathname === menu.path;
              return (
                <div key={index} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate('/login')
              }}>
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to='/login'>Logout</Link>}
            </div>
          </div>
        </div>

        <div className='content'>
          <div className='header'>

            {collapsed ? (
              <i
                className="ri-menu-2-fill  header-action-icon"
                onClick={() => setCollapsed(false)} // Correct toggle action
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)} // Correct toggle action
              ></i>
            )}

            <div className='d-flex align-items-center px-4'>
              {/* Corrected onClick event on the notification icon */}
              <Badge count={user?.unseenNotifications.length}>
                <i
                  className="ri-notification-line header-action-icon px-3"
                  onClick={() => navigate('/notifications')} // Correctly navigate to notifications page
                ></i>
              </Badge>

              <Link className='anchor mx-2' to='/profile'>
                {user?.name}
              </Link>
            </div>
          </div>

          <div className='body'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
