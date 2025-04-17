// App.jsx
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from './Home';
import Signup from './Signup';
import Cart from './Cart';
import Login from './Login';
import Products from './Products';
import Navbar from "./Navbar";

import axios from "axios";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./Profile";
import Contact from "./Contact";




const App = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const res = await axios.get(`http://localhost:3000/users/${userId}`);
      setLoggedUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {/* Navbar on all pages */}
      <Navbar onCartClick={() => setCartOpen(true)}  loggedUser={loggedUser}/>

      {/* Global cart drawer */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart
                isOpen={true}
                onClose={() => {}}
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
            <Contact loggedUser={loggedUser}/>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
