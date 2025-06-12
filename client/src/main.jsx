import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./store/index.js";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster richColors />
  </Provider>
);
