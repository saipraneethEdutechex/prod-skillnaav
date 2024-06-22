import React, { useState } from "react";
import { Form, Input, Button, message, Skeleton, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function AdminDiscover() {
  const dispatch = useDispatch();
  const { skillnaavData, loading } = useSelector((state) => state.root);
  const [imageUrl, setImageUrl] = useState(null); // State to store image URL

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/skillnaav/update-discover", {
        ...values,
        imageUrl, // Include imageUrl in the request
        _id: skillnaavData.discover[0]._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to save changes. Please try again later.");
      console.error("Error:", error);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImageUrl(info.file.response.imageUrl); // Store uploaded image URL
    }
  };

  if (!skillnaavData || !skillnaavData.discover || !skillnaavData.discover[0]) {
    return <Skeleton active avatar />;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Edit Discover Section
      </h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={skillnaavData.discover[0]}
        className="space-y-6"
      >
        <Form.Item
          name="discoverheading"
          label="Discover Heading"
          className="font-semibold text-gray-700"
        >
          <Input
            placeholder="Discover"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="discoversubheading"
          label="Discover Sub Heading"
          className="font-semibold text-gray-700"
        >
          <Input.TextArea
            rows={4}
            placeholder="Discover Sub Heading"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="tryforfreebtn"
          label="Try for Free Button"
          className="font-semibold text-gray-700"
        >
          <Input
            placeholder="Try for Free Button"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="viewpricebtn"
          label="View Price Button"
          className="font-semibold text-gray-700"
        >
          <Input
            placeholder="View Price Button"
            className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </Form.Item>
        {/* Upload Image */}
        <Form.Item
          name="imageUrl"
          label="Upload Image"
          className="font-semibold text-gray-700"
        >
          <Upload
            name="image"
            listType="picture"
            action="/api/skillnaav/upload-image"
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <div className="flex justify-end">
          <Button
            htmlType="submit"
            type="primary"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default React.memo(AdminDiscover);
