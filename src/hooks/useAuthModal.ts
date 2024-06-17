import { useContext } from 'react';
import AuthModalContext from '~/contexts/authModalContext';

const useAuthModal = () => {
    const { state, dispatch } = useContext(AuthModalContext);
    return { state, dispatch };
};

export default useAuthModal;