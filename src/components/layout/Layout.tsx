import { useCookies } from "react-cookie";
import { LayoutProps } from "types";
import { Sidebar, SidebarContextProvider } from "../sidebar";
import { SideButton } from "../sideButton";
import { Header } from "../header";
import { MemoizedSeo } from "../seo";

export default function Layout({ children }: LayoutProps) {
  const [cookies] = useCookies(["isLogin"]);

  console.log("cookies", cookies);

  return (
    <>
      <MemoizedSeo />
      <SidebarContextProvider>
        <div className="bg-slate-100  min-w-[490px]">
          {cookies.isLogin && <Header />}
          {cookies.isLogin && <SideButton />}
          <div className=" prose !min-w-[490px] py-4  !max-w-screen-bigDisplay mx-auto min-h-screen relative">
            {cookies.isLogin && <Sidebar />}
            {children}
          </div>
        </div>
      </SidebarContextProvider>
    </>
  );
}
