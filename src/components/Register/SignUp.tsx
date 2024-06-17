import React, { useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames/bind";

import styles from "./Register.module.scss";
import FormControl from "~/components/FormControl";
import FormLabel from "~/components/FormLabel";
import FormInput from "~/components/FormInput";

import authService from "~/services/authService";

const cx = classNames.bind(styles);

interface FormValues {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

const Register: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<FormValues>({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleChangeFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    authService
      .register(formValue)
      .then(() => {
        toast.success("Tạo tài khoản thành công");
      })
      .catch(() => {
        toast.error("Tạo tài khoản thất bại");
        setIsError(true);
      });
  };
  console.log(formValue);

  return (
    <>
      <FormControl>
        <>
          <FormLabel label={"Full name"} labelRight="" />
          <FormInput
            value={formValue.username}
            name={"username"}
            type={"text"}
            placeholder={"User name address"}
            invalid={isError}
            onChange={handleChangeFormValue}
          />
        </>
      </FormControl>
      <FormControl>
        <FormInput
          value={formValue.email}
          name={"email"}
          type={"email"}
          placeholder={"Email address"}
          invalid={isError}
          onChange={handleChangeFormValue}
        />
      </FormControl>
      <FormControl>
        <FormInput
          value={formValue.password}
          name={"password"}
          type={"password"}
          placeholder={"Password"}
          invalid={isError}
          onChange={handleChangeFormValue}
        />
      </FormControl>
      <FormControl>
        <FormInput
          value={formValue.repeatPassword}
          name={"repeatPassword"}
          type={"password"}
          placeholder={"Repeat Password"}
          invalid={isError}
          onChange={handleChangeFormValue}
        />
      </FormControl>
      {(formValue.password || formValue.email || formValue.username) &&
        isError && <p className={cx("feedback")}>{/* {error} */}</p>}
      <button
        className={cx("ud-heading-sm", "btn-sign-in")}
        onClick={handleSubmit}
      >
        <div className={cx("inner")}>
          <span className={cx("text")}>Đăng ký</span>
        </div>
      </button>
    </>
  );
};

export default Register;
