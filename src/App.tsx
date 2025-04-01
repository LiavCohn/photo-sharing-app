import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import React from "react";

function App() {

  return (
    <Router>
      <Routes>
        {/* Protect all routes under RequireAuth */}
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<Home />} /> {/* Home page for authenticated users */}
        </Route>

        {/* Catch-all: Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
