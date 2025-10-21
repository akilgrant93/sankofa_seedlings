"use server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cartstore";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson);
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "USD",
      product_data: { 
        name: item.name, 
        images: [item.imageUrl] 
    },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const calculateShipping = (total:number) => {

  }

  console.log('ITEMS ITEMS ITEMS',items)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card","klarna","afterpay_clearpay",],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    shipping_address_collection: {
        allowed_countries: ["US"]
    },
    shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1200, // $12.00 increasing at intervals of $3 
              currency: 'usd',
            },
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
  });

  redirect(session.url!);
};