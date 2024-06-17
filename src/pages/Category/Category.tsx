import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RcFile } from "antd/es/upload";

import styles from "./Category.module.scss";
import CreateAndUpdate from "./CreateAndUpdate";
import Delete from "./Delete";
import Pagination from "~/components/Pagination";
import categoryService from "~/services/categoryService";

const cx = classnames.bind(styles);

type DataType = {
  data: any[];
  rows: any[];
  count: any;
};

export type UserType = {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string | RcFile | null;
  content: string;
};

function Category() {
  const [data, setData] = useState<DataType>();
  const [dataRaw, setDataRaw] = useState<UserType | undefined>();
  const [show, setShow] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [searchParams] = useSearchParams();

  const [id, setId] = useState<number>(0);

  console.log(data?.rows);

  useEffect(() => {
    if (Number(searchParams.get("page")) > 0 && !(show || isShowDelete)) {
      categoryService
        .getCategories({ page: Number(searchParams.get("page")) })
        .then((res) => {
          setData(res.data);
        });
    }
  }, [searchParams, show, isShowDelete]);

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
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (type === "create") {
      categoryService
        .createCategories(data)
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
      categoryService
        .updateCategories(data, data.id)
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
    categoryService
      .deleteCategories(id)
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
            <h3 className="fs-2 fw-bold">Category</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mb-4">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                <Card.Title className="mb-0 fs-4">Category Table</Card.Title>
                <Button variant="primary" onClick={handleShow}>
                  +
                </Button>
              </Card.Header>
              <Card.Body>
                <Table hover responsive className="align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Slug</th>
                      <th>Image</th>
                      <th>Content</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.rows.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.slug}</td>
                        <td>
                          <img
                            src={item.image}
                            alt="image"
                            className="img-thumbnail rounded"
                          />
                        </td>
                        <td>{item.content}</td>
                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                        <td>
                          <Button
                            variant="warning"
                            className="me-2"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
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
          dataCategory={data?.rows}
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

export default Category;
