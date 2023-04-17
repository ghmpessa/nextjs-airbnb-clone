import ClientOnly from '@/app/components/client-only'
import Container from '@/app/components/container'
import EmptyState from '@/app/components/empty-state'
import getListings, { IListingsParams } from '@/app/actions/get-listings'
import ListingCard from '@/app/components/listing-card'
import getCurrentUser from '@/app/actions/get-current-user'

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser()

  const listings = await getListings(searchParams)
  const isEmpty = listings.length === 0

  if (isEmpty)
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )

  return (
    <ClientOnly>
      <Container>
        <div
          className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md-grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >
          {listings.map(listing => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home
