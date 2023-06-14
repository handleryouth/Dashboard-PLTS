import { Section } from "components";
import { useNavigate } from "react-router-dom";
import { SideDetailProps } from "types";

export default function SideDetail({ data }: SideDetailProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`hidden mediumToBigDisplay:block prose !max-w-none transition-widthPaddingMargin  duration-300  bg-gradient-to-br from-[#F8EDE3] to-[#F1F6F5] rounded-md max-h-screen overflow-scroll  ${
        data ? "w-[31rem] px-8 mx-4" : "w-0 p-0 mx-0 delay-[300ms]"
      }`}
    >
      <div
        className={`transition-opacity mb-8 flex flex-col gap-y-2 ${
          data ? "opacity-100 delay-500" : "opacity-0 delay-100"
        }`}
      >
        <h3>{data?.name}</h3>
        <p>{data?.address}</p>

        <h3>All Plants Profile</h3>
        {data?.plantProfile.map((item) => (
          <div
            onClick={() => navigate(`/inverter/${item._id}`)}
            key={item._id}
            className="flex gap-y-4 flex-col bg-white rounded-md p-4 cursor-pointer"
          >
            <Section
              title="Inverter Name"
              titleClassName="text-sm"
              value={item.pltsName}
              direction="column"
            />

            <Section
              title="SMA Device Name"
              titleClassName="text-sm"
              value={item.smaDeviceName}
              direction="column"
            />

            <Section
              title="Ip Address"
              titleClassName="text-sm"
              value={item.ipAddress}
              direction="column"
            />

            <Section
              title="Port"
              titleClassName="text-sm"
              value={item.port}
              direction="column"
            />
          </div>
        ))}

        {/* <Section
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
        /> */}
      </div>
    </div>
  );
}
