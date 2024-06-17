import classNames from "classnames/bind";
import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Tab.module.scss";

interface Props {
  title: string;
  icon: React.ReactNode;
  to: string;
}

const cx = classNames.bind(styles);
const TabItem: React.FC<Props> = ({ title, icon, to }) => {
  return (
    <>
      <NavLink
        to={to}
        className={(nav) =>
          cx(
            "mb-3 p-2 capitalize font-bold flex items-center rounded-lg text-xl hover:text-teal-600 transition ease-in-out duration-500",
            {
              active: nav.isActive,
            },
            "active:bg-teal-400 focus:outline-none focus:ring"
          )
        }
      >
        <span className={cx("w-8 h-8 mr-2 flex items-center")}>{icon}</span>
        <span>{title}</span>
      </NavLink>
    </>
  );
};

export default TabItem;
