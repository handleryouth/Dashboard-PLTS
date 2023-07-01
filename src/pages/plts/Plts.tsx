import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  Container,
  NewRefetch,
  Pagination,
  Table,
  TableAction,
} from "components";
import { PLTSListResponse, TableActionSearchProps, TableContent } from "types";
import { requestHelper } from "utils";

export type PLTSTableHeader = keyof PLTSListResponse | "actionbutton";

export interface PLTSListSearchParams {
  search?: string;
  page?: number;
}

export default function Plts() {
  const [cookies] = useCookies(["staffData"]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleLoadData = useCallback(async () => {
    const response = await requestHelper("get_plts_list", {
      params: {
        limit: 10,
        page: Number(searchParams.get("page")) || 1,
        search: searchParams.get("search") ?? "",
      },
    });

    if (response && response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  }, [searchParams]);

  const {
    isLoading,
    data: pltsList,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "pltsList",
      searchParams.get("search") ?? "",
      searchParams.get("page") || 1,
    ],
    queryFn: handleLoadData,
    staleTime: 0,
    cacheTime: 0,
  });

  const navigate = useNavigate();

  const handleToEditPage = useCallback(
    (data: PLTSListResponse) => {
      navigate("/inverter/edit", {
        state: data,
      });
    },
    [navigate]
  );

  const getHeaderTable = useMemo(
    (): Partial<Record<PLTSTableHeader, string>> => ({
      pltsName: "Inverter Name",
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
      deviceType,
      connectedTo,
      connectedWith,
    }: PLTSListResponse): Partial<Record<PLTSTableHeader, TableContent>> => ({
      devicePosition: (
        <div>
          <p>{devicePosition?.name ?? "-"}</p>
          <p>{devicePosition?.address ?? "-"} </p>
        </div>
      ),
      ipAddress: ipAddress,
      pltsName: pltsName,
      port: port?.toString(),
      smaDeviceName,
      actionbutton:
        cookies.staffData?.role === "admin" ? (
          <Button
            className="bg-green-500 "
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
                deviceType,
                connectedTo,
                connectedWith,
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

  const handleSearchData = useCallback(
    ({ search }: TableActionSearchProps) => {
      handleConstructParams({ search });
    },
    [handleConstructParams]
  );

  if (isError) {
    return <NewRefetch restart={refetch} />;
  }

  return (
    <Container>
      <TableAction
        onSubmit={handleSearchData}
        buttonTitle="Add New PLTS"
        enableButton={cookies.staffData?.role === "admin"}
        onButtonClick={() => navigate("/inverter/create")}
        inputPlaceholder="Search by PLTS Name"
      />
      <Pagination
        handlePageChange={(page) => {
          handleConstructParams({
            page,
          });
        }}
        page={Number(searchParams.get("page")) || 1}
        resultsLength={pltsList?.total ?? 0}
      />

      <Table
        columns={getHeaderTable}
        loading={isLoading}
        data={pltsList?.data ?? []}
        keyItem={getKeyItem}
        renderItem={renderItem}
        onClickRowItem={({ _id }) => navigate(`/inverter/${_id}`)}
        excludeOnClickRowItem={
          {
            actionbutton: false,
          } as Partial<Record<PLTSTableHeader, boolean>>
        }
      />
    </Container>
  );
}
