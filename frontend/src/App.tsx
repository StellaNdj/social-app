import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Navbar from "./components/Navbar.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Homepage />}></Route>
          <Route
            path="/signup"
            element={<Signup />}></Route>
          <Route
            path='/login'
            element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
