import classNames from "classnames/bind";

import styles from "./FormControl.module.scss";

const cx = classNames.bind(styles);
interface Props {
  children: JSX.Element;
}

const FormControl: React.FC<Props> = ({ children }) => {
  return <div className={cx("wrapper")}>{children}</div>;
};

export default FormControl;
