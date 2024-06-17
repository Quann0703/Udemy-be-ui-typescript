import classNames from "classnames/bind";

import styles from "./Tab.module.scss";

interface Props {
  title: string;
  children: JSX.Element;
}

const cx = classNames.bind(styles);
const Tab: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <p className={cx("uppercase text-xl text-gray-600 mb-4 tracking-wider")}>
        {title}
      </p>
      {children}
    </>
  );
};

export default Tab;
