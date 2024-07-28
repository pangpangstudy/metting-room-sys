import { Button, Input, message } from "antd";
import { baseURL } from "../api/interfaces";
import type { UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

interface HeadPicUploadProps {
  value?: string;
  onChange?: Function;
}
let onChange: Function;
const props: UploadProps = {
  name: "file",
  action: `${baseURL}/user/upload`,
  onChange(info) {
    const { status } = info.file;
    if (status === "done") {
      console.log(info.file);
      onChange("http://localhost:3000/" + info.file.response.data);
      message.success(`${info.file.name} 文件上传成功`);
    } else if (status === "error") {
      message.error(`${info.file.name} 文件上传失败`);
    }
  },
};
const dragger = (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或者拖拽到这个区域上传</p>
  </Dragger>
);
export function HeadPicUpload(props: HeadPicUploadProps) {
  onChange = props.onChange!;
  console.log(props.value);
  return props?.value ? (
    <div>
      <img src={props.value} alt="头像" width="100" height="100" />
      {dragger}
    </div>
  ) : (
    <div>{dragger}</div>
  );
}
