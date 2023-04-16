import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export const POST = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("invalid ID");
  }
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const favorites = currentUser?.favoriteIds || [];
  favorites.push(listingId);

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: { favoriteIds: favorites },
  });
  return NextResponse.json(updatedUser);
};

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("invalid ID");
  }
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  let favorites = currentUser?.favoriteIds || [];
  favorites = favorites.filter((l) => l !== listingId);

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: { favoriteIds: favorites },
  });
  return NextResponse.json(updatedUser);
};
