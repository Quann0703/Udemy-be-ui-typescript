import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Receipt.module.scss";
import images from "~/assets/images";
import { useSearchParams } from "react-router-dom";
import invoiceService from "~/services/invoiceService";
import { formatCurrency } from "~/utils/formatCurrency";

const cx = classNames.bind(styles);

export type UserType = {
  id: number;
  courseId: number;
  userId: number;
  total: number;
  title: string;
  status: string;
  createdAt: any;
  username: string;
  user: any;
  course: any;
  email: string;
};

function Receipt() {
  const [data, setData] = useState<UserType>();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const invoiceId = Number(searchParams.get("id"));
      if (!isNaN(invoiceId)) {
        setLoading(true);
        setError(null);
        try {
          const res = await invoiceService.getInvoiceId(invoiceId); // Truyền số invoiceId trực tiếp
          setData(res.data);
        } catch (error) {
          console.error("Error fetching invoice:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [searchParams]);

  console.log(data);
  console.log(data?.user.username);

  const printInvoice = () => {
    window.print();
  };
  return (
    <div className={cx("invoice-wrapper")} id="print-area">
      <div className={cx("invoice")}>
        <div className={cx("invoice-container")}>
          <div className={cx("invoice-head")}>
            <div className={cx("invoice-head-top")}>
              <div className={cx("invoice-head-top-left text-start")}>
                <img src={images.logo} />
              </div>
              <div className={cx("invoice-head-top-right text-end")}>
                <h3>Invoice</h3>
              </div>
            </div>
            <div className={cx("hr")} />
            <div className={cx("invoice-head-middle")}>
              <div className={cx("invoice-head-middle-left text-start")}>
                <p>
                  <span className={cx("text-bold")}>Date</span>:{" "}
                  {data?.createdAt}
                </p>
              </div>
              <div className={cx("invoice-head-middle-right text-end")}>
                <p>
                  <span className={cx("text-bold")}>Invoice No:{data?.id}</span>
                </p>
              </div>
            </div>
            <div className={cx("hr")} />
            <div className={cx("invoice-head-bottom")}>
              <div className={cx("invoice-head-bottom-left")}>
                <ul>
                  <li className={cx("text-bold")}>Invoiced To:</li>
                  <li>Udemy Inc.</li>
                  <li>600 Harrison St, San Francisco, CA</li>
                  <li>Orange, CA 89438</li>
                  <li>contact@udemy.com</li>
                </ul>
              </div>
              <div className={cx("invoice-head-bottom-right")}>
                <ul className={cx("text-end")}>
                  <li className={cx("text-bold")}>Pay To:</li>
                  <li>{data?.user.username}</li>
                  <li>{data?.user.email}</li>
                  <li>HP12 3JL</li>
                  <li>VietNam</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={cx("overflow-view")}>
            <div className={cx("invoice-body")}>
              <table>
                <thead>
                  <tr>
                    <td className={cx("text-bold")}>Description</td>
                    <td className={cx("text-bold")}>Rate</td>
                    <td className={cx("text-bold")}>QTY</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data?.course.title}</td>
                    <td>{formatCurrency(data?.course.price)}</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
              <div className={cx("invoice-body-bottom")}>
                <div className={cx("invoice-body-info-item border-bottom")}>
                  <div className={cx("info-item-td text-end text-bold")}>
                    Sub Total:
                  </div>
                  <div className={cx("info-item-td text-end")}>
                    {formatCurrency(data?.total)}
                  </div>
                </div>
                <div className={cx("invoice-body-info-item border-bottom")}>
                  <div className={cx("info-item-td text-end text-bold")}>
                    Tax:
                  </div>
                  <div className={cx("info-item-td text-end")}>0</div>
                </div>
                <div className={cx("invoice-body-info-item")}>
                  <div className={cx("info-item-td text-end text-bold")}>
                    Total:
                  </div>
                  <div className={cx("info-item-td text-end")}>
                    {formatCurrency(data?.total)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("invoice-foot text-center")}>
            <p>
              <span className={cx("text-bold text-center")}>NOTE:&nbsp;</span>
              This is computer generated receipt and does not require physical
              signature.
            </p>
            <div className={cx("invoice-btns")}>
              <button
                type="button"
                className={cx("invoice-btn")}
                onClick={printInvoice}
              >
                <span>
                  <i className={cx("fa-solid fa-print")} />
                </span>
                <span>Print</span>
              </button>
              <button type="button" className={cx("invoice-btn")}>
                <span>
                  <i className={cx("fa-solid fa-download")} />
                </span>
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Receipt;
