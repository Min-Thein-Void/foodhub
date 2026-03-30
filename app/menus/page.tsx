import MenuItemCard from '@/components/MenuItemCard';
import prisma from '@/lib/db';

const Menus = async () => {
  const menus = await prisma.menu.findMany();

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
        Our Menu
      </h2>

      {/* Responsive Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {menus.map((menu) => (
          <MenuItemCard
            key={menu.id}
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
