import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/store";
import {appActions} from "../app/appSlice";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const GlobalError = () => {
  const error = useAppSelector(state => state.app.error);
  const dispatch = useAppDispatch();

  if (error != null) {
    toast.error(error);
  }

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(appActions.setError({error: null}));
      }, 2000);
    }
  }, [error]);

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
