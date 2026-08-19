"use client";
import {attractions} from "../data/attractions";
import AttractionCard from "../components/AttractionCard";
import { useState } from "react";


export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedPark, setSelectedPark] = useState("All");

  const filteredAttractions = attractions.filter((attraction) =>
    (attraction.name.toLowerCase().includes(searchText.toLowerCase())) 
      &&
    (selectedPark === "All" || attraction.park === selectedPark)
    );

  return (
    <div className=" justify-between font-sans dark:bg-white border border-black p-4 ">
      <div className="items-center justify-center mb-4 grid grid-cols-2 gap-4">
        <div className="object-top-left  border border-black p-4">
          <h1 className="text-left max-w-lg text-3xl font-semibold  text-black dark:text-black ">
            Disney Experience Companion
          </h1>
          <p className="max-w-lg text-sm dark:text-black">
            Plan your perfect Disneyland Resort adventure.
          </p>
          
        </div>
        <input className= "text-black border border-black p-1 rounded-lg object-right "
          type="text"
          placeholder="Search attractions..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <select
          className="text-black border border-black p-1 rounded-lg"
          value={selectedPark}
          onChange={(event) => setSelectedPark(event.target.value)}
        >
          <option value="All">All Parks</option>
          <option value="Disneyland">Disneyland</option>
          <option value="Disney's California Adventure">Disney's California Adventure</option>
        </select>
       
      </div>
      
      <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {filteredAttractions.length > 0 ? (
          filteredAttractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))
        ) : (
          <p className="text-black text-lg font-semibold italic">
            No attractions found.
          </p>
        )}
      </div>
      
      
    </div>

    
  );
}
