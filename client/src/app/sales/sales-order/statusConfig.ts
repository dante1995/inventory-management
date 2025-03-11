// statusConfig.ts
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { OrderStatus } from "@/state/api";

export const statusConfig: Record<
  OrderStatus,
  { color: string; label: string; icon: React.ElementType }
> = {
  DRAFT: { color: "default", label: "Draft", icon: ReceiptIcon },
  PENDING: { color: "warning", label: "Pending", icon: CalendarIcon },
  COMPLETED: { color: "success", label: "Completed", icon: CheckCircleIcon },
  CANCELLED: { color: "error", label: "Cancelled", icon: CancelIcon },
};
