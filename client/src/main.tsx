import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { Provider } from "react-redux";
import { appStore } from "./store/index.js";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/authContext.js";
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={appStore}>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Toaster richColors />
    </Provider>
  );
} else {
  throw new Error('Root element with id "root" not found');
}