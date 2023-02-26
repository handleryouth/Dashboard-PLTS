import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState, hideModal } from "utils";

export default function InterceptorModal() {
  const { message, title, openModal } = useSelector(
    (state: RootState) => state.modal
  );

  const dispatch = useDispatch();

  return (
    <Dialog
      visible={openModal}
      onHide={() => dispatch(hideModal())}
      header={title}
    >
      <p>{message}</p>
    </Dialog>
  );
}
