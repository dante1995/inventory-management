import { useGetSalesOrdersQuery, useGetPurchaseOrdersQuery } from "@/state/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import React from "react";

const CardOrderSummary = () => {
  const { data: salesOrders } = useGetSalesOrdersQuery();
  const { data: purchaseOrders } = useGetPurchaseOrdersQuery();

  // Process orders data for the chart
  const processedData = React.useMemo(() => {
    const dateMap = new Map();
    
    // Process sales orders
    salesOrders?.forEach(order => {
      const date = format(new Date(order.orderDate), 'MMM dd');
      if (!dateMap.has(date)) {
        dateMap.set(date, { date, sales: 0, purchases: 0 });
      }
      dateMap.get(date).sales++;
    });

    // Process purchase orders
    purchaseOrders?.forEach(order => {
      const date = format(new Date(order.orderDate), 'MMM dd');
      if (!dateMap.has(date)) {
        dateMap.set(date, { date, sales: 0, purchases: 0 });
      }
      dateMap.get(date).purchases++;
    });

    return Array.from(dateMap.values());
  }, [salesOrders, purchaseOrders]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <p className="text-sm text-gray-500">Sales vs Purchase Orders</p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#3b82f6" 
              name="Sales Orders"
              strokeWidth={2}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="purchases" 
              stroke="#10b981" 
              name="Purchase Orders"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Sales Orders</p>
          <p className="text-2xl font-semibold mt-1">{salesOrders?.length || 0}</p>
          <p className="text-xs text-blue-500 mt-1">
            {salesOrders?.filter(o => o.status === 'PENDING').length || 0} pending
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">Purchase Orders</p>
          <p className="text-2xl font-semibold mt-1">{purchaseOrders?.length || 0}</p>
          <p className="text-xs text-green-500 mt-1">
            {purchaseOrders?.filter(o => o.status === 'PENDING').length || 0} pending
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardOrderSummary;