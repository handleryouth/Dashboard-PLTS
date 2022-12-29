import { useCallback } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import { Button } from "../button";
import { useSidebar } from "../sidebar/context";

export default function Navbar() {
  const { toggleDashboard, showDashboard } = useSidebar();

  const handleButtonClicked = useCallback(() => {
    toggleDashboard();
  }, [toggleDashboard]);

  return (
    <nav className="py-3  bg-red-500 ">
      <div className="max-w-[69rem] flex justify-between items-center mx-auto">
        <div className="flex items-center">
          <h3 className="my-0 mr-4">Elektro ITS</h3>
          <img
            src="/elektro-its-logo.jpg"
            alt="logo"
            className="w-[47px] h-[47px] rounded-full mb-0"
          />
        </div>

        <Button
          onClick={handleButtonClicked}
          className="p-0 !w-15 !h-12 p-button-info "
        >
          <Hamburger toggled={showDashboard} size={23} />
        </Button>
      </div>
    </nav>
  );
}
