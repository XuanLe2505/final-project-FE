import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes";
import MThemeProvider from "./themes/MThemeProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MThemeProvider>
          <Router />
        </MThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
