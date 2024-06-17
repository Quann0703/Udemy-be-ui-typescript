import classNames from "classnames/bind";

import styles from "./User.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronDown,
  faCommentDots,
  faInbox,
  faTasks,
  faUserEdit,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import useAuthModal from "~/hooks/useAuthModal";
import { openAuthModal } from "~/store/actions/authModalAction";
import { doLogout } from "~/store/actions/accountAction";
import useAccount from "~/hooks/useAccount";

interface Props {
  info: Info;
}
const cx = classNames.bind(styles);

interface Info {
  username: string;
}
const User: React.FC<Props> = ({ info }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useAuthModal();
  const account = useAccount();
  const dropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const handleShowSignIn = () => {
    doLogout({ ...account });
    window.location.href = "/";
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cx("dropdown", "relative", "md:static")} ref={dropdownRef}>
      <button
        className={cx(
          "menu-btn focus:outline-none focus:shadow-outline flex",
          "flex-wrap",
          "items-center"
        )}
        onClick={toggleDropdown}
      >
        <div className={cx("w-10 h-10 overflow-hidden rounded-full")}>
          <img
            className={cx("w-full h-full object-cover")}
            src="https://img-c.udemycdn.com/user/75x75/245266240_ca52.jpg"
            alt="User"
          />
        </div>
        <div className={cx("ml-2 capitalize flex")}>
          <h1
            className={cx(
              "text-xl text-gray-800 font-semibold m-0 p-0 leading-none"
            )}
          >
            {info.username}
          </h1>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={cx("text-lg", "leading-none", "ml-2")}
          />
        </div>
      </button>
      <div
        className={cx(
          "text-gray-500",
          "menu",
          { hidden: !isOpen },
          "md:mt-10",
          // "md:w-full",
          "rounded",
          "bg-white",
          "shadow-md",
          "absolute",
          "z-20",
          "right-5",
          "w-60",
          "mt-5",
          "py-2",
          "animated",
          "faster"
        )}
      >
        <a
          className={cx(
            "px-4 py-4 block capitalize font-medium text-xl tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out"
          )}
          href="#"
        >
          <FontAwesomeIcon icon={faUserEdit} className={cx("text-xl mr-3")} />
          edit my profile
        </a>
        <a
          className={cx(
            "px-4 py-4 block capitalize font-medium text-xl tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out"
          )}
          href="#"
        >
          <FontAwesomeIcon icon={faInbox} className={cx("text-xl mr-3")} />
          my inbox
        </a>
        <a
          className={cx(
            "px-4 py-4 block capitalize font-medium text-xl tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out"
          )}
          href="#"
        >
          <FontAwesomeIcon icon={faTasks} className={cx("text-xl mr-3")} />
          tasks
        </a>
        <a
          className={cx(
            "px-4 py-4 block capitalize font-medium text-xl tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out"
          )}
          href="#"
        >
          <FontAwesomeIcon
            icon={faCommentDots}
            className={cx("text-xl mr-3")}
          />
          chats
        </a>
        <hr />
        <button
          className={cx(
            "px-4 py-4 block capitalize font-medium text-xl tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out"
          )}
          onClick={() => handleShowSignIn()}
        >
          <FontAwesomeIcon icon={faUserTimes} className={cx("text-xl mr-1")} />
          log out
        </button>
      </div>
    </div>
  );
};

export default User;
