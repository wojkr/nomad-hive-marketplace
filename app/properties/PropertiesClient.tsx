"use client";

import React, { useCallback, useState } from "react";
import { SafeListing, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PropertiesClientProps {
  currentUser?: SafeUser | null;
  properties: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  properties,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Successfully deleted your property");
          router.refresh();
        })
        .catch((e) => {
          toast.error(e?.response?.data?.error);
        })
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="
                mt-10
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
                "
      >
        {properties.map((property: any) => (
          <ListingCard
            key={property.id}
            data={property}
            actionId={property.id}
            onAction={onDelete}
            disabled={deletingId === property.id}
            actionLabel="Delete your property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
