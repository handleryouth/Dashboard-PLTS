export type ServiceStructureProps = "params" | "body" | "response";

export interface ServiceStructure<
  T extends Partial<Record<ServiceStructureProps, Object>>
> {
  params?: T["params"];
  body?: T["body"];
  response: T["response"];
}

export type RequestMethod = "GET" | "DELETE" | "POST" | "PUT" | "PATCH";

export interface RequestURLDetail {
  url: string;
  method: RequestMethod;
}
