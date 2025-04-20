import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from './Home';
import Signup from './Signup';
import Cart from './Cart';
import Login from './Login';
import Products from './Products';
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./Profile";
import Contact from "./Contact";
import Admin from "./Admin";
import axios from "axios";
import NotFound from "./NotFound";

const App = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const location = useLocation();

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
  // const getproducts=() => {
  //   axios
  //     .get("https://fakestoreapi.com/products?limit=8")
  //     .then((res) => {
  //       setProducts(res.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //       setLoading(false);
  //     });
  //   }
  

  useEffect(() => {
    fetchUser();
  }, []);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const isAdminPage = location.pathname === "/admin";

  return (
    <div>
      {/* Hide navbar on admin page */}
      {!isAdminPage && localStorage.getItem("userId") && (
        <Navbar onCartClick={() => setCartOpen(true)} loggedUser={loggedUser} />
      )}

      {!isAdminPage && (
        <Cart
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />
      )}

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
              <Contact loggedUser={loggedUser} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={isAdmin ? <Admin /> : <Login />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default App;
