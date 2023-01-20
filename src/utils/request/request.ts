import { requestInstance } from "utils";
import { ServiceURL, serviceMap } from "../service";

export interface RequestHelperConfig<T extends keyof ServiceURL> {
  params?: ServiceURL[T]["params"];
  body?: ServiceURL[T]["body"];
  withCredentials?: boolean;
}

export async function requestHelper<T extends keyof ServiceURL>(
  requestKey: T,
  config?: RequestHelperConfig<T>
) {
  const { method, url } = serviceMap[requestKey];

  const loadData = await requestInstance({
    method,
    url,
    params: config?.params,
    data: config?.body,
    withCredentials: config?.withCredentials,
  });

  return loadData?.data as ServiceURL[T]["response"];
}
