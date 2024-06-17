import { useContext } from 'react';
import AccountContext from '~/contexts/accountContext';

const useAccount = () => {
    const { state, dispatch } = useContext(AccountContext);
    return { state, dispatch };
};

export default useAccount;
