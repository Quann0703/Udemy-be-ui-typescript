import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Invoice.module.scss";
import CreateAndUpdate from "./CreateAndUpdate";
import Delete from "./Delete";
import Pagination from "~/components/Pagination";
import invoiceService from "~/services/invoiceService";
import { formatCurrency } from "~/utils/formatCurrency";

const cx = classnames.bind(styles);

type DataType = {
  data: any[];
  rows: any[];
  count: any;
};

export type UserType = {
  id: number;
  courseId: number;
  userId: number;
  total: number;
  description: string;
  status: string;
};

function Invoice() {
  const [data, setData] = useState<DataType>();
  const [dataRaw, setDataRaw] = useState<UserType | undefined>();
  const [show, setShow] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [searchParams] = useSearchParams();
  const [id, setId] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (Number(searchParams.get("page")) > 0 && !(show || isShowDelete)) {
      invoiceService
        .getInvoices({ page: Number(searchParams.get("page")) })
        .then((res) => {
          setData(res.data);
        });
    }
  }, [searchParams, show, isShowDelete]);
  console.log(data);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setDataRaw(undefined);
    setShow(true);
  };

  const handleEdit = (item: any) => {
    setDataRaw(item);
    setShow(true);
  };

  const handleDelete = (itemId: number) => {
    setId(itemId);
    setIsShowDelete(true);
  };

  const handleSave = (data: any, type: string) => {
    if (type === "create") {
      invoiceService
        .createInvoices(data)
        .then((res) => {
          toast.success("Tao thanh cong!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setShow(false);
        })
        .catch((err) => console.log(err));
    } else if (type === "update") {
      invoiceService
        .updateInvoices(data, data.id)
        .then((res) => {
          toast.success("Sua thanh cong!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setShow(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOKDelete = () => {
    invoiceService
      .deleteInvoices(id)
      .then((res) => {
        toast.success("Xoa thanh cong", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error("Xoa that bai!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    setId(0);
    setIsShowDelete(false);
  };

  return (
    <div className={cx("wrapper")}>
      <Container className="my-4">
        <Row className="mb-3">
          <Col>
            <h3 className="fs-2 fw-bold">Invoice</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                <Card.Title className="mb-0">Invoice Table</Card.Title>
                <Button variant="primary" onClick={handleShow}>
                  +
                </Button>
              </Card.Header>
              <Card.Body>
                <Table hover responsive className="align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Course</th>
                      <th>User</th>
                      <th>Total</th>
                      <th>Order At</th>
                      <th>Create At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.rows.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="d-flex justify-content-center">
                          <img
                            src={item["course.image"]}
                            alt="image"
                            className="img-thumbnail rounded "
                          />
                        </td>
                        <td>{item["user.username"]}</td>
                        <td>{formatCurrency(item.total)}</td>
                        <td>{new Date(item.orderAt).toLocaleString()}</td>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="warning"
                              className="me-2"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              className="me-2"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => navigate(`/receipt?id=${item.id}`)}
                            >
                              Receipt
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination
                  className="d-flex justify-content-end mt-3"
                  total={data?.count}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <CreateAndUpdate
          dataRaw={dataRaw}
          isShow={show}
          onSave={handleSave}
          onClose={handleClose}
        />
        <Delete
          isShow={isShowDelete}
          onOk={handleOKDelete}
          onClose={() => setIsShowDelete(false)}
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
        />
      </Container>
    </div>
  );
}

export default Invoice;
