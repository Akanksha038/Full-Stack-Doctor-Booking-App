// import React from 'react'
// import Layout from '../components/Layout'
// import { Col, Form, Input, Row } from 'antd'

// function ApplyDoctor() {
//   return (
//     <Layout>
//       <h1 className='page-tittle'> Apply Doctor</h1>
//       <hr />

//       <Form layout='vertical' >
//         <h1 className='card-title mt-3'>Personal Information</h1>

//         <Row gutter={20}>


//           <Col span={8} xs={24} sm={24} lg={8}>

//             <Form.Item required
//               label="First Name"
//               name='firstName'
//               rules={[{ required: true, message: 'Please enter your first name' }]}>
//               <Input placeholder='First Name' />
//             </Form.Item>
//           </Col>


//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Last Name"
//               name='lastName'
//               rules={[{ required: true, message: 'Please enter your last name' }]}
//             >
//               <Input placeholder='Last Name' />
//             </Form.Item>
//           </Col>

//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Phone Number"
//               name='phoneNumber'
//               rules={[{ required: true, message: 'Please enter your phone number' }]}
//             >
//               <Input placeholder='Phone Number' />
//             </Form.Item>
//           </Col>

//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Website"
//               name='website'
//               rules={[{ required: true, message: 'Please enter your website' }]}
//             >
//               <Input placeholder='Website' />
//             </Form.Item>
//           </Col>

//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Address"
//               name='address'
//               rules={[{ required: true, message: 'Please enter your address' }]}
//             >
//               <Input placeholder='Address' />
//             </Form.Item>
//           </Col>




//         </Row>

//         <hr />
//         <h1 className='card-title mt-3'>Professional Information</h1>

//         {/* profrssoional information */}

//         <Row gutter={20}>
//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Specialization"
//               name='specialization'
//               rules={[{ required: true, message: 'Please enter your specialization' }]}
//             >
//               <Input placeholder='Specialization' />
//             </Form.Item>
//           </Col>

//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Experience"
//               name='experience'
//               rules={[{ required: true, message: 'Please enter your experience' }]}
//             >
//               <Input placeholder='Experience' type='number' />
//             </Form.Item>
//           </Col>

//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Fee Per Consultation"
//               name='feePerConsultation'
//               rules={[{ required: true, message: 'Please enter your fee per consultation' }]}
//             >
//               <Input placeholder='Fee Per Consultation' type='number' />
//             </Form.Item>
//           </Col>

//           <Col span={8} xs={24} sm={24} lg={8}>
//             <Form.Item
//               label="Timings"
//               name='timings'
//               rules={[{ required: true }]}
//             >
//               {/* <TimePicker.RangePicker /> */}
//             </Form.Item>
//           </Col>
//         </Row>


//       </Form>


//     </Layout>
//   )
// }

// export default ApplyDoctor











import React from 'react';
import { Button, TimePicker } from 'antd';
import Layout from '../components/Layout';
import { Form, Col, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/apply-doctor-account', { ...values, userId: user._id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className='page-title'>Apply Doctor</h1>
      <hr />

      <Form layout='vertical' onFinish={onFinish}>
        <h1 className='card-title mt-3'>Personal Information</h1>
        <Row gutter={20}>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="First Name"
              name='firstName'
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input placeholder='First Name' />
            </Form.Item>
          </Col>


          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Last Name"
              name='lastName'
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input placeholder='Last Name' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name='phoneNumber'
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input placeholder='Phone Number' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Website"
              name='website'
              rules={[{ required: true, message: 'Please enter your website' }]}
            >
              <Input placeholder='Website' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Address"
              name='address'
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input placeholder='Address' />
            </Form.Item>
          </Col>
        </Row>

        <hr />

        <h1 className='card-title mt-3'>Professional Information</h1>

        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Specialization"
              name='specialization'
              rules={[{ required: true, message: 'Please enter your specialization' }]}
            >
              <Input placeholder='Specialization' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Experience"
              name='experience'
              rules={[{ required: true, message: 'Please enter your experience' }]}
            >
              <Input placeholder='Experience' type='number' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Fee Per Consultation"
              name='feePerConsultation'
              rules={[{ required: true, message: 'Please enter your fee per consultation' }]}
            >
              <Input placeholder='Fee Per Consultation' type='number' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Timings"
              name='timings'
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>

        <div className='d-flex justify-content-end'>
          <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
        </div>
      </Form>
    </Layout>
  );


}

export default ApplyDoctor;
