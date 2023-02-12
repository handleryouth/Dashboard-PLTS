import { useMemo } from "react";
import { Card } from "primereact/card";
import { Button, Section } from "components";
import { imageHelper } from "utils";
import { useParams } from "react-router-dom";
import { PLTSMapKey } from "types";

export interface PLTSAnalyticValueParamsProps {
  pltsName: PLTSMapKey;
}

export default function PLTSAnalyticValue() {
  const params = useParams<
    keyof PLTSAnalyticValueParamsProps
  >() as PLTSAnalyticValueParamsProps;

  const headerComponent = useMemo(
    () => (
      <div className="flex items-center justify-between px-5">
        <h1 className="my-0">Detail</h1>
        <Button>Download CSV</Button>
      </div>
    ),
    []
  );

  return (
    <Card
      header={headerComponent}
      className="prose !max-w-none bg-white p-4 rounded-sm my-8"
    >
      <div className="flex gap-4 items-center">
        <img
          src={imageHelper(params.pltsName)}
          alt="plts location"
          className="basis-1/4 w-full rounded-md"
        />
        <div className="grid grid-cols-2 basis-3/4 gap-5">
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
          <Section title="Performance Ratio" value={0} direction="column" />
        </div>
      </div>
    </Card>
  );
}
