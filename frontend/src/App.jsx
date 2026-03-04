import { RouterProvider } from "react-router-dom";
import { router } from "./routing/app.routes";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
