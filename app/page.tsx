import {Carousel} from "../components/Carousel";
import {Button}  from "../components/ui/button";
import { stripe } from "../lib/stripe";
import Image from "next/image";
import Link from "next/link";
import "@fontsource/passion-one";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 20,
  })

  // console.log(products.data )
  return (
     <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12 mt-8">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-8 px-8 sm:px-16">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-[#285943] tracking-tight md:text-4xl" style={{fontFamily: 'Passion One, sans-serif', fontWeight:500}}>Welcome to Sankofa Seedlings</h2>
            <p className="text-neutral-600">Our collection permaculture seeds and seedlings are perfect for setting your roots deep</p>
            <Button 
              asChild 
              variant={'default'}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 mt-4 bg-[#77AF9C] text-white">
              <Link className='inline-flex items-center justify-center rounded-full px-6 py-3' href="/products">
                Shop Now
              </Link>
            </Button>
          </div>
          <Image className="w-[50vw]" alt='Hero Image' width={450} height={450} src={products.data[0].images[0]}/>
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data}/>
      </section>
     </div>
  );
}
