import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full w-[25vw]">
      <Card className="group hover:shadow-2xl shadow transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
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
        <CardHeader className="px-4 pt-4">
            {price && price.unit_amount && (
              <p className="text-lg font-semibold text-gray-900">
                ${(price.unit_amount / 100).toFixed(2)}
              </p>
            )}
          <CardTitle className="text-base font-light text-gray-800">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-end">
          {/* {product.description && (
            <p className="text-gray-600 text-xs mb-2">{product.description}</p>
          )} */}
          <Button className="mt-4 bg-[#285943] text-white cursor-pointer">View Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;