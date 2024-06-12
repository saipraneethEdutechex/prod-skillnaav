import React, { useState } from "react";
import { Form, Input, Button, message, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function AdminNavbar() {
  const [file, setFile] = useState();

  const handleUpload = (e) => {
    console.log(file);
  };
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default React.memo(AdminNavbar);
