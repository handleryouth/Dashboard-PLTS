import { useCallback, useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Button, Dropdown } from "components";
import { requestHelper } from "utils";
import {
  AddGraphModalFormProps,
  AddGraphModalProps,
  PLTSProfileList,
} from "types";

export default function AddGraphModal({
  toggleCloseModal,
  visible,
  onSubmitModal,
}: AddGraphModalProps) {
  const { control, handleSubmit } = useForm<AddGraphModalFormProps>({
    defaultValues: {
      graphName: "",
    },
  });

  const [profileList, setProfileList] = useState<PLTSProfileList[]>([]);

  const onSubmitEvent = useCallback(
    (data: AddGraphModalFormProps) => {
      toggleCloseModal();
      onSubmitModal(data);
    },
    [onSubmitModal, toggleCloseModal]
  );

  const getPltsProfileList = useCallback(async () => {
    const response = await requestHelper("get_plts_profile_list");

    if (response && response.status === 200) {
      setProfileList(response.data.data);
    }
  }, []);

  const getDropdownItem = useMemo(() => {
    return profileList?.map((item) => {
      return {
        label: item.pltsName,
        value: item.pltsName,
      };
    });
  }, [profileList]);

  useEffect(() => {
    getPltsProfileList();
  }, [getPltsProfileList]);

  return (
    <Dialog
      visible={visible}
      onHide={toggleCloseModal}
      header="Add Graph"
      className="w-96"
      dismissableMask
    >
      <form onSubmit={handleSubmit(onSubmitEvent)}>
        <Controller
          name="graphName"
          control={control}
          rules={{
            required: "Graph name is required",
          }}
          render={({ field, fieldState }) => (
            <Dropdown
              id={field.name}
              placeholder="Select Graph"
              {...field}
              errorMessage={fieldState.error?.message}
              options={getDropdownItem}
            />
          )}
        />

        <div className="flex items-center gap-x-4 mt-4">
          <Button className="w-full" type="submit">
            Add
          </Button>

          <Button className="w-full" onClick={toggleCloseModal}>
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
