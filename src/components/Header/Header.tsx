import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface HeaderProps {
  onSignInClick: () => void;
}

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1>Work List App</h1>
      {!isAuthenticated && (
        <button
          onClick={() => navigate("/signin")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>
      )}
    </header>
  );
};

export default Header;
