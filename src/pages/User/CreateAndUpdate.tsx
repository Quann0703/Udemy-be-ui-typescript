import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

import { UserType } from "./User";

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
  const formRef = useRef<any>();

  const [data, setData] = useState<UserType>({
    id: dataRaw?.id ?? 0,
    username: dataRaw?.username ?? "",
    email: dataRaw?.email ?? "",
    password: dataRaw?.password ?? "",
    fullName: dataRaw?.fullName ?? "",
    role: dataRaw?.role ?? "",
  });

  useEffect(() => {
    setData({
      id: dataRaw?.id ?? 0,
      username: dataRaw?.username ?? "",
      email: dataRaw?.email ?? "",
      password: dataRaw?.password ?? "",
      fullName: dataRaw?.fullName ?? "",
      role: dataRaw?.role ?? "",
    });
  }, [dataRaw]);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setData((prev) => ({ ...prev, [target.name as string]: target.value }));
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
          username: "",
          email: "",
          password: "",
          fullName: "",
          role: "",
        });
        setValidated(false);
      } else {
        onSave(data, "create");
        setData({
          id: 0,
          username: "",
          email: "",
          password: "",
          fullName: "",
          role: "",
        });
        setValidated(false);
      }
    }
  };

  return (
    <Modal show={isShow} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} ref={formRef}>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              value={data.username}
              name="username"
              type="text"
              placeholder="Enter your username"
              autoFocus
              required
              onChange={handleChange}
              className="fs-5"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              value={data.email}
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              className="fs-5"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              value={data.password}
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              onChange={handleChange}
              className="fs-5"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              value={data.fullName}
              name="fullName"
              type="text"
              placeholder="Enter your fullName"
              required
              onChange={handleChange}
              className="fs-5"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Select
              value={data.role}
              name="role"
              size="lg"
              onChange={handleChange}
              className="fs-5"
            >
              <option disabled value={""} className="fs-5">
                -- Chọn vai trò --
              </option>
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị</option>
            </Form.Select>
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
