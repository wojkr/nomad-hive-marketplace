import { SafeUser } from "@/app/types";
import { useCallback, useMemo } from "react";
import useLoginModal from "../../app/hooks/useLoginModal";
import axios from "axios";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ currentUser, listingId }: IUseFavorite) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    if (!currentUser?.favoriteIds) return false;
    return currentUser?.favoriteIds.includes(listingId);
  }, [currentUser?.favoriteIds, listingId]);

  let toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (e) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, listingId, hasFavorited, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
