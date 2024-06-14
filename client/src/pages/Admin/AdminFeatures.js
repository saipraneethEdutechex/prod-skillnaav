import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form, Input, Button, message, Skeleton } from "antd";
import axios from "axios";

function AdminFeatures() {
  const [skillnaavData, setSkillnaavData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(""); // State for image URL
  const [previewImageUrl, setPreviewImageUrl] = useState(""); // State for image preview URL

  useEffect(() => {
    fetchSkillnaavData();
  }, []);

  // Inside AdminFeatures component

  const fetchSkillnaavData = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Fetching skillnaav data...");
      const response = await axios.get("/api/skillnaav/get-skillnaav-data");
      console.log("Skillnaav data fetched:", response.data);
      setSkillnaavData(response.data);
    } catch (error) {
      console.error("Error fetching skillnaav data:", error);
      message.error("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const onFinishEdit = async (values) => {
    try {
      setLoading(true);
      if (!values._id) {
        values._id = selectedFeature._id;
      }
      const payload = { ...values, featureImg: imageUrl };
      console.log("Updating feature with payload:", payload);
      const response = await axios.post(
        "/api/skillnaav/update-feature",
        payload
      );
      console.log("Feature update response:", response.data);
      if (response.data.success) {
        message.success(response.data.message);
        setShowEditModal(false);
        fetchSkillnaavData();
        setImageUrl("");
        form.resetFields();
      } else {
        message.error(response.data.message || "Failed to update feature.");
      }
    } catch (error) {
      console.error("Error updating feature:", error);
      message.error(
        "Error updating feature: " +
          (error.message || "Unknown error occurred.")
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishAdd = async (values) => {
    try {
      setLoading(true);
      const payload = { ...values, featureImg: imageUrl };
      console.log("Adding feature with payload:", payload);
      const response = await axios.post("/api/skillnaav/add-feature", payload);
      console.log("Feature add response:", response.data);
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddModal(false);
        fetchSkillnaavData();
        form.resetFields();
        setImageUrl("");
      } else {
        message.error(response.data.message || "Failed to add feature.");
      }
    } catch (error) {
      console.error("Error adding feature:", error);
      message.error(
        "Error adding feature: " + (error.message || "Unknown error occurred.")
      );
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (featureId) => {
    try {
      setLoading(true);
      console.log("Deleting feature with ID:", featureId);
      const response = await axios.delete(
        `/api/skillnaav/delete-feature/${featureId}`
      );
      console.log("Feature delete response:", response.data);
      if (response.data.success) {
        message.success(response.data.message);
        fetchSkillnaavData();
      } else {
        message.error(response.data.message || "Failed to delete feature.");
      }
    } catch (error) {
      console.error("Error deleting feature:", error);
      message.error(
        "Error deleting feature: " +
          (error.message || "Unknown error occurred.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (feature) => {
    setSelectedFeature(feature);
    setImageUrl(feature.featureImg); // Set initial value of imageUrl for edit modal
    setPreviewImageUrl(feature.featureImg); // Set preview image URL for edit modal
    setShowEditModal(true);
  };

  const handleAdd = () => {
    form.resetFields(); // Reset form fields
    setSelectedFeature(null); // Clear selected feature
    setImageUrl(""); // Clear imageUrl state
    setPreviewImageUrl(""); // Clear previewImageUrl state
    setShowAddModal(true); // Show the Add Feature modal
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setPreviewImageUrl(url);
    setImageUrl(url);
  };

  if (loading || !skillnaavData || !skillnaavData.features) {
    return <Skeleton active avatar />;
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
            {feat.featureImg && (
              <div className="mb-4">
                <img
                  src={feat.featureImg}
                  alt="Feature Image"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </div>
            )}
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
            rules={[{ required: true, message: "Please enter feature" }]}
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
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="subfeature"
            label="Sub Feature"
            rules={[{ required: true, message: "Please enter sub feature" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point1"
            label="Point 1"
            rules={[{ required: true, message: "Please enter point 1" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point2"
            label="Point 2"
            rules={[{ required: true, message: "Please enter point 2" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point3"
            label="Point 3"
            rules={[{ required: true, message: "Please enter point 3" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point4"
            label="Point 4"
            rules={[{ required: true, message: "Please enter point 4" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="featureImg"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input onChange={handleImageUrlChange} value={imageUrl} />
          </Form.Item>
          {previewImageUrl && (
            <div className="mb-4">
              <img
                src={previewImageUrl}
                alt="Preview Image"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
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
            rules={[{ required: true, message: "Please enter feature" }]}
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
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="subfeature"
            label="Sub Feature"
            rules={[{ required: true, message: "Please enter sub feature" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point1"
            label="Point 1"
            rules={[{ required: true, message: "Please enter point 1" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point2"
            label="Point 2"
            rules={[{ required: true, message: "Please enter point 2" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point3"
            label="Point 3"
            rules={[{ required: true, message: "Please enter point 3" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="point4"
            label="Point 4"
            rules={[{ required: true, message: "Please enter point 4" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="featureImg"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input onChange={handleImageUrlChange} value={imageUrl} />
          </Form.Item>
          {previewImageUrl && (
            <div className="mb-4">
              <img
                src={previewImageUrl}
                alt="Preview Image"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
          <div className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#1890ff", color: "#FFFFFF" }}
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default React.memo(AdminFeatures);
