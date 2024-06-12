import React, { useState, useEffect } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function AdminNavbar() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUpload = () => {
    if (!file) {
      message.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    axios
      .post("/api/upload", formData)
      .then((res) => {
        console.log(res);
        message.success("File uploaded successfully");
        setLoading(false);
        setFile(null);
        fetchImage();
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to upload file");
        setLoading(false);
      });
  };

  const fetchImage = () => {
    setLoading(true);
    axios
      .get("/api/getImage")
      .then((res) => {
        console.log(res);
        if (res.data && res.data.skillnaavlogo) {
          setUploadedImage(`/ImageFolder/Images/${res.data.skillnaavlogo}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to fetch image");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? <Spin indicator={antIcon} /> : "Upload"}
      </button>
      {uploadedImage && (
        <img
          src={uploadedImage}
          alt="Uploaded"
          style={{ marginTop: "20px", width: "200px" }}
        />
      )}
    </div>
  );
}

export default React.memo(AdminNavbar);
