import { Button, Section } from "components";
import { PLTSMapKey } from "types";

export default function PLTSAnalyticValue() {
  return (
    <div className="prose !max-w-none bg-white px-4 rounded-sm ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="my-0">Detail</h3>
        <Button>Download CSV</Button>
      </div>
      <div className="flex gap-4 items-center">
        <div className="grid grid-cols-2 basis-3/4 gap-4">
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
        </div>
      </div>
    </div>
  );
}
