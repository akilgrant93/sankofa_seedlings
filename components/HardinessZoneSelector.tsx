import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from "motion/react"

interface HardinessZone {
    zone: string;
    temperature_range: string;
    coordinates: { lat: string; lon: string;  };
}


const HardinessZoneSelector = () => {
    const [zipCodeStr, setZipCodeStr] = useState<string>(''); 
    const [zipToFetch, setZipToFetch] = useState<string>(''); 
    const [isValid, setIsValid] = useState<boolean>(true);
    const [zone, setZone] = useState<string>('');
    const [shouldClose, setShouldClose] = useState<boolean>(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipCodeStr(event.target.value);
    }
    async function fetchHardinessZone(zipcode:string): Promise<HardinessZone[]> {
        try {
          const response = await fetch(`https://phzmapi.org/${zipcode}.json`);
          if (!response.ok) {
            setIsValid(false);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const zone: HardinessZone[] = await response.json();
          setIsValid(true);
          setZipToFetch(zipcode);
          setShouldClose(false)
          for (const key in zone) {
            if (Object.prototype.hasOwnProperty.call(zone, key)) { // Important for preventing iteration over inherited properties
              const value = zone[key as keyof typeof zone]; // Type assertion for safer access
              if(key === 'zone'){
                setZone(String(value))
            }
            }
          }
          return zone;
        } catch (error) {
          console.error("Error fetching zones how u gonna tell me its not changed:", error);
          throw error;
        }
      }  
      const handleSubmit = async () => {
            if(zipCodeStr.length != 5){
                setIsValid(false);
                return;
            } else {
                await fetchHardinessZone(zipCodeStr);
                return
            }
      }
  return (
    <Popover defaultOpen={false} open={shouldClose}>
      <PopoverTrigger asChild onClick={() => [setShouldClose(shouldClose ? false : true), setZipCodeStr(''), setIsValid(true)]}>
        <Button variant="link" className='text-black hover:cursor-pointer'>{zone ? <motion.div initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.0625 }} >My Zone: {zone} - {zipToFetch}</motion.div> : 'Find Your Hardiness Zone'}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-46 bg-[#77AF9C] border-0  text-white shadow">
        <div className="grid gap-4">
          <div>
            <p className="text-muted-foreground text-sm font-semibold">
              Enter your zip code to find your USDA Hardiness Zone.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="w-full flex flex-col items-center">
              <Input
                id="width"
                placeholder='Your Zip Code'
                onChange={handleChange}
                className="col-span-2 shadow-lg h-8 text-[#285943] bg-white outline-none border-none"
              />
              <div className='flex gap-2 pt-4 w-full'>
                {/* close */}
              <button 
                className='w-1/2 px-2 flex justify-center items-center shadow-lg rounded-md p-1 bg-[#900000] hover:bg-[#FF8585] hover:stroke-[#285943] stroke-white transition duration-300'
                onClick={() => setShouldClose(false)} 
                type='submit'>
                    <p className='text-sm'>Close</p>
              </button>
                {/* submit */}
              <button 
                className='w-1/2 px-2 flex justify-center items-center shadow-lg rounded-md p-1 bg-[#285943] hover:bg-[#397F5F] hover:stroke-[#285943] stroke-white transition duration-300'
                onClick={handleSubmit} 
                type='submit'>
                    <p className='text-sm'>Submit</p>
              </button>
              </div>
            </div>
              {!isValid && 
              <motion.div
                initial={{ opacity: 0, y: -30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.0625 }} 
              >
                  <p className='text-xs text-[#900000] text-center font-semibold'>Please enter a valid zip code.</p>
              </motion.div>}
          </div>
        </div>
      </PopoverContent>
    </Popover>
    // <button><p className='self-center text-sm font-semibold text-black hover:underline'>Find Your Hardiness Zone</p></button>
  )
}

export default HardinessZoneSelector