import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
      </Routes>
    </>
  );
};

export default App;
