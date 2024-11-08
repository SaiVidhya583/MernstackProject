import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getUserPoojas, schedulePooja } from "../api/api";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import moment from "moment";
import { Table, Form, Input, DatePicker, TimePicker, Button } from "antd";
import "./Poojas.css";

const Poojas = () => {
  const [poojas, setPoojas] = useState([]);
  const dispatch = useDispatch();

  // Fetch User Poojas
  const fetchUserPoojas = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserPoojas();
      setPoojas(res.data);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchUserPoojas();
  }, []);

  // Handle form submission for scheduling new pooja
  const onFinish = async (values) => {
    const data = {
      ...values,
      date: values.date.format("DD-MM-YYYY"),
      time: values.time.format("HH:mm"),
    };
    try {
      dispatch(showLoading());
      await schedulePooja(data);
      fetchUserPoojas();
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
    }
  };

  // Create antd table
  const columns = [
    {
      title: "Pandith Name",
      dataIndex: "pandithInfo",
      render: (pandithInfo) => (
        <span>
          {pandithInfo.firstName} {pandithInfo.lastName}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (time) => moment(time).format("HH:mm"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <div className="poojas-content">
        <h1>Schedule New Pooja</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Pandith Name" name="pandithName" rules={[{ required: true, message: "Please enter the pandith name!" }]}>
            <Input placeholder="Enter Pandith Name" />
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select the date!" }]}>
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item label="Time" name="time" rules={[{ required: true, message: "Please select the time!" }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Schedule Pooja</Button>
          </Form.Item>
        </Form>
        <h1>Scheduled Poojas</h1>
        <Table columns={columns} dataSource={poojas} rowKey="_id" />
      </div>
    </Layout>
  );
};

export default Poojas;
