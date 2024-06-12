import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const AdminNavbar = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/getImage");
      setImages(result.data.data);
      console.log("Images fetched successfully:", result.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/api/upload", formData)
      .then((res) => {
        console.log("Image uploaded successfully:", res);
        // Add the newly uploaded image to the existing images array
        setImages((prevImages) => [...prevImages, res.data.data]);
        fetchImages(); // Fetch images again to ensure the state is up to date
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/deleteImage/${id}`)
      .then((res) => {
        console.log("Image deleted successfully:", res);
        fetchImages();
      })
      .catch((err) => {
        console.error("Error deleting image:", err);
      });
  };

  return (
    <div className="admin-navbar-container p-4 mx-auto max-w-screen-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Upload
          </button>
        </div>
        {loading && <p className="text-gray-600">Loading...</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative rounded overflow-hidden bg-white shadow-md"
          >
            {image &&
              image.image && ( // Add a check to ensure image and image.image are defined
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={allImages[image.image]}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              )}
            {image && ( // Add a check to ensure image is defined
              <button
                onClick={() => handleDelete(image._id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNavbar;
