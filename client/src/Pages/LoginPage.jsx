import React from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./LoginPage.css"; // Import the CSS file


const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", values);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        navigate("/"); // Navigate to the homepage
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div id="Container">
      <div className="form">
        <h2 id="login-label">Login Form</h2>
        <Form name="login-form" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email!" },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input className="form-content" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
          >
            <Input.Password className="form-content" />
          </Form.Item>
          <Form.Item>
            <Button className="w-100 btn-primary login-button" type="primary" htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
        
        <div className="text-center mt-3 mb-2">
          <span className="no-account-bg">Don't have an account?</span>{" "}
          <Link to="/register" className="register-bg">Register Here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;