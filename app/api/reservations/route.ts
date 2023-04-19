import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId, startDate, endDate, totalPrice } = await request.json();
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const reservationAndListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          startDate,
          endDate,
          totalPrice,
          userId: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(reservationAndListing);
}
