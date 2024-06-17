import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { UploadOutlined } from "@ant-design/icons";

import { Button as ButtonAntd, Upload } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";

import { UserType } from "./Topic";
import MdEditor from "~/components/MdEditor";
import topicService from "~/services/topicService";

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
  const [imageUpload, setImageUpload] = useState<RcFile | null>(null);
  const [field, setField] = useState([]);
  const formRef = useRef<any>();

  const [data, setData] = useState<UserType>({
    id: dataRaw?.id ?? 0,
    fieldId: dataRaw?.fieldId ?? 0,
    title: dataRaw?.title ?? "",
    description: dataRaw?.description ?? "",
    slug: dataRaw?.slug ?? "",
    image: dataRaw?.image ?? imageUpload,
    content: dataRaw?.content ?? "",
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      image: imageUpload || prevData.image,
    }));
  }, [imageUpload]);

  const handleUploadChange = (info: UploadChangeParam) => {
    // const file = info.file.originFileObj as RcFile | undefined;
    const file = info.file as RcFile;
    if (file) {
      setImageUpload(file);
    } else {
      console.error("File is undefined");
    }
  };

  useEffect(() => {
    setData({
      id: dataRaw?.id ?? 0,
      fieldId: dataRaw?.fieldId ?? 0,
      title: dataRaw?.title ?? "",
      description: dataRaw?.description ?? "",
      slug: dataRaw?.slug ?? "",
      image: dataRaw?.image ?? "",
      content: dataRaw?.content ?? "",
    });
  }, [dataRaw]);

  useEffect(() => {
    topicService.getField().then((res) => {
      setField(res.data);
    });
  }, []);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setData((prev) => ({
      ...prev,
      [target.name as string]: target.value,
      image: imageUpload,
    }));
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
          fieldId: 0,
          title: "",
          description: "",
          slug: "",
          content: "",
          image: "",
        });
        setValidated(false);
      } else {
        onSave(data, "create");
        setData({
          id: 0,
          fieldId: 0,
          title: "",
          description: "",
          slug: "",
          content: "",
          image: "",
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
            <Form.Label>Categoy:</Form.Label>
            <Form.Select
              value={data.fieldId}
              name="fieldId"
              size="lg"
              onChange={handleChange}
              className="fs-5"
            >
              <option disabled value={""} className="fs-5">
                -- Chọn vai trò --
              </option>
              {field.map((item: any, index) => {
                return (
                  <option key={index} value={item?.id}>
                    {item?.title}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
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
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Slug:</Form.Label>
            <Form.Control
              value={data.slug}
              name="slug"
              type="text"
              placeholder="Enter your slug"
              required
              onChange={handleChange}
              className="fs-5"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Upload
              // action="http://localhost:5173/categories?page=1"
              beforeUpload={() => false}
              accept=".jpg,.jpeg,.png"
              listType="picture"
              onChange={handleUploadChange}
            >
              <ButtonAntd icon={<UploadOutlined />}>Upload</ButtonAntd>
            </Upload>
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
