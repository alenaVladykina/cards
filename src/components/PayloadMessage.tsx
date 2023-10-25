import React, {useEffect} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../app/store";
import {appActions} from "../app/appSlice";

export const PayloadMessage = () => {
  const payloadMessage = useAppSelector(state => state.app.payloadMessage)
  const dispatch = useAppDispatch();

  if (payloadMessage != null) {
    toast.error(payloadMessage);
  }

  useEffect(() => {
    if (payloadMessage !== null) {
      setTimeout(() => {
        dispatch(appActions.successful({payloadMessage: null}));
      }, 2000);
    }
  }, [payloadMessage]);
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};
