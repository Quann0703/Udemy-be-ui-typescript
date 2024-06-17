import { CLOSE_MODAL, CLOSING_MODAL, OPEN_MODAL, OPEN_REGISTER } from '../constants';

const openAuthModal = () => {
    return { type: OPEN_MODAL };
};

const closingAuthModal = () => {
    return { type: CLOSING_MODAL };
};

const closeAuthModal = () => {
    return { type: CLOSE_MODAL };
};

const openRegister = () => {
    return { type: OPEN_REGISTER };
};

export { openAuthModal, closingAuthModal, closeAuthModal, openRegister };