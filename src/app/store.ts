import {configureStore} from '@reduxjs/toolkit';
import {authReduser} from "../features/auth/authReduser";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReduser} from "./appSlice";
import {cardReduser} from "../features/cards/cardSlice";
import {packReduser} from "../features/packs/packsSlice";
import {modalReduser} from "../features/modals/modalSlice";


export const store = configureStore({
  reducer: {
    app: appReduser,
    auth: authReduser,
    packs:packReduser,
    cards:cardReduser,
    modal:modalReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



