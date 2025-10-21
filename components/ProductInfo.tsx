"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import "@fontsource/passion-one"
import { useCartStore } from "@/store/cartstore";

interface Props {
  product: Stripe.Product;
}

export const ProductInfo = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition duration-300 hover:opacity-90"
          />
        </div>
      )}
      <div className="md:w-1/2">
        <h1 style={{fontFamily: 'Passion One, sans-serif', fontWeight:500}} className={"text-5xl text-[#285943] font-bold mb-4"}>{product.name}</h1>
        {product.description && (
          <p className="mb-2 text-gray-600">{product.description}</p>
        )}
        <p className="mb-2 text-gray-600">—</p>
        {price && price.unit_amount && (
          <p className="text-lg text-black mb-2">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}
        <div className="text-xs text-neutral-600 mb-2">Taxes and <span className="hover:cursor-pointer underline hover:decoration-2">shipping</span> calculated at checkout.</div>
        <p className="text-xs text-neutral-600 mb-2 italic">Quantity</p>
        <div className="flex items-center space-x-4">
          <Button className="bg-[#285943] border-none text-white hover:bg-[#77AF9C]" variant="outline" onClick={() => removeItem(product.id)}>
            –
          </Button>
          <span className="text-lg text-black">{quantity}</span>
          <Button className="bg-[#285943] border-none text-white hover:bg-[#77AF9C]" variant='outline' onClick={onAddItem}>+</Button>
        </div>
      </div>
    </div>
  );
};