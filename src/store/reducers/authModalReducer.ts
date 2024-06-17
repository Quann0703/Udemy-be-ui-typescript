import { CLOSE_MODAL, OPEN_MODAL, CLOSING_MODAL, OPEN_REGISTER } from '../constants';

const initialState = {
    isOpen: false,
    isClosing: false,
    isRegister: false,
    isLogin: true,
};

const authModalReducer = (state:any, action:any) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                isClosing: false,
                isLogin: true,
                isRegister: false,
            };

        case CLOSING_MODAL:
            return {
                ...state,
                isOpen: false,
                isClosing: true,
            };

        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                isClosing: false,
            };
        case OPEN_REGISTER:
            return {
                ...state,
                isOpen: true,
                isRegister: true,
                isLogin: false,
            };
        default:
            return state;
    }
};

export { authModalReducer, initialState };
