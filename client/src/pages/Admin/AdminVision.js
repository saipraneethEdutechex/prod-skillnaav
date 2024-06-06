import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, List } from "antd";
import axios from "axios";

function AdminVision() {
  const [skillnaavData, setSkillnaavData] = useState(null);
  const [isEditHeadModalVisible, setIsEditHeadModalVisible] = useState(false); // descriptive variable name
  const [isEditPointModalVisible, setIsEditPointModalVisible] = useState(false);
  const [isAddPointModalVisible, setIsAddPointModalVisible] = useState(false);
  const [selectedVisionHead, setSelectedVisionHead] = useState(null);
  const [selectedVisionPoint, setSelectedVisionPoint] = useState(null);
  const [form] = Form.useForm();
  const [pointForm] = Form.useForm();

  useEffect(() => {
    fetchSkillnaavData();
  }, []);

  const fetchSkillnaavData = async () => {
    try {
      const response = await axios.get("/api/skillnaav/get-skillnaav-data");
      setSkillnaavData(response.data);
    } catch (error) {
      console.error("Error fetching skillnaav data:", error);
    }
  };

  const onFinishEditHead = async (values) => {
    try {
      const response = await axios.post("/api/skillnaav/update-visionheading", {
        ...values,
        _id: selectedVisionHead._id,
      });
      if (response.data.success) {
        message.success(response.data.message);
        setIsEditHeadModalVisible(false);
        fetchSkillnaavData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Error updating vision head:", error.message);
    }
  };

  const onFinishEdit = async (values) => {
    try {
      values._id = values._id || selectedVisionPoint._id;
      const response = await axios.post(
        "/api/skillnaav/update-visionpoint",
        values
      );
      if (response.data.success) {
        message.success(response.data.message);
        setIsEditPointModalVisible(false);
        fetchSkillnaavData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Error updating vision point:", error.message);
    }
  };

  const onFinishAdd = async (values) => {
    try {
      const response = await axios.post(
        "/api/skillnaav/add-visionpoint",
        values
      );
      if (response.data.success) {
        message.success(response.data.message);
        setIsAddPointModalVisible(false);
        fetchSkillnaavData();
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Error adding vision point:", error.message);
    }
  };

  const onDelete = async (visionpointId) => {
    try {
      const response = await axios.delete(
        `/api/skillnaav/delete-visionpoint/${visionpointId}`
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchSkillnaavData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Error deleting vision point:", error.message);
    }
  };

  const handleEditHead = (visionHead) => {
    setSelectedVisionHead(visionHead);
    form.setFieldsValue(visionHead);
    setIsEditHeadModalVisible(true);
  };

  const handleEditPoint = (visionPoint) => {
    setSelectedVisionPoint(visionPoint);
    pointForm.setFieldsValue(visionPoint);
    setIsEditPointModalVisible(true);
  };

  if (!skillnaavData) {
    return <div>Loading...</div>;
  }

  const { visionhead, visionpoint } = skillnaavData;

  return (
    <div>
      <div className="border p-4 rounded-lg mb-4">
        <h1 className="text-xl font-semibold">Vision Head</h1>
        <hr className="my-2" />
        <p className="mb-4">
          <span className="font-semibold">Heading: </span>
          {visionhead[0].visionheading}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Sub Heading: </span>
          {visionhead[0].visionsub}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Image: </span>
          {visionhead[0].visionImg}
        </p>
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={() => handleEditHead(visionhead[0])}
            className="mr-2"
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="border p-4 rounded-lg mb-4">
        <h1 className="text-xl font-semibold">Vision Points</h1>
        <hr className="my-2" />
        <List
          itemLayout="horizontal"
          dataSource={visionpoint}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => handleEditPoint(item)}
                  key="edit"
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  onClick={() => onDelete(item._id)}
                  key="delete"
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta title={item.visionpoint} />
            </List.Item>
          )}
        />
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={() => setIsAddPointModalVisible(true)}
          >
            Add Point
          </Button>
        </div>
      </div>

      {/* Edit Vision Head Modal */}
      <Modal
        visible={isEditHeadModalVisible}
        title="Edit Vision Head"
        onCancel={() => setIsEditHeadModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinishEditHead} form={form}>
          <Form.Item
            name="visionheading"
            label="Vision Heading"
            rules={[{ required: true, message: "Please enter vision heading" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="visionsub"
            label="Vision Sub Heading"
            rules={[
              { required: true, message: "Please enter vision sub heading" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="visionImg"
            label="Vision Image"
            rules={[
              { required: true, message: "Please enter vision image URL" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Edit Vision Point Modal */}
      <Modal
        visible={isEditPointModalVisible}
        title="Edit Vision Point"
        onCancel={() => setIsEditPointModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinishEdit} form={pointForm}>
          <Form.Item
            name="visionpoint"
            label="Vision Point"
            rules={[{ required: true, message: "Please enter vision point" }]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Add Vision Point Modal */}
      <Modal
        open={isAddPointModalVisible}
        title="Add Vision Point"
        onCancel={() => setIsAddPointModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinishAdd} form={pointForm}>
          <Form.Item
            name="visionpoint"
            label="Vision Point"
            rules={[{ required: true, message: "Please enter vision point" }]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminVision;
