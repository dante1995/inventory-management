"use client";

import React, { useEffect } from "react";
import Sidebar from "@/app/(components)/Sidebar";
import Navbar from "@/app/(components)/Navbar";
import Header from "@/app/(components)/Header";
import StoreProvider, { useAppSelector } from "@/app/redux";

const SalesOrderLayout = ({ children }: { children: React.ReactNode }) => {
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
        <Navbar header={<Header name="Sales" />} />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
};

const SalesOrderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <SalesOrderLayout>{children}</SalesOrderLayout>
    </StoreProvider>
  );
};

export default SalesOrderWrapper;