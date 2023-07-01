import { useCallback, useMemo, useRef } from "react";
import { Toast } from "primereact/toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  NewRefetch,
  Pagination,
  Table,
  TableAction,
} from "components";
import {
  StaffDataProps,
  StaffManagementParams,
  StaffManagementTableHeaderProps,
  TableActionSearchProps,
  TableContent,
} from "types";
import { requestHelper } from "utils";

export default function StaffManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useRef<Toast>(null);

  const getStaffData = useCallback(async () => {
    const response = await requestHelper("get_staff_list", {
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
    data: staffData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: getStaffData,
    queryKey: [
      "staffData",
      searchParams.get("search") ?? "",
      searchParams.get("page") || 1,
    ],
    staleTime: 0,
  });

  const [cookies] = useCookies(["staffData"]);

  const navigate = useNavigate();

  const handleActivateStaff = useCallback(
    async (id: string) => {
      const response = await requestHelper("activate_staff", {
        body: {
          id,
        },
      });

      if (response && response.status === 200) {
        getStaffData();
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Failed to activate staff",
          life: 3000,
        });
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
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Failed to deactivate staff",
          life: 3000,
        });
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

  if (isError) {
    return <NewRefetch restart={refetch} />;
  }

  return (
    <Container>
      <Toast ref={toast} />
      <TableAction
        onSubmit={handleSearchData}
        enableButton={false}
        inputPlaceholder="Search by name"
      />
      <Pagination
        handlePageChange={(page) => {
          handleConstructParams({
            page,
          });
        }}
        page={Number(searchParams.get("page")) || 1}
        resultsLength={staffData?.total ?? 0}
      />
      <Table
        loading={isLoading}
        columns={getHeaderTable}
        data={staffData?.data ?? []}
        keyItem={getKeyItem}
        renderItem={getRenderedItem}
      />
    </Container>
  );
}
