import React from "react";
import classNames from "classnames/bind";
import MDEditor from "@uiw/react-md-editor";

import styles from "./MdEditor.module.scss";

interface Props {
  value: string;
  onchangeValue: (value?: string) => void;
}

const cx = classNames.bind(styles);

const MdEditor: React.FC<Props> = ({ value, onchangeValue }) => {
  return (
    <div className={cx("container")}>
      <MDEditor
        value={value}
        onChange={onchangeValue}
        preview="edit"
        hideToolbar={false}
        textareaProps={{
          placeholder: "Bạn muốn nhập nội dung như thế nào",
        }}
      />
    </div>
  );
};

export default MdEditor;
