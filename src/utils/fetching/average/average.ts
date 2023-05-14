import { DataTimeType } from "types";
import { requestHelper } from "../../request";

export async function getAverageData(pltsName: string, period: DataTimeType) {
  const response = await requestHelper(
    "get_plts_profile_detail_average_value",
    {
      params: {
        pltsName: pltsName,
        dataTime: period,
      },
    }
  );

  if (response && response.status === 200) {
    return response.data.data;
  } else {
    throw new Error("Error when fetching average data");
  }
}
