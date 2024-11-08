import React from "react";
import { Layout as AntLayout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  ProfileOutlined,
  InfoCircleOutlined,
  HeartOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./layout.css";

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/login");
  };

  const userMenu = [
    { name: "Home", path: "/", icon: <HomeOutlined /> },
    { name: "Poojas", path: "/poojas", icon: <CalendarOutlined /> },
    { name: "Pooja Schedules", path: "/admin/pandiths", icon: <CalendarOutlined /> },
    { name: "Profile", path: "/profile", icon: <ProfileOutlined /> },
    { name: "About", path: "/about", icon: <InfoCircleOutlined /> },
    { name: "Map", path: "/map", icon: <EnvironmentOutlined /> },
    { name: "Donation", path: "/donation", icon: <HeartOutlined /> },
    { name: "Main", path: "/main", icon: <HeartOutlined /> },
    { name: "DharshanPage", path: "/dharshan", icon: <HeartOutlined /> },
  ];

  const adminMenu = [
    { name: "Home", path: "/", icon: <HomeOutlined /> },
    { name: "Users", path: "/admin/users", icon: <UserOutlined /> },
    { name: "Pooja Schedules", path: "/admin/pandiths", icon: <CalendarOutlined /> },
    { name: "Profile", path: "/profile", icon: <ProfileOutlined /> },
    { name: "About", path: "/about", icon: <InfoCircleOutlined /> },
    { name: "Map", path: "/map", icon: <EnvironmentOutlined /> },
    { name: "Donation", path: "/donation", icon: <HeartOutlined /> },
    { name: "Main", path: "/main", icon: <HeartOutlined /> },
    { name: "DharshanPage", path: "/dharshan", icon: <HeartOutlined /> },
  ];

  const pandithMenu = [
    { name: "Home", path: "/", icon: <HomeOutlined /> },
    { name: "Poojas", path: "/pandith/poojas", icon: <CalendarOutlined /> },
    { name: "Pooja Schedules", path: "/admin/pandiths", icon: <CalendarOutlined /> },
    { name: "Profile", path: `/pandith/profile/${user?._id}`, icon: <ProfileOutlined /> },
    { name: "About", path: "/about", icon: <InfoCircleOutlined /> },
    { name: "Map", path: "/map", icon: <EnvironmentOutlined /> },
    { name: "Donation", path: "/donation", icon: <HeartOutlined /> },
    { name: "Main", path: "/main", icon: <HeartOutlined /> },
    { name: "DharshanPage", path: "/dharshan", icon: <HeartOutlined /> },
  ];

  const menuToBeRendered = user && user.isAdmin ? adminMenu : user?.isPandith ? pandithMenu : userMenu;

  return (
    <AntLayout>
      <Header className="navbar">
        <div className="navbar-title">
          <img src="https://cdn-icons-png.flaticon.com/128/3336/3336130.png" alt="Logo" className="navbar-logo" />
          Temple Management System
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
          {menuToBeRendered.map((menu, index) => (
            <Menu.Item key={menu.path} icon={menu.icon}>
              <Link to={menu.path}>{menu.name}</Link>
            </Menu.Item>
          ))}
          <Menu.Item key="logout" onClick={handleLogout} icon={<UserOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Temple Management System ©2023</Footer>
    </AntLayout>
  );
};

export default Layout;
