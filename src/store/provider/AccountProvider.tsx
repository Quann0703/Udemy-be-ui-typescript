import { useReducer } from "react";
import AccountContext from "~/contexts/accountContext";
import { accountReducer, initialState } from "../reducers/accountReducer";
import { injectStore } from "~/utils/httpRequest";

interface Props {
  children: JSX.Element;
}
const AccountProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  injectStore(state);

  return (
    <AccountContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
