import { LineChart } from "components";
import { ENERGY_LABEL_TIME_SELECTION } from "const";
import { SelectButton } from "primereact/selectbutton";
import { useCallback, useEffect, useState } from "react";
import { PLTSTotalClusterResponse, TotalClusterDataProps } from "types";
import { generateDateLocale, requestHelper } from "utils";

export default function EnergyDashboard() {
  const [period, setPeriod] = useState("daily");

  const [loading, setLoading] = useState(true);

  const [energyData, setEnergyData] = useState<PLTSTotalClusterResponse>();

  const getEnergyData = useCallback(async () => {
    setLoading(true);
    const response = await requestHelper("get_plts_total_cluster", {
      params: {
        dataTime: period,
        dataType: "energy",
      },
    });

    if (response && response.status === 200) {
      setEnergyData(response.data.data);
    }
    setLoading(false);
  }, [period]);

  const renderChartItem = useCallback(
    (item: TotalClusterDataProps) => {
      return {
        ...item,
        time: generateDateLocale(period, item.time),
      };
    },
    [period]
  );

  useEffect(() => {
    getEnergyData();
  }, [getEnergyData]);

  return (
    <div>
      <LineChart
        title="Cluster Total Energy Graph"
        isLoading={loading}
        multipleChartDataKey={energyData?.dataKey}
        multipleChartData={energyData?.data}
        coordinate={{
          x: "time",
        }}
        customDropdownComponent={
          <SelectButton
            value={period}
            options={ENERGY_LABEL_TIME_SELECTION}
            onChange={(e) => setPeriod(e.value)}
            unselectable={false}
          />
        }
        renderItem={renderChartItem}
      />
    </div>
  );
}
