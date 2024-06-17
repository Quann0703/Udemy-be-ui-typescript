import classNames from "classnames/bind";

import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title: string;
  icon: React.ReactNode;
  number: string;
  percent: string;
}

const cx = classNames.bind(styles);
const Card: React.FC<Props> = ({ title, icon, number, percent }) => {
  return (
    <>
      <div className={cx("report-card")}>
        <div
          className={cx(
            "card",
            "transform transition-transform duration-300 hover:scale-110"
          )}
        >
          <div className={cx("card-body flex flex-col")}>
            {/* top */}
            <div className={cx("flex flex-row justify-between items-center")}>
              <span>{icon}</span>
              <span
                className={cx(
                  "rounded-full text-white badge bg-teal-400 text-xl"
                )}
              >
                {percent}
                <FontAwesomeIcon
                  icon={faChevronCircleUp}
                  className={cx("ml-1")}
                />
              </span>
            </div>
            {/* end top */}
            {/* bottom */}
            <div className={cx("mt-8")}>
              <h1 className={cx("text-3xl font-extrabold")}>{number}</h1>
              <p>{title}</p>
            </div>
            {/* end bottom */}
          </div>
        </div>
        <div
          className={cx(
            "footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"
          )}
        />
      </div>
    </>
  );
};

export default Card;
