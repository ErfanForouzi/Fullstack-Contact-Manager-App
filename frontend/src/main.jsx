import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./routes/router.jsx";
import "./utils/globalFunctions.js";

import "bootstrap/dist/css/bootstrap.rtl.css";
import "vazirmatn/Vazirmatn-font-face.css";
import "react-toastify/ReactToastify.css";
import "./assets/css/styles.css";
import "./assets/css/variables.css";

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
