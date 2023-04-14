import { Nunito } from 'next/font/google'

import Navbar from '@/app/components/navbar'
import ClientOnly from '@/app/components/client-only'
import ToasterProvider from '@/app/providers/toaster-provider'
import LoginModal from '@/app/components/login-modal'
import RegisterModal from '@/app/components/register-modal'
import RentModal from '@/app/components/rent-modal'

import './globals.css'
import getCurrentUser from './actions/get-current-user'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
