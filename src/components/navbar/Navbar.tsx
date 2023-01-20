import { useCallback } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import { Button } from "../button";
import { useSidebar } from "../sidebar/context";

export default function Navbar() {
  const { toggleDashboardActive, showDashboard } = useSidebar();

  const handleButtonClicked = useCallback(() => {
    toggleDashboardActive();
  }, [toggleDashboardActive]);

  return (
    <nav className="prose !max-w-none py-3  bg-[#7286D3] ">
      <div className="max-w-[69rem] flex justify-between items-center mx-auto">
        <div className="flex items-center">
          <h3 className="my-0 mr-4">PLTS Dashboard</h3>
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
