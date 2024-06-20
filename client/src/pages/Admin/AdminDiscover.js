import React, { useState } from "react";
import { Form, Input, Button, message, Skeleton, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  UpdateDiscoverImageUrl,
} from "../../redux/rootSlice";
import axios from "axios";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function AdminDiscover() {
  const dispatch = useDispatch();
  const { skillnaavData } = useSelector((state) => state.root);
  const [imageUrl, setImageUrl] = useState(
    skillnaavData?.discover[0]?.imageUrl || null
  );
  const [file, setFile] = useState(null);

  const handleFileChange = (info) => {
    const file = info.file;
    if (file) {
      console.log("File selected:", file); // Log the file object
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      console.log("Preview URL:", imageUrl); // Log the preview URL
      setImageUrl(imageUrl); // Update local state with the preview URL
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      // If there's a file, upload it first
      let uploadedImageUrl = imageUrl; // Keep current imageUrl unless updated
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadResponse = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (uploadResponse.data.success) {
          uploadedImageUrl = uploadResponse.data.filePath;
          console.log("Uploaded image path:", uploadedImageUrl); // Log uploaded image path
          // setImageUrl(uploadedImageUrl); // Update local state with new image URL
        } else {
          message.error("Failed to upload image");
          dispatch(HideLoading());
          return;
        }
      }

      const response = await axios.post("/api/skillnaav/update-discover", {
        ...values,
        _id: skillnaavData.discover[0]._id,
        imageUrl: uploadedImageUrl, // Ensure to send the updated imageUrl
      });

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        // Update Redux state with the new image URL
        dispatch(UpdateDiscoverImageUrl(uploadedImageUrl));
        setImageUrl(uploadedImageUrl); // Update local state with new image URL after successful update
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to save changes. Please try again later.");
      console.error("Error:", error);
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
        <Form.Item label="Upload Image">
          <Upload
            beforeUpload={() => false} // Prevent auto-upload
            onChange={handleFileChange}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="uploaded"
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}
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
