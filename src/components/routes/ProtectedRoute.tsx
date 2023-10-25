import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../app/store";
import {getAuth} from "../../commons/selectors";


type PropsType = {
  children: any;
};

export const ProtectedRoute: React.FC<PropsType> = ({children}) => {
  const login = useAppSelector(getAuth).isLoginIn
  // isAuth - boolean

  return login ? children : <Navigate to="/auth"/>;
};
