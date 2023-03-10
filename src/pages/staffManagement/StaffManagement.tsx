import { useCallback, useState, useEffect, useMemo } from "react";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Pagination, Table, TableAction } from "components";
import {
  ServiceMessageResponse,
  StaffDataProps,
  TableActionSearchProps,
  TableContent,
} from "types";
import { requestHelper } from "utils";
import { useCookies } from "react-cookie";

export type StaffManagementTableHeaderProps =
  | keyof StaffDataProps
  | "actionButton";

export interface StaffManagementParams {
  search?: string;
  page?: number;
}

export default function StaffManagement() {
  const [staffData, setStaffData] =
    useState<ServiceMessageResponse<StaffDataProps[]>>();

  const [cookies, setCookies] = useCookies(["staffData"]);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const getStaffData = useCallback(async () => {
    const response = await requestHelper("get_staff_list", {
      params: {
        limit: 10,
        page: Number(searchParams.get("page")) || 1,
        search: searchParams.get("search") ?? "",
      },
    });
    if (response && response.status === 200) {
      setStaffData(response.data);
    }
  }, [searchParams]);

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
    ({ _id, status, name }: StaffDataProps): MenuItem[] => {
      let actionMenuItem: MenuItem[] = [];

      if (!(cookies.staffData?.name === name)) {
        actionMenuItem = [
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
        ];
      }

      return [
        ...actionMenuItem,
        {
          label: "Edit",
          icon: "pi pi-pencil",
          command: () => {
            navigate(`/staff-management/${_id}`);
          },
        },
      ];
    },
    [
      cookies.staffData.name,
      handleActivateStaff,
      handleDeactivateStaff,
      navigate,
    ]
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
      createdAt: new Date(item.createdAt).toLocaleString(),
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

  const handleConstructParams = useCallback(
    ({ page = 1, search = "" }: StaffManagementParams) => {
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

  useEffect(() => {
    getStaffData();
  }, [getStaffData]);

  return (
    <Container>
      <TableAction onSubmit={handleSearchData} enableButton={false} />
      <Pagination
        handlePageChange={(event) =>
          handleConstructParams({
            page: event.first,
          })
        }
        page={1}
        resultsLength={staffData?.total ?? 0}
      />
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
