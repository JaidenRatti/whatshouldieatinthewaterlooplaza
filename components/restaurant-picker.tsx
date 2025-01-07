'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { AnimatedGoose } from './animated-goose';
import { database } from '@/lib/firebase';
import { ref, get, set, increment } from 'firebase/database';

const restaurants = [
    {
        name: "Hakka Nation",
        mapsLink: "https://maps.app.goo.gl/xEAzp1vBmXA9p16u6"
    },
    {
        name: "Indian Sweet Master",
        mapsLink: "https://maps.app.goo.gl/YA6bgdYWpkAGoZp48"
    },
    {
        name: "Izna Poke Plus",
        mapsLink: "https://maps.app.goo.gl/BAZ5TkByjPwwQ4x17"
    },
    {
        name: "Mengami",
        mapsLink: "https://maps.app.goo.gl/yYqZKjMhTaQeGa3Q7"
    },
    {
        name: "Kabob Hut",
        mapsLink: "https://maps.app.goo.gl/5kCwwS7CR1ZUt1LaA"
    },
    {
        name: "Harvey's",
        mapsLink: "https://maps.app.goo.gl/MPY1R4HeKJcD5WFh9"
    },
    {
        name: "Sowon Korea Dining",
        mapsLink: "https://maps.app.goo.gl/AtLqGM97T6YzCAm89"
    },
    {
        name: "Pho Anh Vu",
        mapsLink: "https://maps.app.goo.gl/pQVXC4366XHXyBkt6"
    },
    {
        name: "Rani Chettinad",
        mapsLink: "https://maps.app.goo.gl/mMrwRBrMP95UWM7UA"
    },
    {
        name: "Seoul Soul",
        mapsLink: "https://maps.app.goo.gl/FX4Skojn33wU1NJv7"
    },
    {
        name: "iPotato",
        mapsLink: "https://maps.app.goo.gl/WPPkwtcaXAWFh6acA"
    },
    {
        name: "Lazeez",
        mapsLink: "https://maps.app.goo.gl/d2uB1pFDgJLPcvcZ8"
    },
    {
        name: "Williams Fresh Cafe",
        mapsLink: "https://maps.app.goo.gl/2SUTGu4QXvcdCCdg7"
    },
    {
        name: "Super Chicken",
        mapsLink: "https://maps.app.goo.gl/kz9NhYhg3gYMu2Sq7"
    },
    {
        name: "Baba Grill",
        mapsLink: "https://maps.app.goo.gl/14yx2XRSev5eq1NC9"
    },
    {
        name: "Fresh Burrito",
        mapsLink: "https://maps.app.goo.gl/vGhtfhqZhd9uRCqY7"
    },
    {
        name: "Slap Burgers",
        mapsLink: "https://maps.app.goo.gl/axqNiKcKvN8zyAG59"
    },
    {
        name: "Yang's Braised Chicken Rice",
        mapsLink: "https://maps.app.goo.gl/WjsNj5JFwYpZydYP9"
    },
    {
        name: "Fantastic Wok",
        mapsLink: "https://maps.app.goo.gl/Msyf9LvJoa3jWsxS9"
    },
    {
        name: "Molly Bloom's Irish Pub",
        mapsLink: "https://maps.app.goo.gl/Uoc3gYNB3xqyjrxj7"
    },
    {
        name: "Kismet Restaurant",
        mapsLink: "https://maps.app.goo.gl/eDey4U42fH6F3U4PA"
    },
    {
        name: "Better Chef",
        mapsLink: "https://maps.app.goo.gl/iq94KHeTjtVHhygi7"
    },
    {
        name: "Roosters Fried Chicken",
        mapsLink: "https://maps.app.goo.gl/WNKk1L3dD2brGR6E7"
    },
    {
        name: "Shawerma Plus",
        mapsLink: "https://maps.app.goo.gl/tUtCWtvYtT64Aozf6"
    },
    {
        name: "Cluck Clucks",
        mapsLink: "https://maps.app.goo.gl/6HDu5AJHhJtpAXbt6"
    },
    {
        name: "Aunty's Kitchen",
        mapsLink: "https://maps.app.goo.gl/FRuwdTxi7qHZjx3a7"
    },
    {
        name: "Home Garden",
        mapsLink: "https://maps.app.goo.gl/zcyeAQWkrvS8CgWB9"
    },
    {
        name: "Yummy Chongqing",
        mapsLink: "https://maps.app.goo.gl/SeXa8hddZdX1bSVY8"
    },
    {
        name: "Nuri Village",
        mapsLink: "https://maps.app.goo.gl/4cw7Rb9E9kxLEWCo7"
    },
    {
        name: "Subway",
        mapsLink: "https://maps.app.goo.gl/wt8qTqfT489UxmK16"
    },
    {
        name: "Shinwa Asian Cuisine",
        mapsLink: "https://maps.app.goo.gl/mctAGXQ7pvYWUgKq9"
    },
    {
        name: "Campus Pizza",
        mapsLink: "https://maps.app.goo.gl/Bf8RjCQbFRiyDWrP7"
    },
    {
        name: "Chung Chun",
        mapsLink: "https://maps.app.goo.gl/yg5adxKz7k8h2PR58"
    },
    {
        name: "XIANG HOTPOT",
        mapsLink: "https://maps.app.goo.gl/iE1dNy7zDjVsjCUF6"
    },
    {
        name: "Mizu Restaurant",
        mapsLink: "https://maps.app.goo.gl/uGQZUWjmtNSya6QJ7"
    },
    {
        name: "Gol's Lanzhou Noodle",
        mapsLink: "https://maps.app.goo.gl/QmaieyYjX4VnoYHm7"
    },
    {
        name: "Kabob Shack",
        mapsLink: "https://maps.app.goo.gl/ZSv3F4s8S6agvDDR9"
    },
    {
        name: "Ye House",
        mapsLink: "https://maps.app.goo.gl/MuCayctFZae3QzAy8"
    },
    {
        name: "Asakusa",
        mapsLink: "https://maps.app.goo.gl/RH2jegTBifqm1u7C9"
    },
    {
        name: "iPho",
        mapsLink: "https://maps.app.goo.gl/QCNGzwxquEc9yLTZ9"
    },
    {
        name: "Mel's Diner",
        mapsLink: "https://maps.app.goo.gl/1DwMChBXaTuPBmZN8"
    },
    {
        name: "Onnuri",
        mapsLink: "https://maps.app.goo.gl/GA3zUhEPz6WwMfSv6"
    },
    {
        name: "Momo",
        mapsLink: "https://maps.app.goo.gl/hAZbebUEaTHbx8y77"
    },
    {
        name: "The Bingsu Cafe",
        mapsLink: "https://maps.app.goo.gl/Y92pet1cFTo1tECW6"
    },
    {
        name: "Brown Donkatsu",
        mapsLink: "https://maps.app.goo.gl/rSAmWpXKdcrTA3J49"
    },
    {
        name: "Pizza Nova",
        mapsLink: "https://maps.app.goo.gl/jsFbsTvNXepcUUBN9"
    },
    {
        name: "Burger King",
        mapsLink: "https://maps.app.goo.gl/51t1GfY2NLVrsNDz6"
    },
    {
        name: "bbq Chicken Waterloo Central",
        mapsLink: "https://maps.app.goo.gl/H2ttRJc1Rh2ycUZ69"
    },
  { 
    name: "Waterloo Star", 
    mapsLink: "https://maps.app.goo.gl/ukue8Co32jynJNyP9",
  }
]

