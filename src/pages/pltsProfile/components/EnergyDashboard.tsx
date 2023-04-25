import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";
import { LineChart, RenderedChartItem } from "components";
import { ENERGY_LABEL_TIME_SELECTION } from "const";
import {
  PLTSClusterValueResponse,
  PLTSClusterValueResponseDataProps,
} from "types";
import { generateDateLocale, requestHelper } from "utils";

export default function EnergyDashboard() {
  const [period, setPeriod] = useState("daily");

  const { id } = useParams<"id">();

  const [loading, setLoading] = useState(true);

  const [energyData, setEnergyData] = useState<PLTSClusterValueResponse>();

  const getEnergyData = useCallback(async () => {
    setLoading(true);
    const response = await requestHelper("get_plts_cluster_value", {
      params: {
        dataTime: period,
        dataType: "energy",
        id,
      },
    });

    if (response && response.status === 200) {
      setEnergyData(response.data.data);
    }
    setLoading(false);
  }, [id, period]);

  const renderChartItem = useCallback(
    (
      item: PLTSClusterValueResponseDataProps
    ): RenderedChartItem<PLTSClusterValueResponseDataProps> => {
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
        title="Cluster Energy Graph"
        isLoading={loading}
        multipleChartDataKey={energyData?.dataKey}
        multipleChartData={energyData?.data}
        coordinate={{
          x: "time",
        }}
        renderItem={renderChartItem}
        customDropdownComponent={
          <SelectButton
            value={period}
            options={ENERGY_LABEL_TIME_SELECTION}
            onChange={(e) => setPeriod(e.value)}
            unselectable={false}
          />
        }
      />
    </div>
  );
}
