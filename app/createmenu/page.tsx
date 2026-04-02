"use client";

import React, { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

const CreateMenu: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", imageFile);

      // 🔥 IMPORTANT
      formData.append("categoryId", selectedCategory);

      const res = await fetch("/api/menu", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Menu item created successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setImageFile(null);
        setSelectedCategory("");
      } else {
        alert("Error creating menu item.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create Menu Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* 🔥 Category Select */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category
          </label>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-md"
        >
          Create Menu
        </button>
      </form>
    </div>
  );
};

export default CreateMenu;
