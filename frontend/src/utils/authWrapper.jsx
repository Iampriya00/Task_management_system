import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router for routing
import { useAppSelector } from "../store/hooks";

const AuthWrapper = ({ children, requiredRole }) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !token) {
      navigate("/"); // Redirect to login page if not logged in or no token
    } else if (requiredRole && !requiredRole.includes(user?.role)) {
      navigate("/"); // Redirect to homepage if the user does not have the required role
    }
  }, [isLoggedIn, token, user, requiredRole, navigate]);

  return <>{children}</>;
};

export default AuthWrapper;
