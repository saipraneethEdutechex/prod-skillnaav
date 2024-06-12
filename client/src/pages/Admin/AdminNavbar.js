import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetImages } from "../../redux/rootSlice";

function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
    return null;
  });
  return images;
}

const allImages = importAll(
  require.context("../../Images/Navbar", false, /\.(png|jpe?g|svg)$/)
);

function AdminNavbar() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.root.images);
  const [file, setFile] = useState(null);

  const fetchImages = async () => {
    try {
      const result = await axios.get("/api/getImage");
      dispatch(SetImages(result.data.data));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [dispatch]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/api/upload", formData)
      .then((res) => {
        console.log(res);
        fetchImages();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <div className="grid grid-cols-3 gap-4">
        {images &&
          images.map((image, index) => (
            <motion.img
              key={index}
              whileHover={{ scale: 1.1 }}
              src={allImages[image.image]}
              alt={`Uploaded ${index + 1}`}
              className="h-16 w-auto"
            />
          ))}
      </div>
    </div>
  );
}

export default AdminNavbar;
