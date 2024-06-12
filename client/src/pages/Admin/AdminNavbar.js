import React, { useState } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function AdminNavbar() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    axios
      .post("/upload", formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setFile(null);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

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
