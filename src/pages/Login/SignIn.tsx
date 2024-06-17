import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  FocusEvent,
} from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import FormControl from "~/components/FormControl";
import FormLabel from "~/components/FormLabel";
import FormInput from "~/components/FormInput";
import Button from "~/components/Button";
import { clearAccount, doLogin } from "~/store/actions/accountAction";
import useAccount from "~/hooks/useAccount";

const cx = classNames.bind(styles);

interface FormValue {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    state: { error },
    dispatch,
  } = useAccount();

  const [isError, setIsError] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<FormValue>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (formValue.email && formValue.password && error) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [formValue, error]);

  const handleChangeFormValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitLogin = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    doLogin({ dispatch, data: formValue });
  };

  const handleFocusInput = (e: FocusEvent<HTMLInputElement>) => {
    if (error) {
      dispatch(clearAccount());
      setIsError(false);
    }
  };

  return (
    <div>
      <FormControl>
        <>
          <FormLabel label="Email" labelRight="" />
          <FormInput
            value={formValue.email}
            name="email"
            type="email"
            placeholder="Email address"
            invalid={isError}
            onFocus={handleFocusInput}
            onChange={handleChangeFormValue}
          />
        </>
      </FormControl>
      <FormControl>
        <FormInput
          value={formValue.password}
          name="password"
          type="password"
          placeholder="Password"
          invalid={isError}
          onFocus={handleFocusInput}
          onChange={handleChangeFormValue}
        />
      </FormControl>
      {(formValue.password || formValue.email) && isError && (
        <p className={cx("feedback")}>{error}</p>
      )}

      <button
        className={cx("ud-heading-sm", "btn-sign-in")}
        onClick={handleSubmitLogin}
      >
        <div className={cx("inner")}>
          <span className={cx("text")}>Đăng nhập</span>
        </div>
      </button>
    </div>
  );
};

export default SignIn;
