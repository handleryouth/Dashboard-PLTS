import { useState, useEffect, useCallback } from "react";
import { Section } from "components";
import { GeneratorDataProps, PLTSMapKey, SideDetailProps } from "types";
import { SideDetailImageLookup } from "const";
import { requestHelper } from "utils";

export default function SideDetail({ dataKey }: SideDetailProps) {
  const [dateCacheKey, setDateCacheKey] = useState<PLTSMapKey>();

  const [mapDetailData, setMapDetailData] = useState<GeneratorDataProps>();

  const getData = useCallback(async () => {
    const response = await requestHelper("plts_get_map_overview");

    if (response && response.status === 200) {
      setMapDetailData(response.data?.data);
    }
  }, []);

  useEffect(() => {
    if (dataKey) {
      getData();
      setDateCacheKey(dataKey);
    } else {
      setTimeout(() => {
        setMapDetailData(undefined);
        setDateCacheKey(undefined);
      }, 500);
    }
  }, [dataKey, getData]);

  return (
    <div
      className={`prose !max-w-none transition-widthPaddingMargin  duration-300  bg-gradient-to-br from-[#F8EDE3] to-[#F1F6F5] rounded-md  ${
        dataKey ? "w-[31rem] px-8 mx-4" : "w-0 p-0 mx-0 delay-[300ms]"
      }`}
    >
      <div className={`flex justify-center`}>
        <img
          className={`w-3/4 rounded-md  transition-width h-full ${
            dataKey ? " delay-500" : "opacity-0"
          }`}
          src={SideDetailImageLookup[dateCacheKey!]}
          alt="place"
          key={dataKey}
          loading="lazy"
        />
      </div>

      <div
        className={`transition-opacity mb-8 flex flex-col gap-y-2 ${
          dataKey ? "opacity-100 delay-500" : "opacity-0 delay-100"
        }`}
      >
        <Section
          title="Apparent Power"
          titleClassName="text-sm"
          value={mapDetailData?.apparentPower}
        />
        <Section
          title="Daily Yield"
          titleClassName="text-sm"
          value={mapDetailData?.dailyYield}
        />
        <Section
          title="Grid Current"
          titleClassName="text-sm"
          value={mapDetailData?.gridCurrent}
        />
        <Section
          title="Grid Frequency"
          titleClassName="text-sm"
          value={mapDetailData?.gridFrequency}
        />
        <Section
          title="Residual Current"
          titleClassName="text-sm"
          value={mapDetailData?.residualCurrent}
        />
        <Section
          title="Reactive Power"
          titleClassName="text-sm"
          value={mapDetailData?.reactivePower}
        />
      </div>
    </div>
  );
}
