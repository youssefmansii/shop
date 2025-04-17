import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Typography, Button } from "@material-tailwind/react";
import CartData from "./CartData";
import axios from "axios";

const Cart = ({ isOpen, onClose, loggedUser, setLoggedUser }) => {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(loggedUser?.cart || []);

  useEffect(() => {
    setCart(loggedUser?.cart || []);
  }, [loggedUser]);

  useEffect(() => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount.toFixed(2));
  }, [cart]);

  if (!isOpen) return null;

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const updatedCart = cart.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      );
      setCart(updatedCart);

      await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, {
        cart: updatedCart,
      });

      setLoggedUser((prev) => ({ ...prev, cart: updatedCart }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);

      await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, {
        cart: updatedCart,
      });

      setLoggedUser((prev) => ({ ...prev, cart: updatedCart }));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const userId = loggedUser.id;
      const newPurchased = [...(loggedUser.purchased || []), ...cart];

      await axios.patch(`http://localhost:3000/users/${userId}`, {
        cart: [],
        purchased: newPurchased,
      });

      setCart([]);
      setLoggedUser((prev) => ({ ...prev, cart: [], purchased: newPurchased }));
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 overflow-y-auto z-50">
      {/* Cart Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-black">Your cart</h2>
        <button onClick={onClose} className="p-1 hover:opacity-70 transition">
          <XMarkIcon className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Column headers */}
      <div className="flex justify-between items-center text-gray-500 text-sm uppercase font-medium">
        <Typography variant="small">Product</Typography>
        <Typography variant="small">Total</Typography>
      </div>

      <hr className="border-t border-gray-300 my-2" />

      {/* Cart items */}
      <div className="flex flex-col gap-3 overflow-scroll max-h-[calc(100vh-260px)]">
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartData
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))
        ) : (
          <Typography
            variant="small"
            className="text-gray-500 text-center mt-4"
          >
            Your cart is empty
          </Typography>
        )}
      </div>

      <hr className="border-t border-gray-300 my-4" />

      {/* Total row */}
      <div className="flex justify-between items-center text-gray-500 text-sm uppercase font-medium">
        <Typography variant="h6" className="text-black font-semibold">
          Total
        </Typography>
        <Typography variant="h6" className="text-black font-semibold">
          LE {total}
        </Typography>
      </div>

      <Typography variant="small" className="text-gray-500 mt-1">
        Taxes, discounts and shipping calculated at checkout
      </Typography>

      <Button
        className="mt-4 w-full bg-black text-white text-lg py-3 rounded-lg"
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        Check out
      </Button>
    </div>
  );
};

export default Cart;
