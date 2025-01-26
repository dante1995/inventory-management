import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  subtitle: string;
};

const StatCard = ({ title, value, icon, trend, subtitle }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-gray-50 p-3">{icon}</div>
        <div className={`flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatCard;