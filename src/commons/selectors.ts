import {RootState} from "../app/store";

export const getPacks = (state: RootState) => state.packs
export const getModal = (state: RootState) => state.modal
export const getCards = (state: RootState) => state.cards
export const getAuth = (state: RootState) => state.auth
export const getProfile = (state: RootState) => state.auth.profile