export default function RestaurantPicker() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof restaurants[0] | null>(null)
  const [isRunning, setIsRunning] = useState(false)

    const [globalCounter, setGlobalCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const counterRef = ref(database, 'globalCounter');
      get(counterRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setGlobalCounter(snapshot.val());
          } else {
            set(counterRef, 0);
          }
        })
        .catch((err) => console.error(err));
    }, []);
  
    const incrementCounter = () => {
      setIsLoading(true);
      const counterRef = ref(database, 'globalCounter');
      set(counterRef, increment(1))
        .then(() => {
          return get(counterRef);
        })
        .then((snapshot) => {
          if (snapshot.exists()) {
            setGlobalCounter(snapshot.val());
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    };
  

  const pickRestaurant = () => {
    setIsRunning(true);
    setSelectedRestaurant(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      setSelectedRestaurant(restaurants[randomIndex]);
      setIsRunning(false);

      incrementCounter();
    }, 1000); // 1 sec delay
  };

  return (
    <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">Let Code Decide for You</CardTitle>
        <CardDescription className="text-center text-gray-600">Hope it`s not Lazeez!</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-4">
          <AnimatedGoose isRunning={isRunning} />
        </div>
        
        {selectedRestaurant ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{selectedRestaurant.name}</h2>
            <a
              href={selectedRestaurant.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center justify-center"
            >
              <MapPin size={16} className="mr-1" />
              View on Google Maps
            </a>
          </motion.div>
        ) : (
          <p className="text-lg text-center mb-4 text-gray-700">Click the button to let the goose pick a restaurant!</p>
        )}

    <Button
          onClick={pickRestaurant}
          disabled={isRunning || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isRunning || isLoading ? "Running..." : "Run the Goose!"}
        </Button>
        <div className="text-center mt-6">
          <p className="text-lg">The goose has ran:</p>
          <h2 className="text-3xl">{globalCounter}</h2>
          <p className="text-lg">times</p>
        </div>
      </CardContent>
  
    </Card>
  );
}

