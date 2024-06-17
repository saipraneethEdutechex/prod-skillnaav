import React, { useState, useEffect } from "react";
import { Table, Input, Button, message, Modal } from "antd";
import axios from "axios";
import moment from "moment";

const { Search } = Input;
const { confirm } = Modal;

function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchContacts();
  }, [currentPage, pageSize, searchTerm]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/contact", {
        params: {
          page: currentPage,
          pageSize: pageSize,
          search: searchTerm,
          sort: "-createdAt",
        },
      });
      setContacts(response.data.contacts);
      setTotalContacts(response.data.total);
    } catch (error) {
      console.error("Error fetching contact data:", error);
      message.error("Error fetching contact data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contact/${id}`);
      message.success("Contact deleted successfully.");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      message.error("Error deleting contact.");
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this record?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "S. No",
      key: "serialNumber",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Message", dataIndex: "message", key: "message" },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => showDeleteConfirm(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Contact Submissions
      </h2>
      <div className="flex mb-4">
        <Search
          placeholder="Search by name or email"
          onSearch={handleSearch}
          enterButton
          className="mr-2"
        />
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <Table
        columns={columns}
        dataSource={contacts}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalContacts,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
        rowKey="_id"
      />
    </div>
  );
}

export default AdminContact;
