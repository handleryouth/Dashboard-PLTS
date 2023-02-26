import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  openModal: boolean;
  message: string;
  title: string;
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
      const { message, title } = action.payload;
      state.openModal = true;
      state.message = message;
      state.title = title;
    },
    hideModal(state) {
      state.message = "";
      state.openModal = false;
      state.title = "";
    },
  },
});

export const { hideModal, showModal } = modalSlice.actions;

export default modalSlice.reducer;
