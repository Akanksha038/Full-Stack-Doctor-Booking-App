import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { hideLoading, showLoading } from '../redux/alertsSlice';

function Login() {
  const { loading } = useSelector(state => state.alerts);
  console.log(loading);

  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Login form values:', values);

    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/login', values);
      dispatch(hideLoading());

      console.log('API response:', response);

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home page"); // Ensure this line is reached
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error('Login error:', error.response || error.message || error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        <h1 className='card-title'>
          Welcome Back
        </h1>

        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email'>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <Input placeholder='Password' type='password' />
          </Form.Item>

          <Button className='primary-button my-2' htmlType='submit'>LOGIN</Button>

          <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>
        </Form>

      </div>
    </div>
  )
}

export default Login
