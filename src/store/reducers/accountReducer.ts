import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants";

// Định nghĩa kiểu cho thông tin người dùng
interface UserInfo {
  accessToken: string;
  refreshToken: string;
  email: string;
  username: string;
}

// Định nghĩa kiểu cho trạng thái
interface State {
  userInfo: UserInfo;
  isLogin: boolean;
  isLoading: boolean;
  error: string;
}

// Định nghĩa kiểu cho hành động
interface Action {
  type: string;
  payload?: Partial<UserInfo>;
  error?: string;
}

// Trạng thái ban đầu
const initialState: State = {
  userInfo: {
    accessToken: "",
    refreshToken: "",
    email: "",
    username: "",
  },
  isLogin: false,
  isLoading: false,
  error: "",
};

// Helper function to create a default UserInfo object
const defaultUserInfo = (): UserInfo => ({
  accessToken: "",
  refreshToken: "",
  email: "",
  username: "",
});

// Reducer với kiểu được thêm vào
const accountReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        userInfo: defaultUserInfo(),
        isLoading: true,
        error: "",
      };
    }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...defaultUserInfo(),
          ...action.payload,
        },
        isLogin: true,
        isLoading: false,
        error: "",
      };

    case USER_LOGIN_FAILED:
      return {
        ...state,
        userInfo: defaultUserInfo(),
        isLoading: false,
        error: action.error || "",
      };

    case USER_LOGOUT:
      return {
        ...state,
        userInfo: defaultUserInfo(),
        isLogin: false,
        isLoading: false,
        error: "",
      };

    default:
      return state;
  }
};

export { accountReducer, initialState };
