import { ReactNode } from "react";

export interface LinkPathProps {
  path: string;
  name: string;
}

export interface SidebarChildrenProps {
  headerTitle: string;
  linkPath: LinkPathProps[];
}

export interface SidebarContextProps {
  showDashboard: boolean;
  toggleDashboard: () => void;
}

export interface SidebarContextProviderProps {
  children: ReactNode;
}
