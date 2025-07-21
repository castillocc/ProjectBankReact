import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "0.875rem",
            padding: "10px 16px",
          },
          duration: 4000,
        }}
      />
    </>
  );
}

export default App;
