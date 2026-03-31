import MenuDetail from "@/components/MenuDetail";
import prisma from "@/lib/db";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const menuId = parseInt(resolvedParams.id, 10);

  if (isNaN(menuId)) {
    return <div className="p-10 text-center">Invalid ID</div>;
  }

  const menu = await prisma.menu.findUnique({
    where: { id: menuId },
  });

  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Menu item not found.</p>
      </div>
    );
  }

  return (
    <>
     <MenuDetail menu={menu}/>
    </>
  );
}