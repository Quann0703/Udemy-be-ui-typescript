import classNames from "classnames/bind";

import styles from "./Register.module.scss";
import AuthModal from "~/components/AuthModal/AuthModal";
import Header from "./Header";

import SignUp from "./SignUp";
import { useState } from "react";

import useAuthModal from "~/hooks/useAuthModal";
import { openRegister } from "~/store/actions/authModalAction";

const cx = classNames.bind(styles);
function Register() {
  // const [signIn, setSign] = useState(false);
  const { dispatch } = useAuthModal();
  // const handleShowSignIn = () => {
  //     setSign((prev) => !prev);
  // };
  const handleShowRegister = () => {
    dispatch(openRegister());
  };
  return (
    <AuthModal>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("content")}>
            <Header />
            <div className={cx("body")}>
              <div className={cx("mainStep")}>
                <div className={cx("formBody")}>
                  <SignUp />
                </div>
              </div>
              <p className={cx("dontHaveAcc")}>
                Bạn chưa có tài khoản?{" "}
                <button onClick={handleShowRegister}>Đăng ký</button>
              </p>
            </div>
            <div className={cx("acceptTerm")}>
              Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
              <a href="https://fullstack.edu.vn/terms" target="_top">
                điều khoản sử dụng
              </a>
              của chúng tôi.
            </div>
          </div>
        </div>
      </div>
    </AuthModal>
  );
}

export default Register;
