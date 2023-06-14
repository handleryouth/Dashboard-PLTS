import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InterceptorModalButtonProps {
  text: string;
  onClick: () => void;
}

interface ModalState {
  type?: "logout";
  openModal: boolean;
  message?: string;
  title?: string;
}

const initialState: ModalState = {
  message: "",
  openModal: false,
  title: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<Omit<ModalState, "openModal">>) {
      const { message, title, type } = action.payload;
      state.openModal = true;
      state.message = message;
      state.title = title;
      state.type = type;
    },
    hideModal(state) {
      state.openModal = false;
      state.message = "";
      state.title = "";
      state.type = undefined;
    },
  },
});

export const { hideModal, showModal } = modalSlice.actions;

export default modalSlice.reducer;
