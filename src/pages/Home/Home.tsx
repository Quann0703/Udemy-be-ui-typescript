import classNames from "classnames/bind";

import styles from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import Card from "~/components/Card";
import {
  faBlog,
  faCaretDown,
  faCaretUp,
  faCheckDouble,
  faChevronDown,
  faCircle,
  faEllipsisV,
  faEye,
  faSitemap,
  faStore,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import {
  faChrome,
  faFirefox,
  faIntercom,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

import images from "~/assets/images";
import Chart from "~/components/Chart";
import SaleOverview from "~/components/SaleOverview";
import lessonService from "~/services/lessonService";
import courseService from "~/services/courseService";

const cx = classNames.bind(styles);
type CourseType = {
  length: any;
};
function Home() {
  const [course, setCourse] = useState<CourseType>();
  const [user, setUser] = useState<CourseType>();
  useEffect(() => {
    lessonService.getCourse().then((res) => {
      setCourse(res.data);
    });
    courseService.getUser().then((res) => setUser(res.data));
  }, []);
  console.log(course?.length);

  return (
    <div className={cx("bg-gray-100 flex-1 p-6")}>
      <div className={cx("grid grid-cols-4 gap-6")}>
        <Card
          title="Items Sales"
          icon={
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={cx("text-3xl text-indigo-700")}
            />
          }
          number="8531"
          percent="12%"
        />
        <Card
          title="New Orders"
          icon={
            <FontAwesomeIcon
              icon={faStore}
              className={cx("text-3xl text-red-700")}
            />
          }
          number="1715"
          percent="6%"
        />
        <Card
          title="total Products"
          icon={
            <FontAwesomeIcon
              icon={faSitemap}
              className={cx("text-3xl text-yellow-600 ")}
            />
          }
          number={course?.length}
          percent={`${course?.length} %`}
        />
        <Card
          title="new Visitor"
          icon={
            <FontAwesomeIcon
              icon={faUser}
              className={cx("text-3xl text-green-700")}
            />
          }
          number={user?.length}
          percent={`${user?.length} %`}
        />
      </div>
      <div className={cx("mt-6 grid grid-cols-2 gap-6")}>
        <div
          className={cx(
            "card bg-teal-400 border-teal-400 shadow-md text-white"
          )}
        >
          <div className={cx("card-body flex flex-row")}>
            <div
              className={cx(
                "img-wrapper w-64 h-64 flex justify-center items-center"
              )}
            >
              <img src={images.happy} alt="img title" />
            </div>

            <div className={cx("py-2 ml-10")}>
              <h1 className={cx("text-3xl font-extrabold")}>
                Good Job, Mohamed!
              </h1>
              <p className={cx("text-white text-sm")}>
                You've finished all of your tasks for this week.
              </p>
              <ul className={cx("mt-4")}>
                <li className={cx("text-lg font-light flex  items-center")}>
                  <FontAwesomeIcon
                    icon={faCheckDouble}
                    className={cx("mr-4 ")}
                  />
                  <span>Finish Dashboard Design</span>
                </li>
                <li className={cx("text-lg font-light")}>
                  <FontAwesomeIcon
                    icon={faCheckDouble}
                    className={cx("text-lg mr-4")}
                  />
                  <span>Fix Issue #74</span>
                </li>
                <li className={cx("text-lg font-light")}>
                  <FontAwesomeIcon
                    icon={faCheckDouble}
                    className={cx("mr-4 ")}
                  />
                  <span>Publish version 1.0.6</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={cx("flex flex-col")}>
          <div className={cx("alert alert-dark mb-6 text-xl py-4 px-6")}>
            Hi! Wait A Minute . . . . . . Follow Me On Twitter
            <a
              className={cx("ml-2 text-customGray")}
              target="_blank"
              href="https://twitter.com/MohamedSaid__"
            >
              @moesaid
            </a>
          </div>
          <div className={cx("grid grid-cols-2 gap-6 h-full")}>
            <div className={cx("card")}>
              <div className={cx("py-3 px-4 flex flex-row justify-between")}>
                <h1 className={cx("text-3xl font-extrabold")}>
                  <span className={cx("num-4")} />
                  5814k<p className={cx("text-xl")}>page view</p>
                </h1>
                <div
                  className={cx(
                    "bg-teal-200 text-teal-700 border-teal-300 border w-10 h-10 rounded-full flex justify-center items-center"
                  )}
                >
                  <FontAwesomeIcon icon={faEye} />
                </div>
              </div>
              <Chart green red={false} />
            </div>
            <div className={cx("card")}>
              <div className={cx("py-3 px-4 flex flex-row justify-between")}>
                <h1 className={cx("text-3xl font-extrabold")}>
                  <span className={cx("num-2")} />
                  50k<p className={cx("text-xl")}>Unique Users</p>
                </h1>
                <div
                  className={cx(
                    "bg-indigo-200 text-indigo-700 border-indigo-300 border w-10 h-10 rounded-full flex justify-center items-center"
                  )}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
              <Chart green={false} red />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("card mt-6")}>
        <div
          className={cx("card-header border p-6 flex flex-row justify-between")}
        >
          <h1 className={cx("text-2xl font-extrabold")}>Sales Overview</h1>
          <div className={cx("flex flex-row justify-center items-center")}>
            <a href="">
              <FontAwesomeIcon
                icon={faChevronDown}
                className={cx("mr-6 text-xl")}
              />
            </a>
            <a href="">
              <FontAwesomeIcon icon={faEllipsisV} className={cx("text-xl")} />
            </a>
          </div>
        </div>

        <div className={cx("card-body grid grid-cols-2 gap-6")}>
          <div className={cx("p-8")}>
            <h1 className={cx("text-5xl font-extrabold")}>5,337</h1>
            <p className={cx("text-black text-base font-medium mt-1")}>
              Sales this month
            </p>
            <div className={cx("mt-20 mb-2 flex items-center")}>
              <div
                className={cx(
                  "py-1 h-10 px-3 flex items-center rounded bg-green-200 text-green-900 mr-3"
                )}
              >
                <FontAwesomeIcon icon={faCaretUp} className={cx("text-xl")} />
              </div>
              <p className={cx("text-black text-xl")}>
                <span className={cx("num-2 text-green-400")} />
                <span className={cx("text-green-400")}>% more sales</span> in
                comparison to last month.
              </p>
            </div>
            <div className={cx("flex items-center")}>
              <div
                className={cx(
                  "py-1 h-10 px-3 flex items-center rounded bg-red-200 text-red-900 mr-3"
                )}
              >
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <p className={cx("text-black text-xl")}>
                <span className={cx("num-2 text-red-400")} />
                <span className={cx("text-red-400")}>
                  % revenue per sale
                </span>{" "}
                in comparison to last month.
              </p>
            </div>
            <a href="#" className={cx("btn-shadow", "mt-6")}>
              view details
            </a>
          </div>
          <div className={cx("")}>
            <SaleOverview />
          </div>
        </div>
      </div>

      <div className={cx("grid grid-cols-5 gap-6")}>
        {/* card */}
        <div className={cx("card mt-6")}>
          <div className={cx("card-body flex items-center")}>
            <div
              className={cx("px-3 py-2 rounded bg-indigo-600 text-white mr-3")}
            >
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <div className={cx("flex flex-col")}>
              <h1 className={cx("text-2xl font-semibold")}>
                <span className={cx("num-2")} /> Sales
              </h1>
              <p className={cx("text-lg")}>
                <span className={cx("num-2")} /> payments
              </p>
            </div>
          </div>
        </div>

        <div className={cx("card mt-6")}>
          <div className={cx("card-body flex items-center")}>
            <div
              className={cx("px-3 py-2 rounded bg-green-600 text-white mr-3")}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <div className={cx("flex flex-col")}>
              <h1 className={cx("text-2xl font-semibold")}>
                <span className={cx("num-2")} /> Orders
              </h1>
              <p className={cx("text-lg")}>
                <span className={cx("num-2")} /> items
              </p>
            </div>
          </div>
        </div>

        <div className={cx("card mt-6 ")}>
          <div className={cx("card-body flex items-center")}>
            <div
              className={cx("px-3 py-2 rounded bg-yellow-600 text-white mr-3")}
            >
              <FontAwesomeIcon icon={faBlog} />
            </div>
            <div className={cx("flex flex-col")}>
              <h1 className={cx("text-2xl font-semibold")}>
                <span className={cx("num-2")} /> posts
              </h1>
              <p className={cx("text-lg")}>
                <span className={cx("num-2")} /> active
              </p>
            </div>
          </div>
        </div>

        <div className={cx("card mt-6 ")}>
          <div className={cx("card-body flex items-center")}>
            <div className={cx("px-3 py-2 rounded bg-red-600 text-white mr-3")}>
              <FontAwesomeIcon icon={faComment} />
            </div>
            <div className={cx("flex flex-col")}>
              <h1 className={cx("text-2xl font-semibold")}>
                <span className={cx("num-2")} /> comments
              </h1>
              <p className={cx("text-lg")}>
                <span className={cx("num-2")} /> approved
              </p>
            </div>
          </div>
        </div>

        <div className={cx("card mt-6 ")}>
          <div className={cx("card-body flex items-center")}>
            <div
              className={cx("px-3 py-2 rounded bg-pink-600 text-white mr-3")}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={cx("flex flex-col")}>
              <h1 className={cx("text-2xl font-semibold")}>
                <span className={cx("num-2")} /> memebrs
              </h1>
              <p className={cx("text-lg")}>
                <span className={cx("num-2")} /> online
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("grid grid-cols-3 gap-6 mt-6")}>
        <div className={cx("card")}>
          <div className={cx("card-header text-xl")}>Browser Stats</div>

          <div
            className={cx(
              "p-6 flex flex-row justify-between items-center text-gray-600 border-b"
            )}
          >
            <div className={cx("flex items-center")}>
              <FontAwesomeIcon icon={faChrome} className={cx("mr-4 text-xl")} />
              <h1 className={cx("text-xl")}>google chrome</h1>
            </div>
            <div>
              <span className={cx("num-2 text-xl")} />
              16%
            </div>
          </div>
          <div
            className={cx(
              "p-6 flex flex-row justify-between items-center text-gray-600 border-b"
            )}
          >
            <div className={cx("flex items-center")}>
              <FontAwesomeIcon
                icon={faFirefox}
                className={cx("mr-4 text-xl")}
              />
              <h1 className={cx("text-xl")}>firefox</h1>
            </div>
            <div>
              <span className={cx("num-2 text-xl")} />
              29%
            </div>
          </div>

          <div
            className={cx(
              "p-6 flex flex-row justify-between items-center text-gray-600 border-b"
            )}
          >
            <div className={cx("flex items-center")}>
              <FontAwesomeIcon
                icon={faIntercom}
                className={cx("mr-4 text-xl")}
              />
              <h1 className={cx("text-xl")}>internet explorer</h1>
            </div>
            <div>
              <span className={cx("num-2 text-xl")} />
              38%
            </div>
          </div>

          <div
            className={cx(
              "p-6 flex flex-row justify-between items-center text-gray-600 border-b-0"
            )}
          >
            <div className={cx("flex items-center")}>
              <FontAwesomeIcon icon={faSafari} className={cx("mr-4 text-xl")} />
              <h1 className={cx("text-xl")}>safari</h1>
            </div>
            <div>
              <span className={cx("num-2 text-xl")} />
              52%
            </div>
          </div>
          {/* end brawser */}
        </div>
        {/* end Browser Stats */}
        {/* Start Recent Sales */}
        <div className={cx("card col-span-2 ")}>
          <div className={cx("card-header text-xl")}>Recent Sales</div>
          <table className={cx("table-auto w-full text-left")}>
            <thead>
              <tr>
                <th className={cx("px-4 py-2 border-r text-xl")} />
                <th className={cx("px-4 py-2 border-r text-xl")}>product</th>
                <th className={cx("px-4 py-2 border-r text-xl")}>price</th>
                <th className={cx("px-4 py-2 text-xl")}>date</th>
              </tr>
            </thead>
            <tbody className={cx("text-gray-600")}>
              <tr>
                <td
                  className={cx(
                    "border border-l-0 px-4 py-2 text-center text-green-500"
                  )}
                >
                  <FontAwesomeIcon icon={faCircle} />
                </td>
                <td className={cx("text-lg border border-l-0 px-4 py-2")}>
                  Lightning to USB-C Adapter Lightning.
                </td>
                <td className={cx("text-lg border border-l-0 px-4 py-2")}>
                  $<span className={cx("num-2")} />
                </td>
                <td
                  className={cx(
                    "text-lg border border-l-0 border-r-0 px-4 py-2"
                  )}
                >
                  <span className={cx("num-2")} /> minutes ago
                </td>
              </tr>
              <tr>
                <td
                  className={cx(
                    "border text-lg border-l-0 px-4 py-2 text-center text-yellow-500"
                  )}
                >
                  <FontAwesomeIcon icon={faCircle} />
                </td>
                <td className={cx("border text-lg border-l-0 px-4 py-2")}>
                  Apple iPhone 8.
                </td>
                <td className={cx("border text-lg border-l-0 px-4 py-2")}>
                  $<span className={cx("num-2")} />
                </td>
                <td
                  className={cx(
                    "border text-lg border-l-0 border-r-0 px-4 py-2"
                  )}
                >
                  <span className={cx("num-2")} /> minutes ago
                </td>
              </tr>
              <tr>
                <td
                  className={cx(
                    "border border-l-0 text-lg px-4 py-2 text-center text-green-500"
                  )}
                >
                  <FontAwesomeIcon icon={faCircle} />
                </td>
                <td className={cx("border text-lg border-l-0 px-4 py-2")}>
                  Apple MacBook Pro.
                </td>
                <td className={cx("border text-lg border-l-0 px-4 py-2")}>
                  $<span className={cx("num-2")} />
                </td>
                <td
                  className={cx(
                    "border text-lg border-l-0 border-r-0 px-4 py-2"
                  )}
                >
                  <span className={cx("num-2")} /> minutes ago
                </td>
              </tr>
              <tr>
                <td
                  className={cx(
                    "border border-l-0 px-4 text-lg py-2 text-center text-red-500"
                  )}
                >
                  <FontAwesomeIcon icon={faCircle} />
                </td>
                <td className={cx("border text-lg border-l-0 px-4 py-2")}>
                  Samsung Galaxy S9.
                </td>
                <td className={cx("border text-lg border-l-0 px-4 py-2")}>
                  $<span className={cx("num-2")} />
                </td>
                <td
                  className={cx(
                    "border text-lg border-l-0 border-r-0 px-4 py-2"
                  )}
                >
                  <span className={cx("num-2")} /> minutes ago
                </td>
              </tr>
              <tr>
                <td
                  className={cx(
                    "border border-l-0 text-lg px-4 py-2 text-center text-yellow-500"
                  )}
                >
                  <FontAwesomeIcon icon={faCircle} />
                </td>
                <td className={cx("border text-lg border-l-0 px-4 py-2")}>
                  Samsung Galaxy S8 256GB.
                </td>
                <td className={cx("border text-lg border-l-0 px-4 py-2")}>
                  $<span className={cx("num-2")} />
                </td>
                <td
                  className={cx(
                    "border text-lg border-l-0 border-r-0 px-4 py-2"
                  )}
                >
                  <span className={cx("num-2")} /> minutes ago
                </td>
              </tr>
              <tr>
                <td
                  className={cx(
                    "border border-l-0 text-lg border-b-0 px-4 py-2 text-center text-green-500"
                  )}
                >
                  <FontAwesomeIcon icon={faCircle} />
                </td>
                <td
                  className={cx(
                    "border text-lg border-l-0 border-b-0 px-4 py-2"
                  )}
                >
                  apple watch.
                </td>
                <td
                  className={cx(
                    "border text-lg border-l-0 border-b-0 px-4 py-2"
                  )}
                >
                  $<span className={cx("num-2")} />
                </td>
                <td
                  className={cx(
                    "border border-l-0 text-lg border-b-0 border-r-0 px-4 py-2"
                  )}
                >
                  <span className={cx("num-2")} /> minutes ago
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* End Recent Sales */}
      </div>
      {/* end quick Info */}
    </div>
  );
}

export default Home;
