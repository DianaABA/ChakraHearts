import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { preloadTransitions } from "./utils/transitions";

// Initialize smooth transitions
preloadTransitions();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
