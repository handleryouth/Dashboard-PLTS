import { useCallback, useMemo, useEffect, useState } from "react";
import { Button, Container, Pagination, Table, TableAction } from "components";
import {
  PLTSListResponse,
  ServiceMessageResponse,
  TableActionSearchProps,
  TableContent,
} from "types";
import { requestHelper } from "utils";
import { useNavigate, useSearchParams } from "react-router-dom";

export type PLTSTableHeader = keyof PLTSListResponse | "actionbutton";

export interface PLTSListSearchParams {
  search?: string;
  page?: number;
}

export default function Plts() {
  const [pltsList, setPltsList] =
    useState<ServiceMessageResponse<PLTSListResponse[]>>();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleToEditPage = useCallback(
    (data: PLTSListResponse) => {
      navigate("/plts/edit", {
        state: data,
      });
    },
    [navigate]
  );

  const getHeaderTable = useMemo(
    (): Partial<Record<PLTSTableHeader, string>> => ({
      pltsName: "PLTS Name",
      smaDeviceName: "SMA Device Name",
      ipAddress: "IP Address",
      port: "Port",
      devicePosition: "Address",
      actionbutton: "",
    }),
    []
  );

  const getKeyItem = useCallback(({ _id }: PLTSListResponse) => _id, []);

  const renderItem = useCallback(
    ({
      devicePosition,
      ipAddress,
      pltsName,
      port,
      smaDeviceName,
      _id,
      modbusAddress,
    }: PLTSListResponse): Partial<Record<PLTSTableHeader, TableContent>> => ({
      devicePosition: (
        <div>
          <p>{devicePosition.name}</p>
          <p>{devicePosition.address}</p>
        </div>
      ),
      ipAddress: ipAddress,
      pltsName: pltsName,
      port,
      smaDeviceName,
      actionbutton: (
        <Button
          onClick={() =>
            handleToEditPage({
              _id,
              devicePosition,
              ipAddress,
              pltsName,
              port,
              modbusAddress,
              smaDeviceName,
            })
          }
        >
          Edit
        </Button>
      ),
    }),
    [handleToEditPage]
  );

  const handleConstructParams = useCallback(
    ({ page = 1, search = "" }: PLTSListSearchParams) => {
      setSearchParams({
        search: search,
        page: page.toString(),
      });
    },
    [setSearchParams]
  );

  const handleLoadData = useCallback(async () => {
    const response = await requestHelper("get_plts_list", {
      params: {
        limit: 10,
        page: Number(searchParams.get("page")) || 1,
        search: searchParams.get("search") ?? "",
      },
    });
    if (response && response.status === 200) {
      setPltsList(response.data!);
    }
  }, [searchParams]);

  const handleSearchData = useCallback(
    ({ search }: TableActionSearchProps) => {
      handleConstructParams({ search });
    },
    [handleConstructParams]
  );

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData, searchParams]);

  return (
    <Container>
      <TableAction
        onSubmit={handleSearchData}
        buttonTitle="Add New PLTS"
        onButtonClick={() => navigate("/plts/create")}
      />

      <Pagination
        handlePageChange={() => console.log("page change")}
        page={1}
        resultsLength={pltsList?.total ?? 0}
      />

      <Table
        columns={getHeaderTable}
        data={pltsList?.data ?? []}
        keyItem={getKeyItem}
        renderItem={renderItem}
      />
    </Container>
  );
}
