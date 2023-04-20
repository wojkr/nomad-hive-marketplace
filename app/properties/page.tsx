import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getListing from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const propertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="No Authorized" subtitle="Please login" />
      </ClientOnly>
    );
  }
  const properties = await getListing({ userId: currentUser.id });

  if (properties.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties"
          subtitle="You do not have any properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient currentUser={currentUser} properties={properties} />
    </ClientOnly>
  );
};

export default propertiesPage;
