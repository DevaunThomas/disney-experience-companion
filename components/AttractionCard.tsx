
import { Attraction } from "@/types/attraction";
import disneylandImage from "../public/images/attractions/disneylandimage.png";


// Interface Prop for representing a Disney attraction 
interface AttractionCardProps {
    attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
    return (
        <div className="pointer-events-auto text-pretty text-black border border-gray-300 p-4 shadow-lg rounded-lg
                 flex items-start justify-between bg-white dark:bg-gray-800 dark:text-white">
            <div className=" mb-2">
                <h2 className="text-2xl font-bold italic">{attraction.name}</h2>
                <p className= "text-lg ">Wait Time: {attraction.waitTime} minutes</p>
                <p>Status: <span className= {`text-lg ${attraction.status === 'Open' ? 'text-green-600' : 'text-red-600'} `}>{attraction.status}</span></p>
                <p className="text-sm mt-4">Park: {attraction.park}</p>
                <p className="text-sm ">Land: {attraction.land}</p>
                <p className= "text-sm">Height Requirement:{" "}     
                    {attraction.heightRequirement !== undefined     
                    ? `${attraction.heightRequirement} inches`
                    : "None"}</p>
            </div>

            <img
                src={attraction.image || disneylandImage.src}
                alt={attraction.name}
                className="flex-shrink-0  mt-6 w-32 h-32 rounded-full object-cover"
            />
        </div>
    );
};

export default AttractionCard;

