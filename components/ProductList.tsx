"use client";

import Stripe from "stripe";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { shuffleArray } from "./Carousel";

interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = shuffleArray(products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  }).filter(product => product.active));

  return (
    <div>
      <div className="my-4 w-[100vw]">
        {/* sort by name + sort alphabetically + justify between fix for outer div*/}
        <div className="w-[77.5vw] flex justify-end items-center mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md rounded border shadow-none hover:shadow-sm transition-shadow duration-300 ease-in-out placeholder:text-[#77AF9C] text-[#77AF9C] placeholder:text-sm border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center md:min-h-[35vh]">
      {filteredProduct.length  ? <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProduct.map((product, key) => (
          <li key={key}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul> : <p className="text-center text-gray-500 mt-8">No products found.</p>}
      </div>
    </div>
  );
};

export default ProductList;