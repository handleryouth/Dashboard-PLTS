import { ReactNode } from "react";
import { Sidebar } from "../sidebar";
import { Navbar } from "../navbar";
import { SidebarContextProvider } from "components/sidebar/context";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SidebarContextProvider>
        <Sidebar />
        <div className="prose !min-w-[320px] !max-w-none relative">
          {/* <Navbar /> */}
          {children}
        </div>
      </SidebarContextProvider>
    </>
  );
}
