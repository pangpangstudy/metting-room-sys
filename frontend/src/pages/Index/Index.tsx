import React from "react";
import { Link, Outlet } from "react-router-dom";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import "./Index.scss";

type Props = {};

const Index = (props: Props) => {
  return (
    <div id="index-container">
      <div className="header">
        <h1>会议室预定系统</h1>
        <Link to={"/update_info"}>
          <UserOutlined className="icon" />
        </Link>
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default Index;
