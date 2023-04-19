import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: "desc" },
    });

    const safeReservations = reservations.map((r) => ({
      ...r,
      endDate: r.endDate.toISOString(),
      startDate: r.startDate.toISOString(),
      createdAt: r.createdAt.toISOString(),
      listing: {
        ...r.listing,
        createdAt: r.listing.createdAt.toISOString(),
      },
    }));
    return safeReservations;
  } catch (e: any) {
    throw new Error(e);
  }
}
