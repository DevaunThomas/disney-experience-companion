
import {attractions} from "../data/attractions";
import AttractionCard from "../components/AttractionCard";

export default function Home() {
  return (
    <div className=" items-center font-sans dark:bg-white border border-black-300 p-4">
      
        
      <div className="object-top-left  border border-black-300 p-4">
        <h1 className="text-left max-w-lg text-3xl font-semibold  text-black dark:text-black ">
          Disney Experience Companion
        </h1>
        <p className="max-w-lg text-sm dark:text-black">
          Plan your perfect Disneyland Resort adventure.
        </p>

      </div>

      <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {attractions.map((attraction) => (
           <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
      
      
    </div>

    
  );
}
