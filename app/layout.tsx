import './globals.css'
import { Poppins, Roboto } from 'next/font/google'

const poppins = Poppins({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata = {
  title: 'What Should I Eat in the Waterloo Plaza?',
  description: 'A fun way to pick a restaurant in the Waterloo Plaza',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  )
}

