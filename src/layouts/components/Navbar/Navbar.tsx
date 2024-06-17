import classNames from "classnames/bind";

import styles from "./Navbar.module.scss";
import Logo from "~/components/Logo";

import Content from "./Content";

const cx = classNames.bind(styles);
function Navbar() {
  return (
    <>
      <div
        className={cx(
          " md:w-full md:top-0 fixed md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300"
        )}
      >
        <Logo />

        <Content />
      </div>
    </>
  );
}

export default Navbar;
