import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Navbar from "./components/Navbar.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import { useAuthContext } from "./hooks/useAuthContext.tsx";
import './index.css';

interface AuthContextType {
  user: {
    id: string;
    token: string;
  } | null;
}

function App() {
  const { user } = useAuthContext() as AuthContextType;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <Navbar />
                  <Homepage />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }>
          </Route>
          <Route
            path="/signup"
            element={!user ? <Signup />: <Navigate to="/"></Navigate>}></Route>
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
