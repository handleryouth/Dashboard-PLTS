import { requestHelper } from "../../request";

export async function getPositionList() {
  const response = await requestHelper("get_plts_profile_list");

  if (response && response.status === 200) {
    return response.data.data;
  } else {
    throw new Error("Error when fetching position list");
  }
}
