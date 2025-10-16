import {Carousel} from "../components/Carousel";
import {Button}  from "../components/ui/button";
import { stripe } from "../lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 20,
  })

    function shuffleArray(array: any[]) {
    let currentIndex = array.length;
    let randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  
    return array;
  }
  
  const shuffledProducts = shuffleArray(products.data);

  // console.log('floatvalue',getRandomFloatValue)
  return (
     <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12 shadow-lg">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-8 px-8 sm:px-16">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold text-black tracking-tight md:text-4xl">Welcome to Sankofa Seedlings</h2>
            <p className="text-neutral-600">Plant your roots deep.</p>
            <Button 
              asChild 
              variant={'default'}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white">
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
