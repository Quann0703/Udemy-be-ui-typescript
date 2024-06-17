import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Select from "react-select";

import { UserType } from "./Lesson";
import MdEditor from "~/components/MdEditor";
import lessonService from "~/services/lessonService";

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
  const [course, setCourse] = useState([]);

  const [data, setData] = useState<UserType>({
    id: dataRaw?.id ?? 0,
    courseId: dataRaw?.courseId ?? 0,
    duration: dataRaw?.duration ?? "",
    title: dataRaw?.title ?? "",
    description: dataRaw?.description ?? "",

    image: dataRaw?.image ?? "",
    content: dataRaw?.content ?? "",
    video: dataRaw?.video ?? "",
    isPublished: dataRaw?.isPublished ?? false,
  });

  useEffect(() => {
    setData({
      id: dataRaw?.id ?? 0,
      courseId: dataRaw?.courseId ?? 0,
      duration: dataRaw?.duration ?? "",
      title: dataRaw?.title ?? "",
      description: dataRaw?.description ?? "",

      image: dataRaw?.image ?? "",
      content: dataRaw?.content ?? "",
      video: dataRaw?.video ?? "",
      isPublished: dataRaw?.isPublished ?? false,
    });
  }, [dataRaw]);

  useEffect(() => {
    lessonService.getCourse().then((res) => {
      setCourse(res.data);
    });
  }, []);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSelectChange = (selectedOption: any) => {
    setData((prev) => ({ ...prev, courseId: selectedOption.value }));
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
          title: "",
          description: "",
          image: "",
          content: "",
          video: "",
          duration: "",
          isPublished: false,
        });
        setValidated(false);
      } else {
        onSave(data, "create");
        setData({
          id: 0,
          courseId: 0,
          title: "",
          description: "",
          image: "",
          content: "",
          video: "",
          duration: "",
          isPublished: false,
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

  return (
    <Modal show={isShow} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} ref={formRef}>
          <Form.Group className="mb-3">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              value={data.title}
              name="title"
              type="text"
              placeholder="Enter your title"
              autoFocus
              required
              onChange={handleChange}
              className="fs-5"
            />
          </Form.Group>
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
            <Form.Label>Description:</Form.Label>
            <Form.Control
              value={data.description}
              name="description"
              type="text"
              placeholder="Enter your description"
              required
              onChange={handleChange}
              className="fs-5"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid description.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duration:</Form.Label>
            <Form.Control
              value={data.duration}
              name="duration"
              type="text"
              placeholder="Enter your duration"
              required
              onChange={handleChange}
              className="fs-5"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Video:</Form.Label>
            <Form.Control
              value={data.video}
              name="video"
              type="text"
              placeholder="Enter your video"
              required
              onChange={handleChange}
              className="fs-5"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Publish:</Form.Label>
            <Form.Select
              value={data.isPublished ? "1" : "0"}
              name="isPublished"
              size="lg"
              onChange={handleChange}
              className="fs-5"
            >
              <option disabled value={""} className="fs-5">
                -- Chọn phát hành --
              </option>
              <option value="1">Phát hành</option>
              <option value="0">Chưa phát hành</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content:</Form.Label>
            <MdEditor
              value={data.content}
              onchangeValue={(value) =>
                setData((prev) => ({ ...prev, content: value ?? "" }))
              }
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
