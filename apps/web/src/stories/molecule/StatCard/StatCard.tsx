import React from "react";
import { Card, Text, Icon } from "@components/export/index";
import type { IconName } from "@components/export/index";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconName;
  trend?: string;
  trendVariant?: "success" | "danger" | "neutral";
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendVariant = "success",
  suffix 
}) => {
  const trendColorMap = {
    success: "text-brand-primary bg-green-100",
    danger: "text-red-600 bg-red-100",
    neutral: "text-gray-600 bg-gray-100"
  };

  return (
    <Card className="p-6 flex items-center gap-5 bg-white border-transparent ring-1 ring-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-5px_rgba(6,81,237,0.1)] transition-all">
      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
        <Icon name={icon} size={26} />
      </div>
      <div>
        <Text fontSize="xs" fontColor="var(--color-text-muted)" className="font-bold uppercase tracking-wider mb-1">
          {title}
        </Text>
        <div className="flex items-baseline gap-2">
          <Text className="text-3xl font-black text-gray-900 tracking-tighter leading-none">{value}</Text>
          {suffix && <Text fontSize="lg" fontColor="var(--color-text-muted)" className="font-semibold mb-1">{suffix}</Text>}
          {trend && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${trendColorMap[trendVariant]}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
