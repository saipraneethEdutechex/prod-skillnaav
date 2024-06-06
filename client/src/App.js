import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetSkillNaavData } from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Login from "./pages/Admin/Login";

function App() {
  const { loading, skillnaavData, reloadData, ReloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();

  const getSkillNaavData = async () => {
    try {
      const response = await axios.get("/api/skillnaav/get-skillnaav-data");
      dispatch(SetSkillNaavData(response.data));
      dispatch(ReloadData(false));
      console.log(response);
      dispatch(HideLoading());
    } catch (e) {
      dispatch(HideLoading());
    }
  };
  useEffect(() => {
    if (!skillnaavData) {
      getSkillNaavData();
    }
  }, [skillnaavData]);
  useEffect(() => {
    if (reloadData) {
      getSkillNaavData();
    }
  }, [reloadData]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
