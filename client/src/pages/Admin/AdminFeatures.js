import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";

function AdminFeatures() {
  const [skillnaavData, setSkillnaavData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [form] = Form.useForm();

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

  const onFinishEdit = async (values) => {
    try {
      if (!values._id) {
        values._id = selectedFeature._id;
      }
      const response = await axios.post(
        "/api/skillnaav/update-feature",
        values
      );
      if (response.data.success) {
        message.success(response.data.message);
        setShowEditModal(false);
        fetchSkillnaavData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Error updating feature:", error.message);
    }
  };

  const onFinishAdd = async (values) => {
    try {
      const response = await axios.post("/api/skillnaav/add-feature", values);
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddModal(false);
        fetchSkillnaavData();
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Error adding feature:", error.message);
    }
  };

  const onDelete = async (featureId) => {
    try {
      const response = await axios.delete(
        `/api/skillnaav/delete-feature/${featureId}`
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchSkillnaavData();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Error deleting feature:", error.message);
    }
  };

  const handleEdit = (feature) => {
    setSelectedFeature(feature);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  if (!skillnaavData || !skillnaavData.features) {
    return <div>Loading...</div>;
  }

  const { features } = skillnaavData;

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Button
          type="primary"
          onClick={handleAdd}
          style={{ backgroundColor: "#1890ff", color: "#FFFFFF" }}
        >
          Add Feature
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-4">
        {features.map((feat, index) => (
          <div className="border p-4 rounded-lg" key={index}>
            <h1 className="text-xl font-semibold" style={{ color: "#000000" }}>
              {feat.feature}
            </h1>
            <hr className="my-2" />
            <p className="mb-4" style={{ color: "#000000" }}>
              {feat.featuredesc}
            </p>
            <p className="mb-1" style={{ color: "#000000" }}>
              <span className="font-semibold">Sub Text: </span>
              {feat.subfeature}
            </p>
            <p className="mb-1" style={{ color: "#000000" }}>
              <span className="font-semibold">Point 1: </span>
              {feat.point1}
            </p>
            <p className="mb-1" style={{ color: "#000000" }}>
              <span className="font-semibold">Point 2: </span>
              {feat.point2}
            </p>
            <p className="mb-1" style={{ color: "#000000" }}>
              <span className="font-semibold">Point 3: </span>
              {feat.point3}
            </p>
            <p className="mb-1" style={{ color: "#000000" }}>
              <span className="font-semibold">Point 4: </span>
              {feat.point4}
            </p>
            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                onClick={() => handleEdit(feat)}
                className="mr-2"
                style={{ backgroundColor: "#1890ff", color: "#FFFFFF" }}
              >
                Edit
              </Button>
              <Button
                type="danger"
                onClick={() => onDelete(feat._id)}
                style={{ backgroundColor: "#f5222d", color: "#FFFFFF" }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        visible={showEditModal}
        title="Edit Feature"
        onCancel={() => setShowEditModal(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onFinishEdit}
          initialValues={selectedFeature}
          form={form}
        >
          <Form.Item
            name="feature"
            label="Feature"
            rules={[{ required: true, message: "Please enter feature name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="featuredesc"
            label="Feature Description"
            rules={[
              { required: true, message: "Please enter feature description" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="subfeature"
            label="Feature Sub Text"
            rules={[
              { required: true, message: "Please enter feature subtext" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point1"
            label="Feature Point 1"
            rules={[
              { required: true, message: "Please enter feature point 1" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point2"
            label="Feature Point 2"
            rules={[
              { required: true, message: "Please enter feature point 2" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point3"
            label="Feature Point 3"
            rules={[
              { required: true, message: "Please enter feature point 3" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point4"
            label="Feature Point 4"
            rules={[
              { required: true, message: "Please enter feature point 4" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#1890ff", color: "#FFFFFF" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>{" "}
      <Modal
        visible={showAddModal}
        title="Add Feature"
        onCancel={() => setShowAddModal(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinishAdd} form={form}>
          <Form.Item
            name="feature"
            label="Feature"
            rules={[{ required: true, message: "Please enter Feature name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="featuredesc"
            label="Feature Description"
            rules={[
              { required: true, message: "Please enter feature description" },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="subfeature"
            label="Feature Sub Text"
            rules={[
              { required: true, message: "Please enter feature subtext" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point1"
            label="Feature Point 1"
            rules={[
              { required: true, message: "Please enter feature point 1" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point2"
            label="Feature Point 2"
            rules={[
              { required: true, message: "Please enter feature point 2" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point3"
            label="Feature Point 3"
            rules={[
              { required: true, message: "Please enter feature point 3" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point4"
            label="Feature Point 4"
            rules={[
              { required: true, message: "Please enter feature point 4" },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#1890ff", color: "#FFFFFF" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminFeatures;
