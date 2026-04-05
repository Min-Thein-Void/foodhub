import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

type Category = {
  id: number;
  name: string;
};

function AdminCreateMenu() {

  const router = useRouter();

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
        router.push("/admin")
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
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 md:p-8">
      <div className="mb-4 md:mb-6">
        <Link href="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base">
          <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Create New Menu Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Menu Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="Enter menu item name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 md:h-32 resize-none text-sm md:text-base"
            placeholder="Enter menu item description"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Price ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            placeholder="0.00"
            required
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Menu Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
              id="image-upload"
              required
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="text-gray-500">
                <svg className="mx-auto h-8 w-8 md:h-12 md:w-12 mb-2 md:mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm md:text-lg font-medium">Click to upload image</p>
                <p className="text-xs md:text-sm">PNG, JPG, GIF up to 10MB</p>
              </div>
            </label>
          </div>
          {imageFile && (
            <p className="mt-2 text-xs md:text-sm text-gray-600">Selected: {imageFile.name}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm md:text-base"
        >
          Create Menu Item
        </button>
      </form>
    </div>
  )
}

export default AdminCreateMenu