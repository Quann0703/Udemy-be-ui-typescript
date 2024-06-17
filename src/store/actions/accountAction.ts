import { AxiosResponse } from "axios";
import authService from "~/services/authService";
import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants";
import { Dispatch } from "react";

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  code: number;
  data?: any;
  message?: string;
}

interface CustomAxiosResponse extends AxiosResponse<AuthResponse> {
  code: number;
}
interface AuthDispatchProps {
  dispatch: Dispatch<any>;
  data?: LoginData;
}

const doLogin = ({ dispatch, data }: AuthDispatchProps) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  authService
    .login(data)
    .then((res) => {
      const responseData = res.data;
      const code = (res as CustomAxiosResponse).code;

      if (code === 0) {
        console.log("ok");
        dispatch({ type: USER_LOGIN_SUCCESS, payload: responseData });
        console.log(responseData);
        window.location.reload();
      } else {
        dispatch({ type: USER_LOGIN_FAILED, error: responseData.message });
      }
    })
    .catch((err: any) => {
      dispatch({ type: USER_LOGIN_FAILED });
    });
};

const doLogout = ({ dispatch }: AuthDispatchProps) => {
  authService
    .logout()
    .then((res) => {
      const code = (res as CustomAxiosResponse).code;
      if (code === 0) {
        dispatch({ type: USER_LOGOUT });
      }
    })
    .catch((err: any) => {
      dispatch({ type: USER_LOGIN_FAILED });
    });
  return;
};

const doGetAccount = ({ dispatch }: AuthDispatchProps) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  authService
    .getCurrentUser()
    .then((res: AxiosResponse<AuthResponse>) => {
      const responseData = res.data;
      dispatch({ type: USER_LOGIN_SUCCESS, payload: responseData });
    })
    .catch((err: any) => {
      dispatch({ type: USER_LOGIN_FAILED });
    });
};

const clearAccount = () => {
  return { type: USER_LOGOUT };
};

export { doLogin, doLogout, doGetAccount, clearAccount };
