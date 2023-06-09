import EmptyState from '@/app/components/empty-state'
import ClientOnly from '@/app/components/client-only'

import getCurrentUser from '../actions/get-current-user'
import getReservations from '../actions/get-reservations'
import TripsClient from './properties-client'
import getListings from '../actions/get-listings'
import PropertiesClient from './properties-client'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const listings = await getListings({
    userId: currentUser.id,
  })

  if (listings.length === 0)
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    )

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default PropertiesPage
