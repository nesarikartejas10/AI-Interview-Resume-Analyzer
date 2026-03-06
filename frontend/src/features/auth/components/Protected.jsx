import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Protected;
