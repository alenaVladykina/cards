import {createSlice, PayloadAction, ThunkDispatch} from "@reduxjs/toolkit";
import {ModalActionType, ModalType, PayloadModal, ShowModal} from "./ModalTypes";
import {PackType} from "../packs/packsTypes";


export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    typeModal: '' as ModalType,
    payloadModal: {
      action: '' as ModalActionType,
      selectTitle: '',
      title: '',
      pack: {} as PackType,
      id: '',
      value: '',
      private: false,
      cardsId: '',
      cardId: '',
      answer: '',
      question: '',
    }
  },
  reducers: {
    modalShow: (state, actions: PayloadAction<boolean>) => {
      state.show = actions.payload
    },
    modalType: (state, actions: PayloadAction<ModalType>) => {
      state.typeModal = actions.payload
    },
    payloadModal: (state, actions: PayloadAction<PayloadModal>) => {
      state.payloadModal.action = actions.payload.action
      state.payloadModal.selectTitle = actions.payload.selectTitle ? actions.payload.selectTitle : ''
      state.payloadModal.title = actions.payload.title ? actions.payload.title : ''
      state.payloadModal.pack = actions.payload.pack ? actions.payload.pack : {} as PackType
      state.payloadModal.id = actions.payload.id ? actions.payload.id : ''
      state.payloadModal.value = actions.payload.value ? actions.payload.value : ''
      state.payloadModal.private = actions.payload.private ? actions.payload.private : false
      state.payloadModal.cardId = actions.payload.cardId ? actions.payload.cardId : ''
      state.payloadModal.cardsId = actions.payload.cardsId ? actions.payload.cardsId : ''
      state.payloadModal.answer = actions.payload.answer ? actions.payload.answer : ''
      state.payloadModal.question = actions.payload.question ? actions.payload.question : ''
    }
  }
})

export const modalReduser = modalSlice.reducer
export const modalAC = modalSlice.actions











