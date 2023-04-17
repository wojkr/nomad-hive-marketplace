import prisma from "../libs/prismadb";

interface IGetListingById {
  listingId?: string;
}

export default async function getListingById(params: IGetListingById) {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true }, //populates user
    });

    if (!listing) return null;
    const safeListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        emailVerified: listing.user.emailVerified?.toISOString() || null,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
      },
    };
    return safeListing;
  } catch (e: any) {
    throw new Error(e);
  }
}
