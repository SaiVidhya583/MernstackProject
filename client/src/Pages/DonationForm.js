import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { submitDonation } from "../api/api";
import './donation.css';
import Layout from "../components/Layout";

const DonationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      await submitDonation(values);
      dispatch(hideLoading());
      toast.success("Donation submitted successfully!");
      navigate("/");
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Failed to submit donation. Please try again.");
    }
  };

  return (
    <Layout>
      <Form name="donation-form" layout="vertical" onFinish={onFinish} className="donation-form">
        <h3 className="mb-2 text-secondary">Donation Information:</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter the donation amount!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default DonationForm;
