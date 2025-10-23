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
    const [selectionType, setSelectionType] = useState<string>("name");
    const [selectionOrder, setSelectionOrder] = useState<'asc' | 'desc'>('asc');

    type StripeProduct = Stripe.Product // Use the Stripe type for products

    function sortProducts<T extends StripeProduct>(
      products: T[],
      sortBy: keyof T,
      order: 'asc' | 'desc' = 'asc'
    ): T[] {
      return [...products].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return order === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          // Handle other types or provide a default comparison
          return 0;
        }
      });
    }

  const handleSelections = (value: string) => {
    console.log(value)
    if(value === "Alphabetical, A-Z" || value === "Alphabetical, Z-A"){
      setSelectionOrder(value === "Alphabetical, A-Z" ? 'asc' : 'desc')
      setSelectionType('name')
    }
    else if(value === 'Price, Low to High' || value === 'Price, High to Low'){
      setSelectionOrder(value === "Price, Low to High" ? 'asc' : 'desc')
      setSelectionType('default_price')
    }
  }


  const filteredbyName = sortProducts(products, selectionType === 'name' ? 'name' : 'default_price', selectionOrder).filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  })
  .filter(product => product.active);


  // console.log(filteredbyPrice)
  return (
    <div>
      <div className="my-4">
        {/* sort by name + sort alphabetically + justify between fix for outer div*/}
        <div className="w-[77.5vw] flex-col md:flex-row justify-between items-center mx-auto">
        <div className='flex items-center'>
        <p className="pr-2 text-black font-semibold">Sort By</p>
        <Select onValueChange={(value) => handleSelections(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={'Alphabetical, A-Z'}/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Alphabetical, A-Z">Alphabetical, A-Z</SelectItem>
                <SelectItem value="Alphabetical, Z-A">Alphabetical, Z-A</SelectItem>
                {/* <SelectItem value="Price, Low to High">Price, Low to High</SelectItem>
                <SelectItem value="Price, High to Low">Price, High to Low</SelectItem> */}
            </SelectContent>
        </Select>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md rounded border shadow-none hover:shadow-sm transition-shadow duration-300 ease-in-out placeholder:text-[#77AF9C] text-[#77AF9C] placeholder:text-sm border-gray-300 px-4 py-2 mt-4 md:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center md:min-h-[35vh]">
      {filteredbyName.length  ? <ul className="grid gap-4 grid-cols-2 md:grid-cols-3">
        {filteredbyName.map((product, key) => (
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