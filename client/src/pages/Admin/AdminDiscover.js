import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Upload, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import {
  LoadingOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ImageLazyLoad from "react-lazyload";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AdminDiscover = () => {
  const [form] = Form.useForm();
  const [discoverImgUrl, setDiscoverImgUrl] = useState("");
  const [compImageUrls, setCompImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const { skillnaavData, loading } = useSelector((state) => state.root);

  useEffect(() => {
    if (
      skillnaavData &&
      skillnaavData.discover &&
      skillnaavData.discover.length > 0
    ) {
      const discover = skillnaavData.discover[0];
      setDiscoverImgUrl(discover.imgUrl || "");
      setCompImageUrls(discover.compImageUrls || []);
    }
  }, [skillnaavData]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/skillnaav/update-discover", {
        ...values,
        _id: skillnaavData.discover[0]._id,
        imgUrl: discoverImgUrl,
        compImageUrls: compImageUrls,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success("Changes saved successfully");
      } else {
        message.error(response.data.message || "Failed to save changes");
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to save changes. Please try again later.");
      console.error("Error:", error);
    }
  };

  const handleDiscoverImageUpload = ({ file }) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`discover/${Date.now()}_${file.name}`);

    setUploading(true);

    fileRef
      .put(file)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          setDiscoverImgUrl(downloadURL);
          dispatch({
            type: "UPDATE_DISCOVER_IMG_URL",
            payload: downloadURL,
          });
          message.success("Discover image uploaded successfully");
        });
      })
      .catch((error) => {
        console.error("Discover image upload error:", error);
        message.error("Failed to upload discover image");
      })
      .finally(() => setUploading(false));
  };

  const handleCompanyImageUpload = async ({ file }) => {
    if (compImageUrls.length >= 5) {
      message.warning("You can upload a maximum of 5 images.");
      return;
    }

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`company/${Date.now()}_${file.name}`);

    setUploading(true);

    try {
      const snapshot = await fileRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();

      setCompImageUrls([...compImageUrls, downloadURL]);
      dispatch({
        type: "UPDATE_COMP_IMAGE_URLS",
        payload: [...compImageUrls, downloadURL],
      });

      await axios.post("/api/skillnaav/add-discover-comp-img", {
        imageUrl: downloadURL,
      });
      message.success("Company image uploaded successfully");
    } catch (error) {
      console.error("Company image upload error:", error);
      message.error("Failed to upload company image");
    } finally {
      setUploading(false);
    }
  };

  const handleImageRemove = async (urlToRemove) => {
    try {
      const response = await axios.delete(
        `/api/skillnaav/delete-discover-comp-img/${encodeURIComponent(
          urlToRemove
        )}`
      );
      if (response.data.success) {
        message.success("Company image deleted successfully");
        setCompImageUrls(compImageUrls.filter((url) => url !== urlToRemove));
      } else {
        message.error(
          response.data.message || "Failed to delete company image"
        );
      }
    } catch (error) {
      console.error("Company image delete error:", error);
      message.error("Failed to delete company image");
    }
  };

  if (
    !skillnaavData ||
    !skillnaavData.discover ||
    skillnaavData.discover.length === 0
  ) {
    return <Spin spinning={true} indicator={antIcon} />;
  }

  const discover = skillnaavData.discover[0];
  const discovercompimg = skillnaavData.discovercompimg || [];

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Edit Discover Section
      </h1>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={discover}
        className="space-y-6"
      >
        <Form.Item
          name="discoverheading"
          label="Discover Heading"
          className="font-semibold text-gray-700"
        >
          <Input placeholder="Enter Discover Heading" />
        </Form.Item>
        <Form.Item
          name="discoversubheading"
          label="Discover Sub Heading"
          className="font-semibold text-gray-700"
        >
          <Input.TextArea rows={4} placeholder="Enter Discover Sub Heading" />
        </Form.Item>
        <Form.Item
          name="tryforfreebtn"
          label="Try for Free Button"
          className="font-semibold text-gray-700"
        >
          <Input placeholder="Enter Try for Free Button" />
        </Form.Item>
        <Form.Item
          name="image"
          label="Upload Discover Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          className="font-semibold text-gray-700"
        >
          <Upload
            name="image"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleDiscoverImageUpload}
          >
            {discoverImgUrl ? (
              <img
                src={discoverImgUrl}
                alt="Discover"
                style={{ width: "100%" }}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <UploadOutlined className="text-3xl text-gray-500" />
                <div className="ml-2 text-gray-500">Upload</div>
              </div>
            )}
          </Upload>
          {discoverImgUrl && (
            <Button type="link" onClick={() => setDiscoverImgUrl("")}>
              Remove
            </Button>
          )}
        </Form.Item>
        <Form.Item
          name="viewpricebtn"
          label="View Price Button"
          className="font-semibold text-gray-700"
        >
          <Input placeholder="Enter View Price Button" />
        </Form.Item>
        <Form.Item
          name="compImageUrls"
          label="Upload Company Images"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          className="font-semibold text-gray-700"
        >
          <div className="grid grid-cols-3 gap-4">
            {compImageUrls.map((url, index) => (
              <div
                key={url}
                className="relative overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={url}
                  alt={`Company ${index + 1}`}
                  className="w-full"
                />
                <Button
                  type="link"
                  onClick={() => handleImageRemove(url)}
                  icon={<DeleteOutlined />}
                  className="absolute top-2 right-2 text-red-500"
                >
                  Remove
                </Button>
              </div>
            ))}
            {compImageUrls.length < 5 && (
              <label className="relative flex items-center justify-center w-full h-full bg-gray-100 rounded-lg cursor-pointer">
                <UploadOutlined className="text-3xl text-gray-500" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleCompanyImageUpload({ file: e.target.files[0] })
                  }
                />
              </label>
            )}
            {compImageUrls.length === 5 && (
              <div className="relative flex items-center justify-center w-full h-full bg-gray-100 rounded-lg cursor-pointer opacity-50">
                <UploadOutlined className="text-3xl text-gray-500" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleCompanyImageUpload({ file: e.target.files[0] })
                  }
                  disabled
                />
              </div>
            )}
          </div>
          {compImageUrls.length === 5 && (
            <p className="text-gray-500 text-sm mt-2">
              Maximum of 5 images uploaded.
            </p>
          )}
        </Form.Item>
        {discovercompimg.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Preview Company Images
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {discovercompimg.map((image, index) => (
                <ImageLazyLoad key={image._id} height={200} offset={100}>
                  <div>
                    <img
                      src={image.imageUrl}
                      alt={`Company ${index + 1}`}
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                      className="rounded-lg shadow-md"
                    />
                    <Button
                      type="link"
                      onClick={() => handleImageRemove(image._id)}
                      icon={<DeleteOutlined />}
                      className="text-red-500"
                    >
                      Delete
                    </Button>
                  </div>
                </ImageLazyLoad>
              ))}
            </div>
          </div>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
      <Spin spinning={uploading} indicator={antIcon} />
    </div>
  );
};

export default AdminDiscover;
