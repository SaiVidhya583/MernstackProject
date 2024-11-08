import './main.css';
import React, { useState, useEffect } from 'react';
import img1 from '../img/Brihadesvara_Temple,_Tanjavur,_India_02.jpg';
import img2 from '../img/Murudeshwar-Temple.jpg';
import { Clock, Check2Square, ReceiptCutoff, BoxSeam, CurrencyRupee, ArrowDownCircle } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';
import { Form, Input, Button } from 'antd'; // Assuming you're using Ant Design for form elements

function Main() {
  const [time, setTime] = useState();

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      let currentDate = new Date().toLocaleTimeString();
      setTime(currentDate);
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const validatePassword = (_, value) => {
    if (!value || value.length < 6) {
      return Promise.reject(new Error('Password must be at least 6 characters long!'));
    }
    return Promise.resolve();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
        <motion.div animate={{ x: 0 }} initial={{ x: -100 }}>
  <div className="border-1 shadow-lg rounded flex flex-nowrap p-2 heroBox">
    <Clock size={60} className='boxIcons pt-4' />
    <div className='ele -space-y-5'>
      <p>Time</p>
      <h1 style={{ fontFamily: 'Fredoka One' }}>{time}</h1>
    </div>
  </div>
</motion.div>

        </div>
        <div className="col">
          <motion.div animate={{ x: 0 }} initial={{ x: 100 }}>
            <div className="border-1 shadow-lg rounded flex flex-nowrap p-2 heroBox">
              <Check2Square size={60} className='boxIcons pt-4' />
              <div className='ele -space-y-5'>
                <p>Today's Seva Count</p>
                <h1 style={{ fontFamily: 'Fredoka One' }}>1</h1>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="col">
          <motion.div animate={{ x: 0 }} initial={{ x: -100 }}>
            <div className="border-1 shadow-lg rounded flex flex-nowrap p-2 heroBox">
              <ReceiptCutoff size={60} className='boxIcons pt-4' />
              <div className='ele -space-y-5'>
                <p>Today's Total Seva Amount</p>
                <h1 style={{ fontFamily: 'Fredoka One' }}>1610</h1>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="col">
          <motion.div animate={{ x: 0 }} initial={{ x: 100 }}>
            <div className="border-1 shadow-lg rounded flex flex-nowrap p-2 heroBox">
              <BoxSeam size={60} className='boxIcons pt-4' />
              <div className='ele -space-y-5'>
                <p>Today's Total Donation Amount</p>
                <h1 style={{ fontFamily: 'Fredoka One' }}>10000</h1>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="col">
          <motion.div animate={{ x: 0 }} initial={{ x: -100 }}>
            <div className="border-1 shadow-lg rounded flex flex-nowrap p-2 heroBox">
              <CurrencyRupee size={60} className='boxIcons pt-4' />
              <div className='ele -space-y-5'>
                <p>Today's Total Expense</p>
                <h1 style={{ fontFamily: 'Fredoka One' }}>100</h1>
              </div>
            </div>
          </motion.div>
        </div>
        <ArrowDownCircle className='animate-bounce w-12 h-12 text-[#f43f08]' onClick={() => window.scrollTo(0, 700)} />
      </div>

      {/* Form Section */}
      <div className="login-form-container" style={{ position: 'relative', margin: '20px auto', maxWidth: '450px' }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} // Custom styling for the form
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: 'email', message: 'Please enter a valid email!' },
              { required: true, message: 'Please input your email!' },
            ]}
          >
            <Input className="form-content" autoComplete="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { validator: validatePassword },
            ]}
          >
            <Input.Password className="form-content" autoComplete="current-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Image Section */}
      <div className="m-[150px] container-md shadow hover:text-white hover:bg-gradient-to-r from-[#f43f08] to-orange-200 rounded hover:shadow-lg hover:shadow-orange-300">
        <h1 style={{ fontFamily: 'Permanent Marker', color: '#f43f08' }}>Brihadeshwara Temple, Thanjavur, Tamil Nadu</h1>
        <div className="flex overflow-x-auto snap-x image-section" id='scrollingImg'>
          <div className="flex-shrink-0">
            <img src={img1} alt="Brihadeshwara Temple" />
          </div>
          <div className="flex-shrink-0">
            <img src={img2} alt="Murudeshwar Temple" />
          </div>
          <div className="flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" alt="Temple Image" />
          </div>
        </div>
        <p className="indent-8 md:p-4 font-normal hover:font-bold">
          Built by Raja Raja Chola I in 1,002 AD, the magnificent Brihadeshwara Temple is deeply embedded in the Dravidian architectural legacy as a tribute to Lord Nataraja. Perched along the shores of the Cauvery, the temple was constructed using over 1,30,000 tonnes of granite—a momentous feat, considering that granite is nowhere to be found within a 100-mile radius. Notably, the temple casts no shadow on the ground when the sun is at its pinnacle, a fitting emblem of its sanctitude and spiritual significance. Some architectural gems in the complex include a glorious Nandi monolith weighing 20 tonnes, intricate Bharatnatyam carvings on the temple exterior, and a spectacular spread of musical pillars.
        </p>
      </div>

      <div className="container-md shadow-lg mt-5 hover:text-white hover:bg-gradient-to-r from-[#f43f08] to-red-200 rounded">
        <h1 style={{ fontFamily: 'Permanent Marker' }}>Brihadeshwara Temple, Thanjavur, Tamil Nadu</h1>
        <div className="flex overflow-x-auto snap-x image-section">
          <div className="flex-shrink-0">
            <img src={img2} alt="Murudeshwar Temple" />
          </div>
          <div className="flex-shrink-0">
            <img src={img1} alt="Brihadeshwara Temple" />
          </div>
          <div className="flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" alt="Temple Image" />
          </div>
        </div>
        <p className="indent-8 md:p-4 font-normal hover:font-bold">
          The Brihadeshwara Temple's towering vimana and the magnificent sculpture work reflects a time when artistry flourished. An enduring symbol of the Chola Dynasty’s architectural brilliance, it remains a profound pilgrimage site for devotees and a captivating draw for tourists from around the world. The temple is an exemplary representation of Dravidian architecture, complete with a grand entrance gate and sacred grounds echoing tales of devotion and cultural heritage.
        </p>
      </div>
    </div>
  );
}

export default Main;
