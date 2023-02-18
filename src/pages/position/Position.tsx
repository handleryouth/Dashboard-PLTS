import { useCallback, useEffect, useState, useMemo } from "react";
import { Container, Table, TableAction } from "components";
import { requestHelper } from "utils";
import { PLTSPositionDataResponse, TableContent } from "types";
import { useNavigate } from "react-router-dom";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { ConfirmDialog } from "primereact/confirmdialog";
import { PositionDropdownItemsTemplate } from "./components";

export type PositionTableHeaderProps =
  | keyof PLTSPositionDataResponse
  | "actionButton";

export interface DeleteModalStateProps {
  visible: boolean;
  name: string;
  id: string;
}

export default function Position() {
  const [positionData, setPositionData] =
    useState<PLTSPositionDataResponse[]>();

  const [showModal, setShowModal] = useState<DeleteModalStateProps>();

  const navigate = useNavigate();

  const handleLoadData = useCallback(async () => {
    const response = await requestHelper("get_plts_location");

    if (response && response.status === 200) {
      setPositionData(response.data.data);
    }
  }, []);

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
            buttonClassName="bg-black border-none hover:!bg-black focus:border-none focus:shadow-none"
            menuButtonClassName="bg-black border-none hover:!bg-black focus:border-none focus:shadow-none rounded-l-none"
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

          {/* <Button
            onClick={() =>
              navigate("/position/edit", {
                state: {
                  _id,
                  address,
                  lat,
                  lng,
                  name,
                },
              })
            }
          >
            Edit
          </Button> */}
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
          onSubmit={() => null}
          buttonTitle="Add New Position"
          onButtonClick={() => navigate("/position/create")}
        />

        <Table
          columns={getHeaderTable}
          keyItem={getTableKeyItem}
          data={positionData}
          renderItem={getRenderedItem}
        />
      </Container>
    </>
  );
}
