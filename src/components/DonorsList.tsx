import React, { useEffect, useState } from "react";
import { Heart, UserRound } from "lucide-react";
import { DonationForm } from "@/api/useDonations";
import { timeDifference } from "@/lib/utils";

interface Donor {
  id?: string;
  name: string;
  phone: string;
  email: string;
  amount: number;
  type: "private" | "public";
  is_approved?: boolean;
  image?: string;
  isAnonymous?: boolean;
  created_at?: Date;
}

function transformDonors(donations: DonationForm[]) {
  const result = donations.map((donation) => {
    let isAnonymous = false;
    const image =
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
    if (donation.type === "private") {
      isAnonymous = true;
    }
    return {
      ...donation,
      image,
      isAnonymous,
    };
  });

  return result;
}

const DonorsList: React.FC<{ donationsData: DonationForm[] }> = ({
  donationsData,
}) => {
  const [donors, setDonors] = useState<Donor[]>([]);
  useEffect(() => {
    const transformed = transformDonors(donationsData);
    setDonors(transformed);
  }, [donationsData]);

  return (
    <div className="animate-on-load animate-delay-300">
      <div className="flex items-center mb-4">
        <Heart className="h-5 w-5 text-ftblue mr-2" />
        <h3 className="font-display font-bold text-lg">Recent Supporters</h3>
      </div>

      <div className="space-y-4">
        {donors.map((donor) => (
          <div
            key={donor.id}
            className="p-4 rounded-xl neo-morphism transition-all duration-300 hover:shadow-neodark"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                {donor.isAnonymous ? (
                  <div className="w-full h-full bg-ftgray-dark flex items-center justify-center">
                    <UserRound className="h-6 w-6 text-gray-500" />
                  </div>
                ) : (
                  <img
                    src={donor.image}
                    alt={donor.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="ml-3 flex-grow">
                <div className="flex justify-between">
                  <span className="font-semibold">{donor.name}</span>
                  <span className="font-display font-bold text-ftblue">
                    ${donor.amount}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {timeDifference(donor.created_at)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex -space-x-2 mt-6 justify-center">
        {donors.slice(0, 4).map((donor, index) => (
          <div
            key={`bubble-${donor.id}`}
            className={`w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md transition-transform duration-300 hover:scale-110 hover:z-10 animate-float`}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            {donor.isAnonymous ? (
              <div className="w-full h-full bg-ftgray-dark flex items-center justify-center">
                <UserRound className="h-5 w-5 text-gray-500" />
              </div>
            ) : (
              <img
                src={donor.image}
                alt={donor.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
        <div
          className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-ftblue text-white text-xs font-bold shadow-md animate-float"
          style={{ animationDelay: "2s" }}
        >
          +{donors.length - donors.slice(0, 4).length}
        </div>
      </div>
    </div>
  );
};

export default DonorsList;
