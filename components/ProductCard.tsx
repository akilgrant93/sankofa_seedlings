import Link from "next/link";
import Stripe from "stripe";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full w-[40vw] md:w-[25vw]">
      <Card className="group hover:shadow-2xl shadow transition duration-300 py-0 pb-8 h-full flex flex-col border-gray-300 gap-0">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="group-hover:opacity-90 object-cover transition-opacity duration-300 rounded-t-lg"
            />
          </div>
        )}
          <CardTitle className="group-hover:underline text-sm font-light text-gray-800 pt-4 px-4">
            {product.name}
          </CardTitle>
        <CardHeader className="px-4">
            {price && price.unit_amount && (
              <p className="text-lg font-semibold text-gray-900">
                ${(price.unit_amount / 100).toFixed(2)}
              </p>
            )}
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ProductCard;