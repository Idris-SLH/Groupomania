import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Error from "../../pages/Error";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default Index;
