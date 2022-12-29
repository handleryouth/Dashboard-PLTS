import { createContext, useState, useContext } from "react";
import { SidebarContextProps, SidebarContextProviderProps } from "types";

const DashboardContext = createContext<SidebarContextProps | undefined>(
  undefined
);

function SidebarContextProvider({ children }: SidebarContextProviderProps) {
  const [showDashboard, setShowDashboard] = useState(false);

  const value: SidebarContextProps = {
    showDashboard: showDashboard,
    toggleDashboard: () => setShowDashboard((prevState) => !prevState),
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { SidebarContextProvider, useSidebar };
