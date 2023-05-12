import { ReactNode } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary as NativeErrorBoundary } from "react-error-boundary";
import { Button } from "../../button";

export interface ErrorRefetchProps {
  children?: ReactNode;
}

export default function ErrorRefetch({ children }: ErrorRefetchProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <NativeErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="text-center">
          <h3 className="text-red-500">Something went wrong</h3>
          <Button onClick={resetErrorBoundary}>Try Again</Button>
        </div>
      )}
    >
      {children}
    </NativeErrorBoundary>
  );
}
