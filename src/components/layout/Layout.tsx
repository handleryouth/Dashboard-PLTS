import { ReactNode } from "react";
import { Sidebar, SidebarContextProvider } from "../sidebar";
import { SideButton } from "../sideButton";
import { Header } from "../header";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarContextProvider>
      <div className="bg-slate-100 min-h-screen">
        <SideButton />
        <Header />
        <div className=" prose !min-w-[320px] !max-w-none relative">
          <Sidebar />
          {children}
        </div>
      </div>
    </SidebarContextProvider>
  );
}
