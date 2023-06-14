import { Button } from "components";
import { Dialog } from "primereact/dialog";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, hideModal, logout, showModal } from "utils";

export interface ModalInterceptorButtonProps {
  text: string;
  onClick: () => void;
}

export type ModalInterceptorType = "logout";

export interface ModalInterceptorProps {
  message: string;
  title: string;
  actionButton?: ModalInterceptorButtonProps;
}

export default function InterceptorModal() {
  const { message, title, openModal, type } = useSelector(
    (state: RootState) => state.modal
  );

  const [, , removeCookie] = useCookies([
    "staffData",
    "isLogin",
    "refreshToken",
    "accessToken",
  ]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const modalInterceptor: Record<ModalInterceptorType, ModalInterceptorProps> =
    {
      logout: {
        message: "Your session has expired. Please login again.",
        title: "Session Expired",
        actionButton: {
          onClick: () => {
            logout({
              onLogoutSuccess() {
                removeCookie("staffData");
                removeCookie("isLogin");
                navigate("/");
                dispatch(hideModal());
              },
              onLogoutFailure() {
                dispatch(
                  showModal({
                    message: "response.data.message",
                    title: "Error",
                  })
                );
              },
            });
          },
          text: "Logout",
        },
      },
    };

  return (
    <Dialog
      draggable={false}
      visible={openModal}
      onHide={() => dispatch(hideModal())}
      header={type ? modalInterceptor[type]["title"] : title}
    >
      <p>{type ? modalInterceptor[type]["message"] : message}</p>
      {type && modalInterceptor[type]["actionButton"] && (
        <Button
          className="w-full mt-4"
          onClick={() => modalInterceptor[type].actionButton?.onClick()}
        >
          {modalInterceptor[type]["actionButton"]?.text}
        </Button>
      )}
    </Dialog>
  );
}
