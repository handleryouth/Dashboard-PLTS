import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import {
  LineSegment,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryTooltip,
} from "victory";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";
import { Dropdown } from "components";
import { PLTSComparingValueResponse } from "types";
import { SelectItem } from "primereact/selectitem";
import { ProgressSpinner } from "primereact/progressspinner";

export const BUTTON_LABEL_TIME_SELECTION: SelectItem[] = [
  {
    label: "Hourly",
    value: "hourly",
  },
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Yearly",
    value: "yearly",
  },
];

export default function CumulativeDashboard() {
  const [dataKey, setDataKey] = useState<string[]>([]);

  const [period, setPeriod] = useState("daily");

  const [isLoading, setIsLoading] = useState(true);

  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });

  const graphRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  const [comparingData, setComparingData] =
    useState<PLTSComparingValueResponse>();

  console.log("comparing data", period);

  const [dropdownValue, setDropdownValue] = useState<string>();

  const getDataKey = useCallback(async () => {
    const response = await requestHelper("get_plts_comparing_data_key");

    if (response && response.status === 200) {
      setDataKey(response.data.data);
    }

    setIsLoading(false);
  }, []);

  const getDataValue = useCallback(async () => {
    setIsLoading(true);
    const response = await requestHelper("get_plts_cumulative_value", {
      params: {
        dataName: dropdownValue,
        dataTime: period,
      },
    });

    if (response && response.status === 200) {
      setComparingData(response.data.data);
    }

    setIsLoading(false);
  }, [dropdownValue, period]);

  const handleRenderDropdownItem = useMemo(() => {
    return dataKey.map((item) => {
      return {
        label: convertCamelCaseToPascalCase(item),
        value: item,
      };
    });
  }, [dataKey]);

  useEffect(() => {
    getDataKey();
  }, [getDataKey]);

  useEffect(() => {
    if (dropdownValue) {
      getDataValue();
    }
  }, [dropdownValue, getDataValue]);

  const generateDateLocale = useCallback(
    (dateValue: string) => {
      switch (period) {
        case "hourly":
          return new Date(dateValue).toLocaleTimeString("id-ID");
        case "daily":
          return new Date(dateValue).toLocaleDateString("id-ID");
        case "monthly":
          return new Date(dateValue).toLocaleString("id-ID", {
            month: "long",
          });
        case "yearly":
          return new Date(dateValue).toLocaleString("id-ID", {
            year: "numeric",
          });
        default:
          return new Date(dateValue).toLocaleTimeString("id-ID");
      }
    },
    [period]
  );

  const generatedData = useCallback(
    (dataKey: string) => {
      return comparingData?.data.map((item) => ({
        x: generateDateLocale(item.time),
        y: item[dataKey],
      }));
    },
    [comparingData?.data, generateDateLocale]
  );

  const generateLegend = useMemo(() => {
    return comparingData?.pltsKey.map((item) => ({
      name: convertCamelCaseToPascalCase(item),
    }));
  }, [comparingData?.pltsKey]);

  return (
    <div ref={graphRef}>
      <div className="flex items-center justify-between">
        <h3 className="my-0 basis-1/2">Comparing Dashboard</h3>

        <Dropdown
          value={dropdownValue}
          options={handleRenderDropdownItem}
          placeholder="Select Data"
          filter
          onChange={(e) => {
            setDropdownValue(e.target.value);
          }}
          className="w-full"
        />
      </div>

      <SelectButton
        className="text-center my-4"
        value={period}
        options={BUTTON_LABEL_TIME_SELECTION}
        onChange={(e) => setPeriod(e.value)}
        unselectable={false}
      />

      {isLoading ? (
        <div className="text-center my-8">
          <ProgressSpinner className="w-14 h-14" />
        </div>
      ) : (
        <VictoryChart width={boundingRect.width} height={450}>
          <VictoryGroup offset={20} colorScale="qualitative">
            {comparingData?.pltsKey.map((item) => (
              <VictoryBar
                key={item}
                data={generatedData(item)}
                labels={({ datum }) => datum.y}
                labelComponent={
                  <VictoryTooltip dy={0} centerOffset={{ x: 25 }} />
                }
              />
            ))}
          </VictoryGroup>

          <VictoryAxis
            axisLabelComponent={<VictoryLabel />}
            fixLabelOverlap
            style={{
              tickLabels: { angle: -20 },
              grid: { stroke: "#000000", strokeWidth: 0.5 },
            }}
            standalone={false}
            gridComponent={<LineSegment />}
            tickLabelComponent={<VictoryLabel verticalAnchor="start" />}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            gridComponent={<LineSegment />}
            tickLabelComponent={
              <VictoryLabel verticalAnchor="middle" textAnchor="start" x={0} />
            }
            style={{
              grid: { stroke: "#000000", strokeWidth: 0.5 },
            }}
          />

          <VictoryLegend
            orientation="horizontal"
            colorScale="qualitative"
            gutter={20}
            data={generateLegend}
          />
        </VictoryChart>
      )}
    </div>
  );
}
