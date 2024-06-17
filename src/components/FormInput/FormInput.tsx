import React, { FocusEventHandler, ChangeEventHandler } from "react";
import classnames from "classnames/bind";
import styles from "./FormInput.module.scss";

const cx = classnames.bind(styles);

interface FormInputProps {
  value: string;
  name: string;
  type?: string;
  placeholder?: string;
  invalid?: boolean;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  [key: string]: any; // để chấp nhận các props bổ sung
}

const FormInput: React.FC<FormInputProps> = ({
  value,
  name,
  type = "text",
  placeholder,
  invalid,
  onFocus,
  onChange,
  ...props
}) => {
  return (
    <div
      className={cx("wrapper", {
        error: invalid,
      })}
    >
      <input
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        onFocus={onFocus}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default FormInput;
