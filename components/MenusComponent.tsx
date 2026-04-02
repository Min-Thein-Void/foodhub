"use client";
import MenuItemCard from "@/components/MenuItemCard";
import { useCategoryFilterStore } from "@/store/useCategoryFilterStore";
import { useEffect, useState } from "react";
import "../app/globals.css"

type Category = {
  id: number;
  name: string;
};

interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: { name: string };
}

interface MenusComponentProps {
  menus: Menu[];
}

function MenusComponent({ menus }: MenusComponentProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const category = useCategoryFilterStore((state) => state.category);

  const setCategory = useCategoryFilterStore((state) => state.setCategory);

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

  const filteredMenus =
    category === "all"
      ? menus
      : menus.filter((menu) => menu.category.name === category);

  const handleClearCategorySearch = () => {
    setCategory("all");
  };

  const isActiveCategory = (name: string) => category === name;

  const getCategoryButtonClasses = (name: string) =>
    `px-4 py-2 rounded-full border text-sm font-medium transition whitespace-nowrap ${
      isActiveCategory(name)
        ? "bg-orange-500 border-orange-500 text-white shadow-lg"
        : "bg-white border-orange-200 text-orange-600 hover:bg-orange-50 dark:bg-slate-800 dark:border-slate-700 dark:text-orange-300 dark:hover:bg-slate-700"
    }`;

  return (
    <section className="bg-slate-50 py-16 px-4 md:px-12 dark:bg-slate-950">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-12 rounded-[2rem] border border-orange-200/70 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.4em] text-orange-500/80 dark:text-orange-300">
          Explore by category
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white">
          Discover Our Culinary Selection
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
          Choose a category to filter your menu and find the perfect meal for every craving.
        </p>
      </div>

      {/* Category List */}
      <div className="mx-auto mb-10 flex max-w-5xl overflow-x-auto scrollbar-hide gap-3 rounded-full border border-slate-200 bg-white/90 py-3 px-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
        <button
          onClick={handleClearCategorySearch}
          className={getCategoryButtonClasses("all")}
          type="button"
        >
          All
        </button>

        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => setCategory(category.name)}
            className={getCategoryButtonClasses(category.name)}
            type="button"
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto px-2 sm:px-4">
        {filteredMenus.map(
          ({ id, name, description, price, image, category }) => (
            <MenuItemCard
              key={id}
              id={id}
              name={name}
              description={description}
              price={price}
              image={image}
              category={category}
            />
          ),
        )}
      </div>
    </section>
  );
}

export default MenusComponent;
