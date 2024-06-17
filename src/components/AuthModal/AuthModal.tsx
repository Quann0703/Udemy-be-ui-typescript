import classNames from "classnames/bind";

import useAuthModal from "~/hooks/useAuthModal";
import {
  closeAuthModal,
  closingAuthModal,
} from "~/store/actions/authModalAction";
import styles from "./AuthModal.module.scss";

interface Props {
  children: JSX.Element;
}
const cx = classNames.bind(styles);

const AuthModal: React.FC<Props> = ({ children }) => {
  const { state, dispatch } = useAuthModal();
  const handleCloseAuthModal = () => {
    dispatch(closingAuthModal());
    setTimeout(() => {
      dispatch(closeAuthModal);
    }, 3000);
  };
  return (
    <div
      className={cx("wrapper", {
        closing: state.isClosing,
      })}
    >
      <div className={cx("overlay")} onClick={handleCloseAuthModal}></div>
      <div className={cx("content")}>
        <button className={cx("close")} onClick={handleCloseAuthModal}>
          <span>×</span>
        </button>
        <div className={cx("iframe")}>{children}</div>
      </div>
    </div>
  );
};

export default AuthModal;
