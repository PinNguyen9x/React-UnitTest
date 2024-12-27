import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import SignInForm from "../components/SignInForm/SignInForm";
import { useAuth } from "../hooks/useAuth";
import { WorkList } from "../WorkList";

const HomePage = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to user page if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Header onSignInClick={() => setShowSignIn(true)} />
      <main className="p-4">
        <WorkList />
      </main>
      {showSignIn && <SignInForm onClose={() => setShowSignIn(false)} />}
    </div>
  );
};

export default HomePage;
