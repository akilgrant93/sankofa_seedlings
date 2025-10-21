"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@fontsource/passion-one"

interface Props {
  products: Stripe.Product[];
}
//this will form the basis of a related products carousel in time

export function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      //deployment tes
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);
  const activeProducts = products.filter(product => product.active)
  products = shuffleArray(activeProducts)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];

  const price = currentProduct.default_price as Stripe.Price;
  return (
    <Link href={`/products/${currentProduct.id}`}>
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="relative h-80 w-full">
          <Image
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center bg-black/15 justify-center">
        <CardTitle style={{fontFamily: 'Passion One, sans-serif', fontWeight:500}} className="text-4xl font-bold text-white mb-2">
          {currentProduct.name}
        </CardTitle>
        {price && price.unit_amount && (
          <p className="text-xl font-black text-white">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
    </Link>
  );
};