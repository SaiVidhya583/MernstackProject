import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table, Button } from "antd"; // Add Button here
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";
import { getAllUser } from "../../api/api"; // Adjust this import based on your API structure

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.users);

  // Fetch All Users
  const fetchAllUsers = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllUser(); // Call the correct API function here
      dispatch(hideLoading());

      if (res.success) {
        setUsers(res.data); // Update state with fetched users
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Handle block user action
  const handleBlockUser = (userId) => {
    // Implement blocking logic here
  };

  // Define columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <Button onClick={() => handleBlockUser(record._id)}>Block</Button>
      ),
    },
  ];

  return (
    <Layout>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </Layout>
  );
};

export default Users;
