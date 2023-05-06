import { useCallback, useEffect, useState, useMemo } from "react";
import { Container, Pagination, Table, TableAction } from "components";
import { requestHelper } from "utils";
import {
  DeleteModalStateProps,
  PLTSPositionDataResponse,
  PositionParams,
  PositionTableHeaderProps,
  ServiceMessageResponse,
  TableActionSearchProps,
  TableContent,
} from "types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { ConfirmDialog } from "primereact/confirmdialog";
import { PositionDropdownItemsTemplate } from "./components";

export default function Position() {
  const [positionData, setPositionData] =
    useState<ServiceMessageResponse<PLTSPositionDataResponse[]>>();

  const [showModal, setShowModal] = useState<DeleteModalStateProps>();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleLoadData = useCallback(async () => {
    const response = await requestHelper("get_plts_location", {
      params: {
        limit: 10,
        page: Number(searchParams.get("page")) || 1,
        search: searchParams.get("search") ?? "",
      },
    });

    if (response && response.status === 200) {
      setPositionData(response.data);
    }
  }, [searchParams]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  const getHeaderTable = useMemo(
    (): Partial<Record<PositionTableHeaderProps, string>> => ({
      name: "Name",
      address: "Address",
      lat: "Latitude",
      lng: "Longitude",
      actionButton: "",
    }),
    []
  );

  const getTableKeyItem = useCallback(
    (value: PLTSPositionDataResponse) => value._id,
    []
  );

  const handleNavigateToEditPage = useCallback(
    (value: PLTSPositionDataResponse) => {
      navigate("/position/edit", {
        state: value,
      });
    },
    [navigate]
  );

  const handleDeletePosition = useCallback(async () => {
    const response = await requestHelper("delete_plts_position", {
      params: {
        id: showModal?.id,
      },
    });

    if (response && response.status === 202) {
      setShowModal(undefined);
      handleLoadData();
    }
  }, [handleLoadData, showModal?.id]);

  const splitButtonItems: MenuItem[] = useMemo(() => {
    return [
      {
        label: "Edit",
        template: (item, options) => {
          return (
            <PositionDropdownItemsTemplate
              item={item}
              options={options}
              onClickItem={(options) =>
                handleNavigateToEditPage(
                  options.props.splitButtonProps.menuButtonProps
                )
              }
            />
          );
        },
      },
      {
        label: "Delete",
        template: (item, options) => {
          return (
            <PositionDropdownItemsTemplate
              item={item}
              options={options}
              iconClassName="pi pi-times"
              onClickItem={(options) =>
                setShowModal({
                  id: options.props.splitButtonProps.menuButtonProps._id,
                  name: options.props.splitButtonProps.menuButtonProps.name,
                  visible: true,
                })
              }
            />
          );
        },
      },
    ];
  }, [handleNavigateToEditPage]);

  const handleConstructParams = useCallback(
    ({ page = 1, search = "" }: PositionParams) => {
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

  const getRenderedItem = useCallback(
    ({
      _id,
      address,
      lat,
      lng,
      name,
      plantProfile,
    }: PLTSPositionDataResponse): Partial<
      Record<PositionTableHeaderProps, TableContent>
    > => ({
      name,
      address,
      lat: lat.toString(),
      lng: lng.toString(),
      actionButton: (
        <>
          <SplitButton
            label="Action"
            buttonClassName="bg-green-500 border-none hover:!bg-green-500 focus:border-none focus:shadow-none"
            menuButtonClassName="bg-green-500 border-none hover:!bg-green-500 focus:border-none focus:shadow-none rounded-l-none"
            icon="pi pi-plus"
            model={splitButtonItems}
            menuButtonProps={{
              address,
              lat,
              lng,
              name,
              _id,
              plantProfile,
            }}
          />
        </>
      ),
    }),
    [splitButtonItems]
  );

  return (
    <>
      <ConfirmDialog
        visible={showModal?.visible}
        onHide={() => setShowModal(undefined)}
        message={`Are you sure you want to delete ${showModal?.name}?`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={handleDeletePosition}
        reject={() => setShowModal(undefined)}
      />
      <Container>
        <TableAction
          onSubmit={handleSearchData}
          buttonTitle="Add New Position"
          onButtonClick={() => navigate("/position/create")}
        />

        <Pagination
          handlePageChange={(event) =>
            handleConstructParams({
              page: event.first,
            })
          }
          page={1}
          resultsLength={positionData?.total ?? 0}
        />

        <Table
          columns={getHeaderTable}
          keyItem={getTableKeyItem}
          data={positionData?.data}
          renderItem={getRenderedItem}
        />
      </Container>
    </>
  );
}
