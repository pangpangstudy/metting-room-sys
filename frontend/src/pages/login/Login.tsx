import { Button, Form, Input, message } from "antd";
import "./login.scss";
import { login } from "../../api/interfaces";
interface LoginUser {
  username: string;
  password: string;
}
const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
const onFinish = async (values: LoginUser) => {
  const res = await login(values.username, values.password);
  // console.log(res);
  const { message: msg, code, data } = res.data;
  if (res.status === 201 || res.status === 200) {
    message.success("登录成功");
    localStorage.setItem("access_token", data.accessToken);
    localStorage.setItem("refresh_token", data.refreshToken);
    localStorage.setItem("user_info", JSON.stringify(data.userInfo));
  } else {
    message.error(res.data.data || "系统繁忙，请稍后再试");
  }
};
export function Login() {
  return (
    <div id="login-container">
      <h1>会议室预定系统</h1>
      <Form
        name="login"
        {...layout1}
        onFinish={onFinish}
        // 禁用浏览器的自动填充功能。
        autoComplete="off"
        // 去掉 label 后的冒号
        colon={false}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...layout2}>
          <div className="links">
            <a href="">创建账号</a>
            <a href="/updatePassword">忘记密码</a>
          </div>
        </Form.Item>
        <Form.Item {...layout2}>
          <Button className="btn" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
