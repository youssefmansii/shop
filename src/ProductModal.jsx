// src/components/ProductModal.jsx
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";

const sizes = ["Small", "Medium", "Large"];

const ProductModal = ({ product, onClose,loggedUser }) => {
  const [selectedSize, setSelectedSize] = useState("Small");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = async () => {
    try {
      const userId = 1; // static user ID
      const response = await axios.get(`http://localhost:3000/users/${loggedUser.id}`);
      const userData = response.data;
      let updatedCart = userData.cart || [];

      const existingItem = updatedCart.find((item) => item.id === product.id);

      if (existingItem) {
        updatedCart = updatedCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: item.price * (item.quantity + quantity),
              }
            : item
        );
      } else {
        updatedCart.push({
          ...product,
          quantity,
          total: product.price * quantity,
          size: selectedSize,
        });
      }

      await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, { cart: updatedCart });
      onClose();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden relative flex">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="w-1/2 p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-xl w-full h-[400px] object-contain"
          />
        </div>

        <div className="w-1/2 p-6">
          <Typography variant="h6" className="mb-2 text-gray-600">
            Kracked Studios
          </Typography>
          <Typography variant="h3" className="font-bold mb-4">
            {product.title}
          </Typography>

          <div className="mb-4 text-lg">
            <span className="line-through text-gray-400 mr-2">
              LE {(product.price * 1.2).toFixed(2)}
            </span>
            <span className="font-bold text-black">LE {product.price}</span>
            <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">Sale</span>
          </div>

          <div className="mb-4">
            <Typography className="mb-2 font-medium">Size</Typography>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "filled" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                  className="rounded-full px-4 py-2 text-sm"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <Typography className="mb-2 font-medium">Quantity</Typography>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                variant="outlined"
                className="rounded-full px-4"
              >
                -
              </Button>
              <span className="text-lg font-medium">{quantity}</span>
              <Button
                onClick={() => setQuantity(quantity + 1)}
                variant="outlined"
                className="rounded-full px-4"
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleAddToCart}
              className="rounded-full border-2 border-black text-black bg-white hover:bg-gray-100 text-lg py-3"
            >
              Add to cart
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
