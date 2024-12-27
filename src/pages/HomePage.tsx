import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SignInForm from "../components/SignInForm/SignInForm";

export default function HomePage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/user");
    return null;
  }

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1>Work List App</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowSignIn(true)}
        >
          Sign In
        </button>
      </header>
      <main className="p-4">
        {showSignIn ? (
          <SignInForm onClose={() => setShowSignIn(false)} />
        ) : (
          <div>No works available</div>
        )}
      </main>
    </div>
  );
}
