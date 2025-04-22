import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ServiceRequestProvider } from '@/contexts/ServiceRequestContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sai Vinayaka Enterprises - Professional Equipment Erection Services',
  description: 'Specialized in heavy equipment erection and industrial machinery setup services for industries, hospitals, data centers, and manufacturing facilities since 2022.',
  keywords: 'equipment erection, industrial equipment, heavy machinery erection, data center equipment, medical equipment installation, factory setup',
  authors: [{ name: 'Sai Vinayaka Enterprises' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServiceRequestProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ServiceRequestProvider>
      </body>
    </html>
  )
}