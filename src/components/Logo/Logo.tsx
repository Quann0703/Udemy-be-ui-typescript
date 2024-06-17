import classNames from "classnames/bind";

import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);
function Logo() {
  return (
    <div className={cx("flex-none w-32 flex flex-row items-center")}>
      <img
        src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
        className={cx("w-40 flex-none")}
      />
      {/* <button
        id="sliderBtn"
        className={cx("flex-none text-right text-gray-900 hidden md:block")}
      >
        <i className={cx("fad fa-list-ul")} />
      </button> */}
    </div>
  );
}

export default Logo;
