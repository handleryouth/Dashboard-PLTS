import { Button, Container, Dropdown, Input } from "components";
import { SelectItemOptionsType } from "primereact/selectitem";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { EditStaffBodyProps } from "types";
import { requestHelper } from "utils";

const STAFF_ROLE_OPTIONS: SelectItemOptionsType = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];

export default function StaffManagementEdit() {
  const { id } = useParams<"id">();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<EditStaffBodyProps["role"]>();

  const handleSubmitEvent = useCallback(async () => {
    const response = await requestHelper("edit_staff", {
      body: {
        email,
        name,
        role,
        id,
      },
    });
    if (response && response.status === 200) {
      console.log("success");
    }
  }, [email, id, name, role]);

  return (
    <Container>
      <div className="mx-auto w-[500px] flex flex-col gap-y-4">
        <Input label="Email" onChange={(value) => setEmail(value)} />
        <Input label="Name" onChange={(value) => setName(value)} />
        {/* <Input label="Password" onChange={(value) => setPassword(value)} /> */}
        <Dropdown
          label="Role"
          value={role}
          options={STAFF_ROLE_OPTIONS}
          onChange={(e) => setRole(e.value)}
        />

        <div className="flex items-center justify-between gap-x-8 mt-4">
          <Button className="w-full bg-blue-500" onClick={handleSubmitEvent}>
            Save
          </Button>
          <Button className="w-full bg-gray-200 text-black ">Cancel</Button>
        </div>
      </div>
    </Container>
  );
}
