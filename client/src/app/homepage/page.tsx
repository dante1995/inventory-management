"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Box,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import CardInventoryAlerts from "./CardInventoryAlerts";
import CardOrderSummary from "./CardOrderSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardRevenueSummary from "./CardRevenueSummary";
import StatCard from "./StatCard";
import { useGetSalesOrdersQuery, useGetCustomersQuery, useGetItemsQuery } from "@/state/api";

const Homepage = () => {
  const { data: salesOrders } = useGetSalesOrdersQuery();
  const { data: customers } = useGetCustomersQuery();
  const { data: items } = useGetItemsQuery();

  // Calculate key metrics
  const totalRevenue = salesOrders?.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0) || 0;
  const avgOrderValue = totalRevenue / (salesOrders?.length || 1);
  const customerCount = customers?.length || 0;
  const inventoryValue = items?.reduce((sum, item) => sum + parseFloat(item.costPrice), 0) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
      {/* Quick Stats Row */}
      <div className="col-span-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
          trend={12.5}
          subtitle="vs. last month"
        />
        <StatCard
          title="Active Customers"
          value={customerCount.toString()}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          trend={8.2}
          subtitle="vs. last month"
        />
        <StatCard
          title="Avg Order Value"
          value={`$${avgOrderValue.toFixed(2)}`}
          icon={<ShoppingCart className="w-6 h-6 text-purple-600" />}
          trend={-2.4}
          subtitle="vs. last month"
        />
        <StatCard
          title="Inventory Value"
          value={`$${inventoryValue.toLocaleString()}`}
          icon={<Box className="w-6 h-6 text-orange-600" />}
          trend={5.1}
          subtitle="vs. last month"
        />
      </div>

      {/* Main Content */}
      <div className="xl:col-span-2 row-span-2">
        <CardRevenueSummary />
      </div>
      <div className="row-span-2">
        <CardInventoryAlerts />
      </div>
      <div className="xl:col-span-2">
        <CardOrderSummary />
      </div>
      <div className="xl:col-span-1">
        <CardPopularProducts />
      </div>
    </div>
  );
};

export default Homepage;
