import RestaurantPicker from '../components/restaurant-picker'
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

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-400 to-purple-500 ${poppins.variable} ${roboto.variable} font-sans`}>
      <h1 className="text-4xl font-bold text-white mb-8 text-center font-poppins">
        What Should I Eat in the Waterloo Plaza?
      </h1>
      <RestaurantPicker />
    </main>
  )
}

