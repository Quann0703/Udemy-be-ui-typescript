import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons/faEnvelopeOpenText";
import {
  faCalendar,
  faCheckCircle,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Navbar.module.scss";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons/faCalendarAlt";
import User from "~/components/User";
import Notification from "~/components/Notification";
import useAccount from "~/hooks/useAccount";

const cx = classNames.bind(styles);
function Content() {
  const { state } = useAccount();
  return (
    <div
      id="navbar"
      className={cx(
        "animated",
        "flex",
        "flex-row",
        "flex-wrap",
        "justify-between",
        "items-center",
        "flex-1",
        "pl-3"
      )}
    >
      <div className={cx("text-gray-600")}>
        <a
          className={cx(
            "mr-5",
            "transition",
            "duration-500",
            "ease-in-out",
            "hover:text-gray-900"
          )}
          href="#"
          title="email"
        >
          {/* <i className={cx("fad fa-envelope-open-text")} /> */}
          <FontAwesomeIcon icon={faEnvelopeOpenText} />
        </a>
        <a
          className={cx(
            "mr-5 transition duration-500 ease-in-out hover:text-gray-900"
          )}
          href="#"
          title="email"
        >
          <FontAwesomeIcon icon={faCommentAlt} />
        </a>
        <a
          className={cx(
            "mr-5 transition duration-500 ease-in-out hover:text-gray-900"
          )}
          href="#"
          title="email"
        >
          <i className={cx("fad fa-check-circle")} />
          <FontAwesomeIcon icon={faCheckCircle} />
        </a>
        <a
          className={cx(
            "mr-5 transition duration-500 ease-in-out hover:text-gray-900"
          )}
          href="#"
          title="email"
        >
          <i className={cx("fad fa-calendar-exclamation")} />
          <FontAwesomeIcon icon={faCalendarAlt} />
        </a>
      </div>
      <div className={cx("flex flex-row-reverse items-center mr-5")}>
        <User info={state.userInfo} />
        <Notification />
      </div>
    </div>
  );
}

export default Content;
