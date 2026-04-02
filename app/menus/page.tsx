// app/menus/page.tsx (or wherever Menus component is)
import MenusComponent from "@/components/MenusComponent";
import prisma from "@/lib/db";

const Menus = async () => {
  const menus = await prisma.menu.findMany({
    include: {
      category: true,
    },
  });

  return (
    <>
    <MenusComponent menus={menus}/>
    </>
  );
};

export default Menus;
