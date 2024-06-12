import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminNavbar() {
  const [file, setFile] = useState(null);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    getImage();
  }, []);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/api/upload", formData)
      .then((res) => {
        console.log(res);
        getImage();
      })
      .catch((err) => console.log(err));
  };

  const getImage = async () => {
    try {
      const result = await axios.get("/api/getImage");
      console.log(result);
      setAllImages(result.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {allImages.map((data, index) => (
        <img
          key={index}
          src={`../../Images/Navbar/${data.image}`}
          alt="uploaded"
        />
      ))}
    </div>
  );
}

export default AdminNavbar;
