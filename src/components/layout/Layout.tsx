import { ReactNode } from "react";
import { Sidebar, SidebarContextProvider } from "../sidebar";
import { SideButton } from "../sideButton";
import { Header } from "../header";
import { useCookies } from "react-cookie";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [cookies] = useCookies(["accessToken"]);

  console.log("cookies", cookies);

  return (
    <SidebarContextProvider>
      <div className="bg-slate-100 min-h-screen h-full min-w-[490px]">
        {cookies.accessToken && <Header />}
        {cookies.accessToken && <SideButton />}
        <div className=" prose !min-w-[490px]  relative py-8 !max-w-screen-bigDisplay mx-auto">
          {cookies.accessToken && <Sidebar />}
          {children}
        </div>
      </div>
    </SidebarContextProvider>
  );
}
