import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { SmallSideDetailProps } from "types";
import { Section } from "components";

export default function SmallSideDetail({
  data,
  visible,
}: SmallSideDetailProps) {
  const navigate = useNavigate();

  return (
    <Sidebar
      visible={visible}
      onHide={() => null}
      className="mediumToBigDisplay:hidden prose overflow-y-scroll "
      modal={false}
    >
      <h3>{data?.name}</h3>
      <p>{data?.address}</p>

      <h3>All Plants Profile</h3>

      {data?.plantProfile.map((item) => {
        return (
          <div
            onClick={() => navigate(`/plts/${item._id}`)}
            key={item._id}
            className="flex gap-y-4 flex-col bg-gray-300 rounded-md p-4 cursor-pointer"
          >
            <Section
              title="PLTS Name"
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
        );
      })}
    </Sidebar>
  );
}
