"use client";

import React, { useEffect } from "react";
import Sidebar from "@/app/(components)/Sidebar";
import Navbar from "@/app/(components)/Navbar";
import StoreProvider, { useAppSelector } from "./redux";

const AllPageLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex w-full min-h-screen bg-gray-50 dark:bg-[#0B1120]">
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 dark:bg-[#0B1120] text-gray-900 dark:text-gray-100 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const AllPageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <AllPageLayout>{children}</AllPageLayout>
    </StoreProvider>
  );
};

export default AllPageWrapper;
