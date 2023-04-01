import { ReactNode } from "react";
import { Sidebar, SidebarContextProvider } from "../sidebar";
import { SideButton } from "../sideButton";
import { Header } from "../header";
import { useCookies } from "react-cookie";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [cookies] = useCookies(["isLogin"]);

  console.log("cookies", cookies);

  return (
    <SidebarContextProvider>
      <div className="bg-slate-100 min-h-screen h-full min-w-[490px]">
        {cookies.isLogin && <Header />}
        {cookies.isLogin && <SideButton />}
        <div className=" prose !min-w-[490px]  relative py-8 !max-w-screen-bigDisplay mx-auto">
          {cookies.isLogin && <Sidebar />}
          {children}
        </div>
      </div>
    </SidebarContextProvider>
  );
}
