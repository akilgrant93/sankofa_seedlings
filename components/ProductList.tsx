"use client";

import Stripe from "stripe";
import { useState } from "react";
import ProductCard from "./ProductCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface Props {
  products: Stripe.Product[];
}

    const ProductList = ({ products }: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const selections = ['Price, Low to High', 'Price, High to Low'];
    const [selectedSort, setSelectedSort] = useState<string>(selections[0]);

    function customStringArraySort(arr:any[]) {
        const n = arr.length;
        let swapped;
  
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
        // Compare adjacent elements
                if (arr[i].default_price.unit_amount > arr[i + 1].default_price.unit_amount) {
                // Swap them if they are in the wrong order
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
        }
        } while (swapped); // Continue as long as swaps are being made
  
        return arr;
    }


    const priceSort = customStringArraySort(products);   

    const sortProducts = (criteria: string) => {
        switch (criteria) {
            case 'Price, Low to High':
                return priceSort;
            case 'Price, High to Low':
                return priceSort.toReversed();
            default:
                return products;
        }
    };

    const filteredProducts = sortProducts(selectedSort).filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  })
  .filter(product => product.active);

  return (
    <div>
      <div className="my-4">
        {/* sort by name + sort alphabetically + justify between fix for outer div*/}
        <div className="w-[77.5vw] flex justify-between items-center mx-auto">
        <div className='flex items-center'>
        <p className="pr-2 text-black font-semibold">Sort By</p>
        <Select onValueChange={(value) => setSelectedSort(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selections[0]}/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Price, Low to High">Price, Low to High</SelectItem>
                <SelectItem value="Price, High to Low">Price, High to Low</SelectItem>
            </SelectContent>
        </Select>
        </div>
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
      {filteredProducts.length  ? <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, key) => (
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