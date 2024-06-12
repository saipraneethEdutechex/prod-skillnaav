import React, { useState, useEffect } from "react";
import axios from "axios";
function AdminNavbar() {
  const [file, setFile] = useState();
  const [allImages, setAllImages] = useState();

  useEffect(() => {
    getImage();
  }, []);
  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/api/upload", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const getImage = async () => {
    const result = await axios.get("/api/getImage");
    console.log(result);
    setAllImages(result.data.data);
  };
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default AdminNavbar;
