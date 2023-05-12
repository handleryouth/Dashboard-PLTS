import { Button } from "components/button";
import { Container } from "components/container";
import { ReactNode, useCallback } from "react";
import {
  FallbackProps,
  ErrorBoundary as NativeErrorBoundary,
} from "react-error-boundary";

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export default function Boundary({ children }: ErrorBoundaryProps) {
  const fallbackElement = useCallback(
    ({ resetErrorBoundary }: FallbackProps) => {
      return (
        <Container className="prose flex items-center justify-center">
          <p>Something went wrong</p>
          <Button className="w-full" onClick={resetErrorBoundary}>
            Try Again
          </Button>
        </Container>
      );
    },
    []
  );

  return (
    <NativeErrorBoundary
      fallbackRender={fallbackElement}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </NativeErrorBoundary>
  );
}
