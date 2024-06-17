import React from "react";
import classnames from "classnames/bind";
import styles from "./FormLabel.module.scss";

const cx = classnames.bind(styles);

interface FormLabelProps {
  label: string;
  labelRight: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ label, labelRight }) => {
  return (
    <div className={cx("wrapper")}>
      <label className={cx("label")}>{label}</label>
      <label className={cx("label")}>{labelRight}</label>
    </div>
  );
};

export default FormLabel;
