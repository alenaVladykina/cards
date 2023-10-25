import {useAppDispatch, useAppSelector} from "./store";
import {useLocation, useNavigate, Outlet} from "react-router-dom";
import {Header} from "../components/header/Header";
import React, {useEffect} from "react";
import {authThunk} from "../features/auth/authReduser";
import {getAuth} from "../commons/selectors";


export function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoginIn = useAppSelector(getAuth).profile
  console.log(isLoginIn)
  const location = useLocation();
  const currentPath = sessionStorage.getItem("cardsPATH");

  useEffect(() => {
    if (isLoginIn === null) {
      dispatch(authThunk.authMe())
        .unwrap()
        .catch(() => {
          navigate("/auth");
        });
    }

    if (location.pathname !== "/profile") {
      if (isLoginIn !== null && currentPath) {
        navigate(`${currentPath}`);
      } else {
        navigate("/packs");
      }
    }
  }, [isLoginIn]);


  return (
    <div>
      {isLoginIn && <Header/>}
      <Outlet/>
    </div>
  );
}






