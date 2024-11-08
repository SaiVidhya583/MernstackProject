import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";
import { getPandithPoojas, updatePoojaStatus } from "../../api/api";
import moment from "moment";
import { Table, Button, Card } from "antd"; // Add Card here
import toast from "react-hot-toast";

const PandithPoojas = () => {
  const [poojas, setPoojas] = useState([]);
  const dispatch = useDispatch();

  // Fetch Pandith Poojas
  const fetchPandithPoojas = async () => {
    try {
      dispatch(showLoading());
      const res = await getPandithPoojas();
      setPoojas(res.data);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Failed to fetch pooja. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPandithPoojas();
  }, []);

  // Handle Pooja Booking Status
  const handleStatusChange = async (record, status) => {
    try {
      dispatch(showLoading());
      await updatePoojaStatus({ poojasId: record._id, status });
      fetchPandithPoojas();
      dispatch(hideLoading());
      toast.success("Pooja status updated successfully!");
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Failed to update pooja status. Please try again later.");
      console.error(err);
    }
  };

  const columns = [
    {
      title: "Pooja Name",
      dataIndex: "poojaName",
      key: "poojaName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span>
          {text}{" "}
          <Button
            type="link"
            onClick={() => handleStatusChange(record, text === "pending" ? "approved" : "pending")}
          >
            {text === "pending" ? "Approve" : "Revert"}
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <Card title="Pandith Poojas" className="container">
        <Table dataSource={poojas} columns={columns} rowKey="_id" />
      </Card>
    </Layout>
  );
};

export default PandithPoojas;
