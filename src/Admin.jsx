import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Input,
} from "@material-tailwind/react";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setUsers(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3000/products");
    setProducts(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const removeProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async (id, updatedFields) => {
    try {
      const updatedProduct = products.find((p) => p.id === id);
      const updated = { ...updatedProduct, ...updatedFields };
      await axios.put(`http://localhost:3000/products/${id}`, updated);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // Stats
  const productCount = products.length;
  const userCount = users.length;
  const totalPurchasedCount = users.reduce(
    (total, u) =>
      total +
      (u.purchased?.reduce((sum, p) => sum + (p.quantity || 0), 0) || 0),
    0
  );
  const totalPurchasedValue = users.reduce(
    (total, u) =>
      total +
      (u.purchased?.reduce((sum, p) => sum + (p.total || 0), 0) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <Typography variant="h5">Admin Dashboard</Typography>
        <Button color="red" onClick={handleLogout}>Logout</Button>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <Card className="p-4 bg-white shadow">
            <Typography variant="h6">Products</Typography>
            <Typography className="text-2xl font-bold">{productCount}</Typography>
          </Card>
          <Card className="p-4 bg-white shadow">
            <Typography variant="h6">Users</Typography>
            <Typography className="text-2xl font-bold">{userCount}</Typography>
          </Card>
          <Card className="p-4 bg-white shadow">
            <Typography variant="h6">Items Purchased</Typography>
            <Typography className="text-2xl font-bold">{totalPurchasedCount}</Typography>
          </Card>
          <Card className="p-4 bg-white shadow">
            <Typography variant="h6">Total Revenue</Typography>
            <Typography className="text-2xl font-bold">LE {totalPurchasedValue.toFixed(2)}</Typography>
          </Card>
        </div>

        {/* Users */}
        <Typography variant="h4" className="mb-4">Users</Typography>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {users.map((user) => (
            <Card key={user.id} className="p-4 bg-white shadow">
              <CardBody>
                <Typography variant="h6">{user.email || "No Email"}</Typography>
                <Typography>ID: {user.id}</Typography>
                <Button
                  color="red"
                  className="mt-2"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete User
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Products */}
        <Typography variant="h4" className="mb-4">Products</Typography>
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="p-4 bg-white shadow">
              <CardBody>
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain mx-auto mb-4"
                />
                <Typography variant="h6">{product.title}</Typography>
                <div className="mt-2">
                  <Input
                    label="Price"
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      updateProduct(product.id, { price: parseFloat(e.target.value) })
                    }
                    className="mb-2"
                  />
                  <Input
                    label="Quantity"
                    type="number"
                    value={product.count || 0}
                    min={0}
                    step={1}
                    onChange={(e) =>
                      updateProduct(product.id, {
                        count: Math.max(0, parseInt(e.target.value) || 0),
                      })
                    }
                  />
                </div>
                <Button
                  color="red"
                  className="mt-4"
                  onClick={() => removeProduct(product.id)}
                >
                  Remove
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
