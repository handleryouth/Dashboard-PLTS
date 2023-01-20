import { ReactNode } from "react";

export interface LocationProps {
  children: ReactNode;
}

export default function Location({ children }: LocationProps) {
  return <div>{children}</div>;
}
