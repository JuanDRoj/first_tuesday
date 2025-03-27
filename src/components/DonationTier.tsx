import React from "react";
import { Check } from "lucide-react";

interface TierBenefit {
  text: string;
}

interface DonationTierProps {
  title: string;
  amount: number;
  benefits: TierBenefit[];
  highlight?: boolean;
  limited?: boolean;
  limitText?: string;
  onDonate: () => void;
}

const DonationTier: React.FC<DonationTierProps> = ({
  title,
  amount,
  benefits,
  highlight = false,
  limited = false,
  limitText,
  onDonate,
}) => {
  return (
    <div
      className={`donation-tier-card ${
        highlight ? "ring-2 ring-ftpurple/30 shadow-lg" : ""
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-ftpurple text-white text-xs font-bold py-1 px-3 rounded-full">
          Popular
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <div className="mt-1 flex items-baseline">
          <span className="font-display text-3xl font-bold">${amount}</span>
          <span className="text-gray-500 ml-1">one-time</span>
        </div>
      </div>

      <div className="space-y-3 flex-grow">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start">
            <div className="mt-0.5 flex-shrink-0">
              <Check className="h-5 w-5 text-ftpurple" />
            </div>
            <span className="ml-2 text-gray-700">{benefit.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={onDonate}
          className={`w-full py-2.5 px-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
            highlight
              ? "bg-ftpurple text-white shadow-md hover:bg-ftpurple-dark"
              : "bg-white text-ftpurple border-2 border-ftpurple/80 hover:bg-ftpurple/5"
          }`}
        >
          Donate ${amount}
        </button>

        {limited && limitText && (
          <div className="mt-2 text-center text-sm text-gray-500">
            {limitText}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationTier;
