"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

/** Redux, global state, and side effects */
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";

/** Lucide icons (lightweight, scalable icons) */
import {
  Layout,              // For Dashboard
  Archive,             // For Inventory
  Clipboard,           // For Products
  Truck,               // For Purchase Orders
  ShoppingCart,        // For Sales Orders
  Users as UsersIcon,  // For Customers
  Handshake,           // For Vendors
  Store as StoreIcon,  // For Stores
  User,                // For (internal) Users/Employees
  BarChart2,           // For Analytics
  SlidersHorizontal,   // For Settings
  CircleDollarSign,    // For Expenses
  Menu,                // For collapsing/expanding sidebar
  LucideIcon,
} from "lucide-react";

/**
 * Purpose:
 * - SidebarLinkProps defines the shape of data needed to render a navigation link.
 *   Each link has a destination href, an icon, a text label, and a flag indicating
 *   whether the sidebar is collapsed or expanded.
 */
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

/**
 * SidebarLink:
 * - Reusable component for each navigation item in the sidebar.
 * - It highlights the active route and handles the collapsed state by showing or hiding text.
 */
const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        {!isCollapsed && (
          <span className="font-medium text-gray-700">{label}</span>
        )}
      </div>
    </Link>
  );
};

/**
 * Sidebar Component:
 * - This holds the entire left navigation area.
 * - Handles the collapsed/expanded state via Redux (global state).
 * - Renders top branding (logo + name), then all feature links, then a footer.
 */
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  // Toggle the sidebar collapsed state.
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  // Dynamic width classes to animate the sidebar expansion and collapse.
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* 
        TOP SECTION: 
        - Logo, App Name (EDSTOCK), 
        - Mobile toggler (hamburger icon) for smaller screens
      */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Image
          src="/path/to/home-icon.svg" // Replace with the actual path to the Home icon
          alt="edstock-logo"
          width={27}
          height={27}
          className="rounded w-8"
        />
        
        {!isSidebarCollapsed && (
          <h1 className="font-extrabold text-2xl">EDSTOCK</h1>
        )}

        {/* Hamburger button only shown on mobile (md:hidden) */}
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS SECTION:
         Each link corresponds to a core OMS feature or module.
         They are ordered in a way that typically aligns with
         an OMS user's flow:
         
         1. Dashboard    - The landing overview
         2. Inventory    - High-level stock management
         3. Products     - Item management (catalog)
         4. Purchase Orders - Inbound supply side
         5. Sales Orders    - Outbound / customer orders
         6. Customers       - CRM or basic customer data
         7. Vendors         - Supplier management
         8. Stores          - Multiple store/warehouse mgmt
         9. Users           - Internal staff & roles
         10. Analytics      - Reporting & insights
         11. Settings       - Configurations
         12. Expenses       - Additional overhead mgmt
      */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/purchase-orders"
          icon={Truck}
          label="Purchase Orders"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/sales-orders"
          icon={ShoppingCart}
          label="Sales Orders"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/customers"
          icon={UsersIcon}
          label="Customers"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/vendors"
          icon={Handshake}
          label="Vendors"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/stores"
          icon={StoreIcon}
          label="Stores"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/analytics"
          icon={BarChart2}
          label="Analytics"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER SECTION:
         - Shows up only when expanded,
         - Typically used for version info, legal, branding, etc.
       */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2025 Harmoniq
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
