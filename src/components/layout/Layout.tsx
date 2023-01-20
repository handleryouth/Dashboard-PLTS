import { ReactNode } from "react";
import { Sidebar, SidebarContextProvider } from "../sidebar";
import { SideButton } from "../sideButton";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SidebarContextProvider>
        <SideButton />
        <div className=" flex prose !min-w-[320px] !max-w-none relative max-h-screen">
          <Sidebar />
          <div className="basis-full">{children}</div>
        </div>
      </SidebarContextProvider>
    </>
  );
}
