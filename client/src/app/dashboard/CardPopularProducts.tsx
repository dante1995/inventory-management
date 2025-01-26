import { useGetItemsQuery, useGetSalesOrderItemsQuery } from "@/state/api";
import Image from "next/image";
import { TrendingUp } from "lucide-react";
import React from "react";

const CardPopularProducts = () => {
  const { data: items } = useGetItemsQuery();
  const { data: salesOrderItems } = useGetSalesOrderItemsQuery();

  // Calculate popular products based on sales order items
  const popularProducts = React.useMemo(() => {
    if (!items || !salesOrderItems) return [];

    const productSales = new Map();
    
    // Calculate total quantity sold for each product
    salesOrderItems.forEach(orderItem => {
      const currentQty = productSales.get(orderItem.itemId) || 0;
      productSales.set(orderItem.itemId, currentQty + orderItem.quantity);
    });

    // Map to products with sales data
    return items
      .map(item => ({
        ...item,
        totalSold: productSales.get(item.id) || 0
      }))
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5); // Top 5 products
  }, [items, salesOrderItems]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Popular Products</h2>
      
      <div className="space-y-4">
        {popularProducts.map((product) => (
          <div key={product.id} className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src={`/product-placeholder.png`} // Replace with actual product image
                alt={product.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-blue-600">
                  ${product.costPrice}
                </span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {product.totalSold} sold
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPopularProducts;