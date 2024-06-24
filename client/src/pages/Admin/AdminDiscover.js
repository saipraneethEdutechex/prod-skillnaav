import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Upload, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import {
  LoadingOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function AdminDiscover() {
  const [form] = Form.useForm();
  const [discoverImgUrl, setDiscoverImgUrl] = useState("");
  const [compImageUrls, setCompImageUrls] = useState([]); // State to hold company image URLs
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
        compImageUrls: compImageUrls, // Pass updated compImageUrls to backend
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

  const handleDiscoverImageUpload = ({ file }) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);

    fileRef
      .put(file)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          setDiscoverImgUrl(downloadURL);
          // Update Redux state with the new imgUrl
          dispatch({
            type: "UPDATE_DISCOVER_IMG_URL",
            payload: downloadURL,
          });
        });
      })
      .catch((error) => {
        console.error("Discover image upload error:", error);
        message.error(
          "Failed to upload discover image. Please try again later."
        );
      });
  };

  const handleCompanyImageUpload = async ({ file }) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);

    try {
      const snapshot = await fileRef.put(file);
      const downloadURL = await snapshot.ref.getDownloadURL();
      if (compImageUrls.length < 5) {
        setCompImageUrls([...compImageUrls, downloadURL]);
        // Update Redux state with the new compImageUrls
        dispatch({
          type: "UPDATE_COMP_IMAGE_URLS",
          payload: [...compImageUrls, downloadURL],
        });

        await axios.post("/api/skillnaav/add-discover-comp-img", {
          imageUrl: downloadURL,
        });
      } else {
        message.warning("You can upload a maximum of 5 images.");
      }
    } catch (error) {
      console.error("Company image upload error:", error);
      message.error("Failed to upload company image. Please try again later.");
    }
  };

  const handleImageRemove = async (urlToRemove) => {
    const filteredUrls = compImageUrls.filter((url) => url !== urlToRemove);
    setCompImageUrls(filteredUrls);
    // Update Redux state with the filtered compImageUrls
    dispatch({
      type: "UPDATE_COMP_IMAGE_URLS",
      payload: filteredUrls,
    });

    try {
      await axios.delete(
        `/api/skillnaav/delete-discover-comp-img/${encodeURIComponent(
          urlToRemove
        )}`
      );
      message.success("Company image deleted successfully");
    } catch (error) {
      console.error("Company image delete error:", error);
      message.error("Failed to delete company image. Please try again later.");
    }
  };

  // Return loading indicator or form based on whether data is available
  if (
    !skillnaavData ||
    !skillnaavData.discover ||
    skillnaavData.discover.length === 0
  ) {
    return <Skeleton active />;
  }

  const discover = skillnaavData.discover[0];
  const { discoverheading, discoversubheading, tryforfreebtn, viewpricebtn } =
    discover;

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
          name="image"
          label="Upload Discover Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          className="font-semibold text-gray-700"
        >
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleDiscoverImageUpload}
          >
            {discoverImgUrl ? (
              <img
                src={discoverImgUrl}
                alt="discover image"
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <div>
                <UploadOutlined style={{ fontSize: 24 }} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          {discoverImgUrl && (
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={() => setDiscoverImgUrl("")}
              style={{ marginTop: 10 }}
            >
              Remove Image
            </Button>
          )}
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
        <Form.Item
          name="compImageUrls"
          label="Upload Company Images"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          className="font-semibold text-gray-700"
        >
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true} // Show upload list for multiple images
            beforeUpload={() => false} // Disable automatic upload
            onChange={handleCompanyImageUpload}
          >
            {compImageUrls.map((url) => (
              <div key={url} className="image-preview">
                <img src={url} alt="company image" style={{ width: "100%" }} />
                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  onClick={() => handleImageRemove(url)}
                  style={{ marginTop: 10 }}
                >
                  Remove
                </Button>
              </div>
            ))}
            {compImageUrls.length < 5 && (
              <div>
                <UploadOutlined style={{ fontSize: 24 }} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>

      {/* Preview Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Preview Section
        </h2>
        <div className="flex justify-center items-center space-x-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Discover Image:</h3>
            {discoverImgUrl ? (
              <img
                src={discoverImgUrl}
                alt="discover image"
                style={{ width: "300px", height: "auto" }}
              />
            ) : (
              <p>No discover image uploaded</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Company Images:</h3>
            <div className="flex flex-wrap">
              {compImageUrls.map((url) => (
                <div key={url} className="company-image-preview">
                  <img
                    src={url}
                    alt="company image"
                    style={{
                      width: "100px",
                      height: "auto",
                      marginBottom: "8px",
                    }}
                  />
                </div>
              ))}
              {compImageUrls.length === 0 && <p>No company images uploaded</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDiscover;
