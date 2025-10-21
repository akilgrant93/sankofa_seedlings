"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cartstore";
import { checkoutAction } from "./checkoutaction";
import Image from 'next/image';
import Link from 'next/link';
import "@fontsource/passion-one"

// this page will updated shipping policies, return and refund policies, a continue shopping link, 

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4 pt-[20vh]">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 style={{fontFamily: 'Passion One, sans-serif', fontWeight:500}} className="text-3xl text-[#285943] font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8 py-4 shadow-lg text-black border-none bg-neutral-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                <div className="flex justify-between items-center">
                  <div  className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                  <Link href={`/products/${item.id}`}>
                    <Image layout="fill"
                         objectFit="cover" 
                         src={item.imageUrl || "/placeholder-image.png"} 
                         alt={item.name || "Product Image"} />
                  </Link>
                  </div>
                  <span className="font-medium">{item.name}</span>
                  <span className="font-semibold">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2 pb-5">
                  <Button
                    className="bg-[#285943] border-none text-white hover:bg-[#77AF9C]"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    className="bg-[#285943] border-none text-white hover:bg-[#77AF9C]"
                    variant="outline"
                    size="sm"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t py-5 text-lg font-thin">
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className="max-w-md bg-red-500 hover:bg-red-400 transition duration-300 hover:cursor-pointer rounded-lg mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant="default" className="w-full">
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}