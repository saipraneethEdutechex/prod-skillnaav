import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetSkillNaavData } from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Login from "./pages/Admin/Login";

function App() {
  const { skillnaavData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getSkillNaavData = async () => {
    try {
      const response = await axios.get("/api/skillnaav/get-skillnaav-data");
      dispatch(SetSkillNaavData(response.data));
      dispatch(HideLoading());
    } catch (error) {
      console.error("Error fetching SkillNaav data:", error);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    if (!skillnaavData || reloadData) {
      getSkillNaavData();
    }
  }, [skillnaavData, reloadData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
