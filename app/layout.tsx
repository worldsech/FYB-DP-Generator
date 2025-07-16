import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'fyb-dp-generator',
  description: 'Created with nextjs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
