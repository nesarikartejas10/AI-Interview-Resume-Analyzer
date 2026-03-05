import { RouterProvider } from "react-router-dom";
import { router } from "./routing/app.routes";
import { AuthProvider } from "./features/auth/auth.context";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
