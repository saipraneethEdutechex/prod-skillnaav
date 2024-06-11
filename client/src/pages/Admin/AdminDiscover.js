import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  AddImage,
  RemoveImage,
  SetImages,
} from "../../redux/rootSlice";
import axios from "axios";
import { motion } from "framer-motion";

// Import all images
function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../../../src/images", false, /\.(png|jpe?g|svg)$/)
);

function AdminDiscover() {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const dispatch = useDispatch();
  const { skillnaavData, images: allImages } = useSelector(
    (state) => state.root
  );

  const getImage = useCallback(async () => {
    try {
      const result = await axios.get("/get-image");
      dispatch(SetImages(result.data.data));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getImage();
  }, []);

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`/delete-image/${imageId}`);
      dispatch(RemoveImage(imageId));
      message.success("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting image:", error);
      message.error("Failed to delete image. Please try again later.");
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        message.error("Please select a file to upload.");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/upload", formData);
      dispatch(AddImage(response.data));
      message.success("Image uploaded successfully.");
      setPreviewUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to upload image. Please try again later.");
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/skillnaav/update-discover", {
        ...values,
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

  const onInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };

  if (!skillnaavData || !skillnaavData.discover || !skillnaavData.discover[0]) {
    return <div>Loading...</div>;
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
        <input type="file" onChange={onInputChange} />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              marginBottom: "10px",
            }}
          />
        )}
        <Button type="primary" onClick={handleUpload}>
          Upload Image
        </Button>
        <div className="grid grid-cols-3 items-center justify-center justify-items-center px-[20px] align-middle lg:grid-cols-5">
          {Object.values(allImages).map((image, index) => (
            <div key={index}>
              <motion.img
                height={100}
                width={100}
                src={images[image.image]}
                alt={`Company ${index + 1}`}
              />
              <button onClick={() => handleDeleteImage(image._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            htmlType="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AdminDiscover;
