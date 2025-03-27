import React, { useEffect, useRef } from "react";
import { DollarSign, Clock } from "lucide-react";

interface ProgressBarProps {
  raised: number;
  goal: number;
  onDonate: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  raised,
  goal,
  onDonate,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty(
        "--progress-width",
        `${percentage}%`
      );
    }
  }, [percentage]);

  return (
    <div className="animate-on-load animate-delay-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="bg-ftpurple/10 p-2 rounded-full mr-3">
            <DollarSign className="h-6 w-6 text-ftpurple" />
          </div>
          <div>
            <div className="font-display font-bold text-2xl">
              ${raised.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              raised of ${goal.toLocaleString()} goal
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-xl">{percentage}%</div>
          <div className="text-sm text-gray-500">funded</div>
        </div>
      </div>

      <div className="progress-bar-container backdrop-blur">
        <div ref={progressRef} className="progress-bar-fill" />
      </div>

      <div className="mt-4 flex items-center justify-center p-3 bg-ftpurple/5 rounded-lg border border-ftpurple/20">
        <Clock className="h-5 w-5 text-ftpurple mr-2" />
        <span className="font-display font-bold text-ftpurple">
          Deadline: May 31, 2025
        </span>
      </div>

      <div className="mt-6 text-center">
        <button onClick={onDonate} className="ft-btn-primary">
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
