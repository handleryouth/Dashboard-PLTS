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
import { useCookies } from "react-cookie";

export type PLTSTableHeader = keyof PLTSListResponse | "actionbutton";

export interface PLTSListSearchParams {
  search?: string;
  page?: number;
}

export default function Plts() {
  const [pltsList, setPltsList] =
    useState<ServiceMessageResponse<PLTSListResponse[]>>();

  const [cookies, setCookie] = useCookies(["staffData"]);

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
      globalHorizontalIrradiance,
      installedPower,
      powerPerYear,
      pvSurfaceArea,
    }: PLTSListResponse): Partial<Record<PLTSTableHeader, TableContent>> => ({
      devicePosition: (
        <div>
          <p>{devicePosition?.name ?? "-"}</p>
          <p>{devicePosition?.address ?? "-"} </p>
        </div>
      ),
      ipAddress: ipAddress,
      pltsName: pltsName,
      port,
      smaDeviceName,
      actionbutton:
        cookies.staffData?.role === "admin" ? (
          <Button
            className="bg-green-500"
            onClick={() =>
              handleToEditPage({
                _id,
                devicePosition,
                ipAddress,
                pltsName,
                port,
                modbusAddress,
                smaDeviceName,
                globalHorizontalIrradiance,
                installedPower,
                powerPerYear,
                pvSurfaceArea,
              })
            }
          >
            Edit
          </Button>
        ) : undefined,
    }),
    [cookies.staffData?.role, handleToEditPage]
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
        enableButton={cookies.staffData?.role === "admin"}
        onButtonClick={() => navigate("/plts/create")}
      />

      <Pagination
        handlePageChange={(event) =>
          handleConstructParams({
            page: event.first,
          })
        }
        page={1}
        resultsLength={pltsList?.total ?? 0}
      />

      <Table
        columns={getHeaderTable}
        data={pltsList?.data ?? []}
        keyItem={getKeyItem}
        renderItem={renderItem}
        onClickRowItem={({ _id }) => navigate(`/plts/${_id}`)}
        excludeOnClickRowItem={
          {
            actionbutton: false,
          } as Partial<Record<PLTSTableHeader, boolean>>
        }
      />
    </Container>
  );
}
