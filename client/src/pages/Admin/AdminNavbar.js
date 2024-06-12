import React, { useState, useEffect } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function AdminNavbar() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const formData = new FormData();
  formData.append("file", file);
  const handleUpload = () => {
    if (!file) {
      message.error("Please select a file to upload");
      return;
    }

    setLoading(true);

    axios
      .post("/api/upload", formData)
      .then((res) => {
        console.log(res);
        message.success("File uploaded successfully");
        setLoading(false);
        setFile(null);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to upload file");
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get("/api/getImage")
      .then((res) => {
        console.log(res);
        message.success("File uploaded successfully");
        setLoading(false);
        setFile(null);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to upload file");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? <Spin indicator={antIcon} /> : "Upload"}
      </button>
    </div>
  );
}

export default React.memo(AdminNavbar);
