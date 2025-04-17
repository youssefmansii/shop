import React, { useState } from "react";
import { Input, Textarea, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

const Contact = ({ loggedUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullData = {
        ...formData,
        email: loggedUser.email || "", // 🟢 inject email safely
      };
      await axios.post("http://localhost:3000/contact", fullData);
      setSuccess(true);
      setFormData({ name: "", phone: "", comment: "" });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="bg-[#f6f6f6] min-h-screen py-10 px-6 md:px-20">
      <Typography variant="h2" className="text-black font-bold mb-8">
        Contact
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6 max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            value={loggedUser.email || ""}
           
          />
        </div>
        <Input
          label="Phone number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Textarea
          label="Comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-32 self-start">
          Send
        </Button>
        {success && (
          <Typography color="green" variant="small">
            Message sent successfully!
          </Typography>
        )}
      </form>
    </div>
  );
};

export default Contact;
