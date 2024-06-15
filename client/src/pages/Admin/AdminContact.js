import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin } from "antd";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contact");
        setContacts(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };
    fetchContacts();
  }, []);

  // Define columns for Ant Design Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Contact Submissions
      </h2>
      <Table
        dataSource={contacts}
        columns={columns}
        rowKey={(record) => record._id} // Assuming _id is unique for each contact
        pagination={{ pageSize: 10 }} // Adjust page size as needed
        loading={loading}
      />
    </div>
  );
};

export default AdminContact;
