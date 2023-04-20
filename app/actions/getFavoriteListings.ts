import getCurrentUser from "./getCurrentUser";
import prisma from "../libs/prismadb";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds, //spreading in array and add default value?
        },
      },
      orderBy: { title: "desc" },
    });

    const safeFavorites = favorites.map((f) => ({
      ...f,
      createdAt: f.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (e: any) {
    throw new Error(e);
  }
}
