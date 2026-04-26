import React from "react";
import { Card, Text, Icon, Button } from "@components/export/index";

export interface PickupCardProps {
  name: string;
  category: string;
  distance: string;
  timeRemaining?: string;
  expiryLabel?: string;
  colorTheme?: string;
  onAccept?: () => void;
}

const PickupCard: React.FC<PickupCardProps> = ({
  name,
  category,
  distance,
  timeRemaining,
  expiryLabel,
  colorTheme = "bg-green-100/50",
  onAccept
}) => {
  const normalizedTime = (timeRemaining ?? expiryLabel ?? "").trim().toLowerCase();
  const isExpired = normalizedTime === "expired";
  const hasTime = Boolean(timeRemaining);
  const badgeLabel = isExpired
    ? "Expired"
    : expiryLabel
      ? `Expires in ${expiryLabel}`
      : undefined;

  return (
    <Card className="flex p-4 md:p-5 gap-5 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all items-center justify-between cursor-pointer group rounded-2xl">
      <div className="flex items-center gap-4 md:gap-5 min-w-0">
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 shadow-sm overflow-hidden ${colorTheme}`}>
          <Icon name="image" size={32} className="text-gray-400 opacity-50" />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0">
          <Text className="font-bold text-lg text-gray-900 group-hover:text-brand-primary transition-colors truncate">{name}</Text>
          <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 flex-wrap">
            <span className="flex items-center gap-1"><Icon name="mapPin" size={12} /> {distance}</span>
            {hasTime && (
              <span className={`flex items-center gap-1 ${isExpired ? "text-red-600" : "text-gray-500"}`}>
                <Icon name="clock" size={12} /> {isExpired ? "Expired" : `Ends in ${timeRemaining}`}
              </span>
            )}
          </div>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{category}</span>
            {badgeLabel && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${isExpired ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                {badgeLabel}
              </span>
            )}
          </div>
        </div>
      </div>
      <Button 
        buttonType="secondary" 
        onClick={(e) => { e.stopPropagation(); onAccept?.(); }}
        className="bg-green-50 text-brand-primary border border-green-100 hover:bg-brand-primary hover:text-white transition-all shadow-none whitespace-nowrap"
      >
        Accept Pickup
      </Button>
    </Card>
  );
};

export default PickupCard;
