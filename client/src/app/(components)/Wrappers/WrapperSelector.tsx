"use client";

import { usePathname } from 'next/navigation';
import HomePageWrapper from "./homepageWrapper";
import SalesOrderWrapper from "./salesOrderWrapper";

export default function WrapperSelector({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.endsWith('/sales-order')) {
    return <SalesOrderWrapper>{children}</SalesOrderWrapper>;
  }
  return <HomePageWrapper>{children}</HomePageWrapper>;
} 