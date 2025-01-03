import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorThrower from "./components/ErrorThrower";
import { Navigation } from "./components/Navigation";
import { AuthProvider } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div>
        <h1>Test Sentry Error Boundary</h1>
        <ErrorThrower />

        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/signin" element={<div></div>} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
