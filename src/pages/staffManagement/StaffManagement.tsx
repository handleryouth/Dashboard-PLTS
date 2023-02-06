import { Container, Table } from "components";
import { useCallback, useState, useEffect, useMemo } from "react";
import { StaffDataProps, StaffDataResponse, TableContent } from "types";
import { requestHelper } from "utils";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

export type StaffManagementTableHeaderProps =
  | keyof StaffDataProps
  | "actionButton";

export default function StaffManagement() {
  const [staffData, setStaffData] = useState<StaffDataResponse>();

  const navigate = useNavigate();

  const getStaffData = useCallback(async () => {
    const response = await requestHelper("get_staff_list", {
      params: {
        limit: 10,
        page: 1,
      },
    });
    if (response && response.status === 200) {
      setStaffData(response.data);
    }
  }, []);

  const handleActivateStaff = useCallback(
    async (id: string) => {
      const response = await requestHelper("activate_staff", {
        body: {
          id,
        },
      });

      if (response && response.status === 200) {
        getStaffData();
      }
    },
    [getStaffData]
  );

  const handleDeactivateStaff = useCallback(
    async (id: string) => {
      const response = await requestHelper("deactivate_staff", {
        body: {
          id,
        },
      });

      if (response && response.status === 200) {
        getStaffData();
      }
    },
    [getStaffData]
  );

  const actionButtonMenuItem = useCallback(
    ({ _id, status, email }: StaffDataProps): MenuItem[] => {
      console.log("id and email", email, _id);
      return [
        {
          label: "Deactivate",
          visible: status === "active",
          icon: "pi pi-user-minus",
          command: () => handleDeactivateStaff(_id),
        },
        {
          label: "Activate",
          visible: status === "inactive",
          icon: "pi pi-user-plus",
          command: () => {
            handleActivateStaff(_id);
          },
        },
        {
          label: "Edit",
          icon: "pi pi-pencil",
          command: () => {
            navigate(`/staff-management/${_id}`);
          },
        },
      ];
    },
    [handleActivateStaff, handleDeactivateStaff, navigate]
  );

  const getHeaderTable = useMemo(
    (): Partial<Record<StaffManagementTableHeaderProps, string>> => ({
      createdAt: "Created At",
      email: "Email",
      name: "Name",
      role: "Role",
      status: "Status",
      actionButton: "Action",
    }),
    []
  );

  const getKeyItem = useCallback(({ _id }: StaffDataProps) => _id, []);

  const getRenderedItem = useCallback(
    (
      item: StaffDataProps
    ): Partial<Record<StaffManagementTableHeaderProps, TableContent>> => ({
      createdAt: item.createdAt,
      email: item.email,
      name: item.name,
      role: item.role,
      status: item.status,
      actionButton: (
        <SplitButton
          className=" prosbg-white p-button-outlined p-button-secondary"
          buttonClassName="border-0 text-black "
          menuButtonClassName="border-0 hover:bg-blue-500 text-black"
          label="Action"
          menuClassName="prose prose-a:my-0"
          model={actionButtonMenuItem(item)}
        />
      ),
    }),
    [actionButtonMenuItem]
  );

  useEffect(() => {
    getStaffData();
  }, [getStaffData]);

  return (
    <Container>
      {staffData && (
        <Table
          columns={getHeaderTable}
          data={staffData.data}
          keyItem={getKeyItem}
          renderItem={getRenderedItem}
        />
      )}
    </Container>
  );
}
