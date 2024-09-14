// src/pages/Notifications.js
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser } from '../redux/userSlice';

function Notifications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Function to handle the notification click
  const handleNotificationClick = (notification) => {
    if (!notification.seen) {
      navigate('/admin/doctors'); // Navigate to /admin/doctors for unseen notifications
    } else {
      navigate(notification.onClickPath); // Navigate to the specified path for seen notifications
    }
  };

  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/mark-all-notifications-as-seen',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data)); // Update the user in the Redux store
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  const deleteAllNotifications = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/delete-all-notifications',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data)); // Update the user in the Redux store
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Something went wrong');
    }
  };

  // Use useEffect to rerender the component when the user changes
  useEffect(() => { }, [user]);

  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>

      <Tabs defaultActiveKey="0">
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => markAllAsSeen()}>
              Mark all as seen
            </h1>
          </div>

          {user?.unseenNotifications?.map((notification, index) => (
            <div
              key={index} // Add a unique key
              className="card p-2"
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Seen" key="1">
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => deleteAllNotifications()}>
              Delete all
            </h1>
          </div>

          {user?.seenNotifications?.map((notification, index) => (
            <div
              key={index} // Add a unique key
              className="card p-2"
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
