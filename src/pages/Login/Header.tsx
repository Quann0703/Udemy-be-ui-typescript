import classNames from "classnames/bind";

import styles from "./Login.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);
function Header() {
  return (
    <div className={cx("header")}>
      <a href="https://fullstack.edu.vn/" target="_top">
        <img className={cx("logo")} src={images.logo} alt="F8" />
      </a>
      <h1 className={cx("title")}>Đăng nhập vào Udemy</h1>
      <p className={cx("desc")}>
        Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng
        chung có thể sẽ bị khóa.
      </p>
    </div>
  );
}

export default Header;
