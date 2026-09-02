
import { useSession } from "next-auth/react";
import { useState } from "react";
import { addExperienceToItinerary } from "@/util/itinerary";
import { Attraction } from "@/types/attraction";
import disneylandImage from "../public/images/attractions/disneylandimage.png";

interface AttractionCardProps {
    attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
    const { data: session } = useSession();
    const [isAdded, setIsAdded] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleAddToItinerary = () => {
        addExperienceToItinerary("attractions", attraction.id, attraction.name, session?.user?.email ?? null);
        setIsAdded(true);
        setShowToast(true);
        window.setTimeout(() => {
            setIsAdded(false);
            setShowToast(false);
        }, 1500);
    };

    return (
        <>
            {showToast && (
                <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center">
                    <div className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                        Added to Itinerary
                    </div>
                </div>
            )}

            <div className="relative overflow-hidden rounded-lg border border-gray-300 bg-white p-4 shadow-lg text-black dark:bg-gray-800 dark:text-white">
            <div className="flex items-start justify-between gap-4">
                <div className="mb-2">
                    <h2 className="text-2xl font-bold italic">{attraction.name}</h2>
                    <p className="text-lg">Wait Time: {attraction.waitTime} minutes</p>
                    <p>Status: <span className={`text-lg ${attraction.status === 'Open' ? 'text-green-600' : 'text-red-600'} `}>{attraction.status}</span></p>
                    <p className="mt-4 text-sm">Park: {attraction.park}</p>
                    <p className="text-sm">Land: {attraction.land}</p>
                    <p className="text-sm">Height Requirement:{" "}
                        {attraction.heightRequirement !== undefined
                        ? `${attraction.heightRequirement} inches`
                        : "None"}</p>
                </div>

                <img
                    src={attraction.image || disneylandImage.src}
                    alt={attraction.name}
                    className="mt-6 h-32 w-32 flex-shrink-0 rounded-full object-cover"
                />
            </div>

                <button
                    type="button"
                    title="Add to itinerary"
                    onClick={handleAddToItinerary}
                    className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-800"
                >
                    {isAdded ? "✓" : "+"}
                </button>
            </div>
        </>
    );
};

export default AttractionCard;

