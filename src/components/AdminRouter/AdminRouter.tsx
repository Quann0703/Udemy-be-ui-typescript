import { useEffect } from "react";
import useAccount from "~/hooks/useAccount";
import useAuthModal from "~/hooks/useAuthModal";
import { openAuthModal } from "~/store/actions/authModalAction";

interface Props {
  children: JSX.Element;
}

const AdminRouter: React.FC<Props> = ({ children }) => {
  const {
    state: { isLogin },
  } = useAccount();
  const { dispatch } = useAuthModal();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isLogin) {
        dispatch(openAuthModal());
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isLogin, dispatch]);

  return isLogin ? children : <div></div>;
};

export default AdminRouter;
