import { MenuItem } from "primereact/menuitem";
import { ReactNode } from "react";

export interface LinkPathProps {
  path: string;
  name: string;
}

export interface SidebarChildrenProps {
  headerTitle?: string;
  groupLinks?: MenuItem[];
  individualLinks?: LinkPathProps;
}

export interface SidebarContextProps {
  showDashboard: boolean;
  toggleDashboardActive: () => void;
  toggleDashboardInactive: () => void;
}

export interface SidebarContextProviderProps {
  children: ReactNode;
}
