import React from "react";
import Select from "react-select";
import classnames from "classnames/bind";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  Form,
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Lesson.module.scss";
import CreateAndUpdate from "./CreateAndUpdate";
import Delete from "./Delete";
import Pagination from "~/components/Pagination";
import lessonService from "~/services/lessonService";

const cx = classnames.bind(styles);

type DataType = {
  data: any[];
  rows: any[];
  count: any;
};

export type UserType = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  image: string;
  isPublished: boolean;
  video: string;
  content: string;
  duration: string;
};

function Lesson() {
  const [data, setData] = useState<DataType>();
  const [dataRaw, setDataRaw] = useState<UserType | undefined>();
  const [option, setOption] = useState([]);
  const [show, setShow] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [course, setCourse] = useState(searchParams.get("course") || "");
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (Number(searchParams.get("page")) > 0 && !(show || isShowDelete)) {
      lessonService
        .getLessonByCourseId({
          page: Number(searchParams.get("page")),
          courseId: Number(searchParams.get("course")),
        })
        .then((res) => {
          console.log(res);
          setData(res.data);
        });
    }
  }, [searchParams, show, isShowDelete]);

  console.log(searchParams);

  useEffect(() => {
    lessonService.getCourse().then((res) => {
      setOption(res.data);
    });
  }, []);

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

  const handleChangeCourse = (selectedOption: any) => {
    setCourse(selectedOption.value);
    setSearchParams((params) => {
      params.set("course", selectedOption.value);
      return params;
    });
  };

  const handleSave = (data: any, type: string) => {
    if (type === "create") {
      lessonService
        .createLesson(data)
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
      lessonService
        .updateLesson(data, data.id)
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
    lessonService
      .deleteLesson(id)
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

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const formattedOptions = option.map((item: any) => ({
    value: item.id,
    label: (
      <div className="d-flex align-items-center">
        <img
          src={item.image}
          alt="image"
          className="img-thumbnail rounded"
          style={{ width: "70px", height: "50px", marginRight: "10px" }}
        />
        {item.title}
      </div>
    ),
  }));

  return (
    <div className={cx("wrapper")}>
      <Container className="my-4">
        <Row className="mb-3">
          <Col>
            <h3 className="fs-2 fw-bold">Lesson</h3>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Course:</Form.Label>
              <Select
                value={formattedOptions.find((opt) => opt.value === course)}
                onChange={handleChangeCourse}
                options={formattedOptions}
                styles={customStyles}
                name="courseId"
                className="fs-5"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                <Card.Title className="mb-0">Course Table</Card.Title>
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
                      <th>Duration</th>
                      <th>Image</th>
                      <th>Publish</th>
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
                        <td>{item.duration}</td>
                        <td>
                          <img
                            src={item.image}
                            alt="image"
                            className="img-thumbnail rounded"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                          />
                        </td>
                        <td>{item.isPublished ? "Yes" : "No"}</td>
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
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
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

export default Lesson;
