import { ReactNode } from "react";
import InterceptorModal from "./InterceptorModal";

export interface ResponseModalInterceptorProviderProps {
  children: ReactNode;
}

export function ResponseModalInterceptorProvider({
  children,
}: ResponseModalInterceptorProviderProps) {
  return (
    <>
      <InterceptorModal />
      {children}
    </>
  );
}
