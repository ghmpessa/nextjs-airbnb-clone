'use client'

import { useMemo } from 'react'
import { Reservation } from '@prisma/client'

import Container from '@/app/components/container'
import { categories } from '@/app/components/navbar/Categories'
import ListingHead from '@/app/components/listing-head'
import { SafeListing, SafeUser } from '@/app/types'
import ListingInfo from '@/app/components/listing-info'

interface ListingClientProps {
  listing: SafeListing & { user: SafeUser }
  reservation?: Reservation
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category)
  }, [listing.category])
  return (
    <Container>
      <div className="nax-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
