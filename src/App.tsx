import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/signin" element={<div></div>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
