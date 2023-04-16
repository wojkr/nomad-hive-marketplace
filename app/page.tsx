import ClientOnly from "@/app/components/CilentOnly";
import EmptyState from "@/app/components/EmptyState";
import Container from "@/app/components/Container";
import getListings from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings = await getListings({});

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
          pt-24
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
          {listings.map((l: any) => (
            <ListingCard
              data={l}
              // reservation={}
              // onAction={}
              disabled
              // actionLabel={}
              // actionId={}
              currentUser={currentUser}
              key={l.title}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
