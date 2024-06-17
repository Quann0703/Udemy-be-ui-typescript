import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { UserType } from "./Invoice";

import registerService from "~/services/registerService";

type CreateAndUpdateProps = {
  dataRaw: UserType | undefined;
  isShow: boolean;
  onSave: (data: any, type: string) => void;
  onClose: () => void;
};

function CreateAndUpdate({
  dataRaw,
  isShow,
  onSave,
  onClose,
}: CreateAndUpdateProps) {
  const [validated, setValidated] = useState(false);
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState([]);
  const formRef = useRef<any>();

  const [data, setData] = useState<UserType>({
    id: dataRaw?.id ?? 0,
    courseId: dataRaw?.courseId ?? 0,
    userId: dataRaw?.userId ?? 0,
    total: dataRaw?.total ?? 0,
    status: dataRaw?.status ?? "",
    description: dataRaw?.description ?? "",
  });

  useEffect(() => {
    setData({
      id: dataRaw?.id ?? 0,
      courseId: dataRaw?.courseId ?? 0,
      userId: dataRaw?.userId ?? 0,
      total: dataRaw?.total ?? 0,
      status: dataRaw?.status ?? "",
      description: dataRaw?.description ?? "",
    });
  }, [dataRaw]);

  useEffect(() => {
    registerService.getCourse().then((res) => {
      setCourse(res.data);
    });
  }, []);

  useEffect(() => {
    registerService.getUser().then((res) => {
      setUser(res.data);
    });
  }, []);

  // const handleChange = (e: SyntheticEvent) => {
  //   const target = e.target as HTMLInputElement;
  //   setData((prev) => ({ ...prev, [target.name as string]: target.value }));
  //   console.log(target.value);
  // };

  const handleSelectChange = (selectedOption: any) => {
    setData((prev) => ({ ...prev, courseId: selectedOption.value }));
  };

  const handleSelectChangeUser = (selectedOption: any) => {
    setData((prev) => ({ ...prev, userId: selectedOption.value }));
  };

  const handleSave = (e: SyntheticEvent) => {
    e.preventDefault();

    if (formRef.current.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      if (dataRaw) {
        onSave(data, "update");
        setData({
          id: 0,
          courseId: 0,
          userId: 0,
          status: "",
          total: 0,
          description: "",
        });
        setValidated(false);
      } else {
        onSave(data, "create");
        setData({
          id: 0,
          courseId: 0,
          userId: 0,
          status: "",
          total: 0,
          description: "",
        });
        setValidated(false);
      }
    }
  };
  const customStyles = {
    option: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const formattedOptions = course.map((item: any) => ({
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

  const formattedOptionsUser = user.map((item: any) => ({
    value: item.id,
    label: <div className="d-flex align-items-center">{item.username}</div>,
  }));

  return (
    <Modal show={isShow} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} ref={formRef}>
          <Form.Group className="mb-3">
            <Form.Label>Course:</Form.Label>
            <Select
              value={formattedOptions.find(
                (opt) => opt.value === data.courseId
              )}
              options={formattedOptions}
              styles={customStyles}
              onChange={handleSelectChange}
              name="courseId"
              className="fs-5"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>User:</Form.Label>
            <Select
              value={formattedOptionsUser.find(
                (opt) => opt.value === data.userId
              )}
              options={formattedOptionsUser}
              styles={customStyles}
              onChange={handleSelectChangeUser}
              name="userId"
              className="fs-5"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button type="submit" variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateAndUpdate;
