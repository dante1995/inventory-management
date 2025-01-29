"use client";

import React, { useState } from "react";
import {
  Home,
  CreditCard,
  FileText,
  Handshake,
  Package,
  Box,
  Recycle,
  Store as StoreIcon,
  Wrench,
  ShoppingCart,
  Clipboard,
  Users as UsersIcon,
  Percent,
  Book,
  BarChart2,
  Bell,
  FileBarChart2,
  Lightbulb,
  Menu,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";

/* -------------------------------------------------------------------------
 * A reusable link component for sidebar items that do NOT have children.
 * -------------------------------------------------------------------------
 */
interface SidebarLinkProps {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={`
          cursor-pointer flex items-center gap-3 
          transition-colors hover:bg-blue-100 hover:text-blue-500
          ${isCollapsed ? "justify-center py-4" : "px-8 py-4"}
          ${isActive ? "bg-blue-200 text-white" : ""}
        `}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        {!isCollapsed && (
          <span className="font-medium text-gray-700">{label}</span>
        )}
      </div>
    </Link>
  );
};

/* -------------------------------------------------------------------------
 * A component that supports collapsible sub-links.
 * -------------------------------------------------------------------------
 */
interface CollapsibleSidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  isCollapsed: boolean;
  subLinks: {
    href: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
  parentHref?: string; // Optional if you want the parent label itself to be clickable.
}

const CollapsibleSidebarItem = ({
  icon: Icon,
  label,
  isCollapsed,
  subLinks,
  parentHref,
}: CollapsibleSidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Determine if any subLink is active to highlight the parent
  const isAnySubLinkActive = subLinks.some((sub) => pathname === sub.href);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      {/* Parent row */}
      <div
        className={`
          cursor-pointer flex items-center gap-3 
          transition-colors hover:bg-blue-100 hover:text-blue-500
          ${isCollapsed ? "justify-center py-4" : "px-8 py-4"}
          ${isAnySubLinkActive ? "bg-blue-200 text-white" : ""}
        `}
        onClick={handleToggle}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        {!isCollapsed && (
          <>
            <span className="font-medium text-gray-700 flex-1">{label}</span>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-700" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-700" />
            )}
          </>
        )}
      </div>

      {/* Sub-links (only render if sidebar expanded) */}
      {!isCollapsed && isOpen && (
        <div className="flex flex-col ml-8">
          {subLinks.map(({ href, label: subLabel, icon: SubIcon }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href}>
                <div
                  className={`cursor-pointer flex items-center gap-3 pl-4 py-2 
                    hover:bg-blue-50 transition-colors
                    ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"}
                  `}
                >
                  <SubIcon className="w-5 h-5" />
                  <span className="text-sm">{subLabel}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
 * Main Sidebar component
 * -------------------------------------------------------------------------
 */
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  // Dispatch the action to toggle collapse
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `
    fixed top-0 left-0 h-full shadow-md z-40 bg-white
    transition-all duration-300 overflow-hidden
    ${isSidebarCollapsed ? "w-[0px] md:w-16" : "w-[220px] md:w-64"}
  `;

  return (
    <div className={sidebarClassNames}>
      {/* 
        1) Use a column flex container that stretches to full height.
        2) The main link section gets flex-grow so it uses up remaining space.
        3) The footer is placed at mt-auto, pinning it at the bottom.
      */}
      <div className="flex flex-col h-full">
        {/* TOP LOGO & TOGGLE BUTTON */}
        <div
          className={`flex gap-3 items-center pt-8 ${
            isSidebarCollapsed ? "justify-center px-3" : "px-8 justify-between"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={`/assets/naturals.png`}
              alt="app-logo"
              width={27}
              height={27}
              className="rounded w-8"
              priority
            />
            {/* Only show brand name when not collapsed */}
            {!isSidebarCollapsed && (
              <h1 className="font-extrabold text-2xl">Naturals</h1>
            )}
          </div>

          {/* Toggle button */}
          <button
            className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
            onClick={toggleSidebar}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex-grow mt-8 overflow-y-auto">
          {/* 1) Homepage */}
          <SidebarLink
            href="/"
            icon={Home}
            label="Homepage"
            isCollapsed={isSidebarCollapsed}
          />

          {/* 2) Purchase (collapsible) */}
          <CollapsibleSidebarItem
            icon={CreditCard}
            label="Purchase"
            isCollapsed={isSidebarCollapsed}
            subLinks={[
              {
                href: "/purchase/purchase-order",
                label: "Purchase Order",
                icon: FileText,
              },
              {
                href: "/purchase/vendor",
                label: "Vendor",
                icon: Handshake,
              },
              {
                href: "/purchase/item",
                label: "Item",
                icon: Package,
              },
            ]}
          />

          {/* 3) Inventory (collapsible) */}
          <CollapsibleSidebarItem
            icon={Box}
            label="Inventory"
            isCollapsed={isSidebarCollapsed}
            subLinks={[
              {
                href: "/inventory/salvage-order",
                label: "Salvage Order",
                icon: Recycle,
              },
              {
                href: "/inventory/store",
                label: "Store",
                icon: StoreIcon,
              },
              {
                href: "/inventory/service",
                label: "Service",
                icon: Wrench,
              },
            ]}
          />

          {/* 4) Sales (collapsible) */}
          <CollapsibleSidebarItem
            icon={ShoppingCart}
            label="Sales"
            isCollapsed={isSidebarCollapsed}
            subLinks={[
              {
                href: "/sales/sales-order",
                label: "Sales Order",
                icon: Clipboard,
              },
              {
                href: "/sales/customer",
                label: "Customer",
                icon: UsersIcon,
              },
              {
                href: "/sales/promotions",
                label: "Promotions",
                icon: Percent,
              },
            ]}
          />

          {/* 5) Resources */}
          <SidebarLink
            href="/resources"
            icon={Book}
            label="Resources"
            isCollapsed={isSidebarCollapsed}
          />

          {/* 6) Analytics (collapsible) */}
          <CollapsibleSidebarItem
            icon={BarChart2}
            label="Analytics"
            isCollapsed={isSidebarCollapsed}
            subLinks={[
              {
                href: "/analytics/alerts",
                label: "Alerts",
                icon: Bell,
              },
              {
                href: "/analytics/reports",
                label: "Reports",
                icon: FileBarChart2,
              },
            ]}
          />

          {/* 7) Recommendations */}
          <SidebarLink
            href="/recommendations"
            icon={Lightbulb}
            label="Recommendations"
            isCollapsed={isSidebarCollapsed}
          />
        </div>

        {/* FOOTER */}
        <div className={`mt-auto ${isSidebarCollapsed ? "hidden" : "block"} py-4`}>
          <p className="text-center text-xs text-gray-500">&copy; 2025 Harmoniq</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
