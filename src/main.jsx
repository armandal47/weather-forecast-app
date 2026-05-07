import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css"o;
import WeatherCard from "./componentes/weatherCard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WeatherCard />
  </StrictMode>,
);
