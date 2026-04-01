import MenuItemCard from "@/components/MenuItemCard";
import prisma from "@/lib/db";

const Menus = async () => {
  const menus = await prisma.menu.findMany();

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12 -mt-8">
      <div className="max-w-4xl mx-auto text-center mb-12 border-2 border-amber-300 py-5 px-3 rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6">
          Discover Our Culinary Selection
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Step into a world of flavor with our thoughtfully curated menu,
          designed to bring together the best of tradition and innovation. Each
          dish is prepared with care, using only the freshest ingredients to
          ensure a dining experience that is both satisfying and memorable.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 -mt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {menus.map((menu) => (
          <MenuItemCard
            key={menu.id}
            id={menu.id}
            name={menu.name}
            description={menu.description}
            price={menu.price}
            image={menu.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Menus;
