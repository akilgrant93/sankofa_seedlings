import ProductList from "../../components/ProductList";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit:20
  });

  return (
    <div className="pb-8">
      <ProductList products={products.data} />
    </div>
  );
}