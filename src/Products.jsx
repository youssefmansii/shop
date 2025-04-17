import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import ProductModal from "./ProductModal";

const Products = ({ loggedUser, setLoggedUser }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=8")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center text-lg">Loading products...</p>;

  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <Typography variant="h4" className="text-3xl font-bold">Products</Typography>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full sm:w-64"
            />
            <div className="flex items-center gap-2">
              <label className="text-sm">Sort by:</label>
              <select className="border px-3 py-1 rounded-md text-sm">
                <option>Alphabetically, A-Z</option>
                <option>Alphabetically, Z-A</option>
                <option>Price, Low to High</option>
                <option>Price, High to Low</option>
              </select>
              <span className="text-sm text-gray-500 hidden sm:inline">{filteredProducts.length} products</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id} className="rounded-2xl border border-gray-300 bg-white p-3">
                <div className="relative rounded overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-64 w-full object-contain rounded-lg"
                  />
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Sale
                  </span>
                </div>
                <CardBody className="text-center">
                  <Typography className="text-sm font-semibold">
                    {product.title}
                  </Typography>
                  <div className="text-sm mt-2">
                    <span className="line-through text-gray-400 mr-2">
                      LE {(product.price * 1.2).toFixed(2)}
                    </span>
                    <span className="text-black font-bold">LE {product.price}</span>
                  </div>
                </CardBody>
                <CardFooter className="mt-2 text-center">
                  <Button
                    variant="outlined"
                    className="rounded-full border-2 px-6 py-2"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Choose options
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center col-span-4">No products found</p>
          )}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        loggedUser={loggedUser}
      />
    </div>
  );
};

export default Products;
