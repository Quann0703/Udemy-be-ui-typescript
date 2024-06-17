import classnames from "classnames/bind";

import styles from "./DefaultLayout.module.scss";

import SideBar from "../components/SideBar";

import Navbar from "../components/Navbar";

const cx = classnames.bind(styles);

const DefaultLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Navbar />
      <main className={cx("container")}>
        <div className={cx("h-screen flex flex-row flex-wrap md:w-full")}>
          <SideBar />
          <div className={cx("content")}>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default DefaultLayout;
