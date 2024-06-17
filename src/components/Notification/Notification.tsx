import classNames from "classnames/bind";

import styles from "./Notification.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClock,
  faImage,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  faBirthdayCake,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Notification: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

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
    <div className={cx("dropdown relative mr-7 md:static")}>
      <button
        className={cx(
          "text-gray-500 menu-btn p-0 m-0 hover:text-gray-900 focus:text-gray-900 focus:outline-none transition-all ease-in-out duration-300"
        )}
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon={faBell} />
      </button>
      <button
        className={cx(
          "hidden fixed top-0 left-0 z-10 w-full h-full menu-overflow"
        )}
      />
      <div
        className={cx(
          "menu",
          { hidden: !isOpen },
          "w-1/4",
          "h-auto",
          "rounded",
          "bg-white",
          "md:right-40",
          "shadow-md",
          "absolute",
          "z-20",
          "right-0",
          "mt-5",
          "py-2",
          "animated",
          "faster"
        )}
        // style={{ width: "30rem" }} //chu y ve sua sau
      >
        {/* top */}
        <div
          className={cx(
            "px-4 py-4 flex flex-row justify-between items-center capitalize font-semibold text-xl"
          )}
        >
          <h1>notifications</h1>
          <div
            className={cx(
              "bg-teal-100 border border-teal-200 text-teal-500 text-xl rounded px-1"
            )}
          >
            <strong>5</strong>
          </div>
        </div>
        <hr />
        {/* end top */}
        {/* body */}
        {/* item */}
        <a
          className={cx(
            "flex flex-row items-center justify-start px-4 py-4 block capitalize font-medium text-xl tracking-wide bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out"
          )}
          href="#"
        >
          <div
            className={cx(
              "px-3 py-4 rounded mr-3 bg-gray-100 border border-gray-300"
            )}
          >
            <FontAwesomeIcon icon={faBirthdayCake} className={cx("text-xl")} />
          </div>
          <div className={cx("flex-1 flex flex-rowbg-green-100")}>
            <div className={cx("flex-1")}>
              <h1 className={cx("text-xl font-semibold")}>poll..</h1>
              <p className={cx("text-xl text-gray-500")}>text here also</p>
            </div>
            <div className={cx("text-right text-xl text-gray-500")}>
              <p>4 min ago</p>
            </div>
          </div>
        </a>
        <hr />
        {/* end item */}
        {/* item */}
        <a
          className={cx(
            "flex flex-row items-center justify-start px-4 py-4 block capitalize font-medium text-xl tracking-wide bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out"
          )}
          href="#"
        >
          <div
            className={cx(
              "px-3 py-3 rounded mr-3 bg-gray-100 border border-gray-300"
            )}
          >
            <FontAwesomeIcon icon={faUserCircle} className={cx("text-xl")} />
          </div>
          <div className={cx("flex-1 flex flex-rowbg-green-100")}>
            <div className={cx("flex-1")}>
              <h1 className={cx("text-xl font-semibold")}>mohamed..</h1>
              <p className={cx("text-xl text-gray-500")}>text here also</p>
            </div>
            <div className={cx("text-right text-xl text-gray-500")}>
              <p>78 min ago</p>
            </div>
          </div>
        </a>
        <hr />
        {/* end item */}
        {/* item */}
        <a
          className={cx(
            "flex flex-row items-center justify-start px-4 py-4 block capitalize font-medium text-xl tracking-wide bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out"
          )}
          href="#"
        >
          <div
            className={cx(
              "px-3 py-3 rounded mr-3 bg-gray-100 border border-gray-300"
            )}
          >
            <FontAwesomeIcon icon={faImage} className={cx("text-xl")} />
          </div>
          <div className={cx("flex-1 flex flex-rowbg-green-100")}>
            <div className={cx("flex-1")}>
              <h1 className={cx("text-xl font-semibold")}>new imag..</h1>
              <p className={cx("text-x' text-gray-500")}>text here also</p>
            </div>
            <div className={cx("text-right text-xs text-gray-500")}>
              <p>65 min ago</p>
            </div>
          </div>
        </a>
        <hr />
        {/* end item */}
        {/* item */}
        <a
          className={cx(
            "flex flex-row items-center justify-start px-4 py-4 block capitalize font-medium text-xl tracking-wide bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out"
          )}
          href="#"
        >
          <div
            className={cx(
              "px-3 py-3 rounded mr-3 bg-gray-100 border border-gray-300"
            )}
          >
            <FontAwesomeIcon icon={faClock} className={cx("text-xl")} />
          </div>
          <div className={cx("flex-1 flex flex-rowbg-green-100")}>
            <div className={cx("flex-1")}>
              <h1 className={cx("text-xl font-semibold")}>time is up..</h1>
              <p className={cx("text-xl text-gray-500")}>text here also</p>
            </div>
            <div className={cx("text-right text-xl text-gray-500")}>
              <p>1 min ago</p>
            </div>
          </div>
        </a>
        {/* end item */}
        {/* end body */}
        {/* bottom */}
        <hr />
        <div className={cx("px-4 py-4 mt-2")}>
          <a
            href="#"
            className={cx(
              "border border-gray-300 block text-center text-xl uppercase rounded p-1 hover:text-teal-500 transition-all ease-in-out duration-500"
            )}
          >
            view all
          </a>
        </div>
        {/* end bottom */}
      </div>
    </div>
  );
};
export default Notification;
