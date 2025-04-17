import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import { Typography } from "@material-tailwind/react";
import Cart from "./Cart";
import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({loggedUser,setLoggedUser}) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=2").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />

      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="w-screen h-screen" />
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Typography variant="h1" className="text-4xl md:text-6xl font-bold text-center leading-tight mb-6">
            CHECK WINTER
          </Typography>
          <Typography variant="h1" className="text-4xl md:text-6xl font-bold text-center leading-tight mb-10">
            COLLECTION
          </Typography>
          <Button
            variant="outlined"
            className="rounded-full text-white border-white px-10 py-2 mb-4"
            color="white"
            onClick={() => navigate("/products")}
          >
            Shop All
          </Button>
        </div>
      </div>

      <div className="w-full bg-[#f6f6f6] px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <Typography variant="h4" className="mb-8 font-bold text-black">Featured Products</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="rounded-2xl border border-gray-300 bg-white p-6">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-[400px] w-full object-contain rounded-lg"
                  />
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded">
                    Sale
                  </span>
                </div>
                <CardBody>
                  <Typography variant="h6" className="text-black font-semibold mb-2">
                    {product.title}
                  </Typography>
                  <Typography variant="small" className="text-gray-500 uppercase tracking-widest">
                    KRACKED STUDIOS
                  </Typography>
                  <div className="mt-2">
                    <span className="line-through text-gray-400 mr-2">
                      LE {(product.price * 1.2).toFixed(2)}
                    </span>
                    <span className="text-lg font-bold text-black">LE {product.price}</span>
                  </div>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    variant="outlined"
                    className="rounded-full px-6 py-2"
                    onClick={() => navigate("/products")}
                  >
                    Choose options
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              variant="outlined"
              className="rounded-full px-6 py-2"
              onClick={() => navigate("/products")}
            >
              View all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
