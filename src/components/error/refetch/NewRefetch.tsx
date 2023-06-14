import { Button } from "../../button";

export interface NewRefetchProps {
  restart?: () => void;
}

export default function NewRefetch({ restart }: NewRefetchProps) {
  return (
    <div className="text-center">
      <h3 className="text-red-500">Something went wrong</h3>
      {restart && <Button onClick={restart}>Try Again</Button>}
    </div>
  );
}
