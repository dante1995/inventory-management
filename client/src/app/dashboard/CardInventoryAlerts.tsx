import { useGetInventoryAlertsQuery } from "@/state/api";
import { AlertTriangle, Package } from "lucide-react";

const CardInventoryAlerts = () => {
  const { data: alerts, isLoading } = useGetInventoryAlertsQuery();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Inventory Alerts</h2>
        <span className="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {alerts?.length || 0} items
        </span>
      </div>
      
      <div className="space-y-4 overflow-auto max-h-[400px]">
        {alerts?.map((alert) => (
          <div key={alert.itemId} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{alert.itemName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">
                  Stock: {alert.currentStock}
                </span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  Below reorder level ({alert.reorderLevel})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardInventoryAlerts;