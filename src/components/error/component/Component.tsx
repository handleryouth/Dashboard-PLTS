import { ReactNode } from "react";
import { Button } from "../../button";

export interface ErrorComponentProps {
  refetch: () => void;
  containerClassName?: string;
  buttonClassName?: string;
  children?: string | ReactNode;
}

export default function ErrorComponent({
  refetch,
  buttonClassName = "",
  children,
  containerClassName = "",
}: ErrorComponentProps) {
  return (
    <div className={`flex flex-col items-center ${containerClassName}`}>
      {children !== undefined ? (
        typeof children === "string" ? (
          <p className="prose">{children}</p>
        ) : (
          children
        )
      ) : (
        <p className="prose text-center">
          Something went wrong. Please try again.
        </p>
      )}
      <Button className={buttonClassName} onClick={refetch}>
        Try Again
      </Button>
    </div>
  );
}
