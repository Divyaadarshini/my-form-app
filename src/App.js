import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Box } from "./FormStart";
import Form from "./components/Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Box />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
