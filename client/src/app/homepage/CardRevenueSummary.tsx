import { useGetSalesSummaryQuery } from "@/state/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CardRevenueSummary = () => {
  const { data: salesSummary } = useGetSalesSummaryQuery({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
    endDate: new Date().toISOString()
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Revenue Overview</h2>
          <p className="text-sm text-gray-500">Last 30 days performance</p>
        </div>
        <select className="text-sm border rounded-lg px-3 py-2">
          <option value="30">Last 30 Days</option>
          <option value="60">Last 60 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>

      <div className="h-[400px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesSummary} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateRange" />
            <YAxis 
              width={60}
              tickFormatter={(value) => `$${value}`}
              domain={['auto', 'auto']}
              padding={{ top: 20, bottom: 20 }}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Bar dataKey="totalSales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Additional content */}
    </div>
  );
};

export default CardRevenueSummary;