import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <App />
  </StrictMode>
);
  
