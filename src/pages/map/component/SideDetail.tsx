import { useState, useEffect } from "react";
import { Section } from "components";
import { PLTSMapKey, SideDetailProps } from "types";
import { SideDetailImageLookup } from "const";

export default function SideDetail({ dataKey }: SideDetailProps) {
  const [dateCacheKey, setDateCacheKey] = useState<PLTSMapKey>();

  useEffect(() => {
    if (dataKey) {
      setDateCacheKey(dataKey);
    } else {
      setTimeout(() => {
        setDateCacheKey(undefined);
      }, 500);
    }
  }, [dataKey]);

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
        <Section title="Apparent Power" titleClassName="text-sm" value="0" />
        <Section title="Daily Yield" value="0" titleClassName="text-sm" />
        <Section title="Grid Current" value="0" titleClassName="text-sm" />
        <Section title="Grid Frequency" value="0" titleClassName="text-sm" />
        <Section title="Residual Current" value="0" titleClassName="text-sm" />
        <Section title="Reactive Power" value="0" titleClassName="text-sm" />
      </div>
    </div>
  );
}
