import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  
  function SideMenu() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
  
    useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(pathName);
    }, [location.pathname]);
  
    const navigate = useNavigate();
    return (
      <div className="SideMenu">
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: "Dashbaord",
              icon: <AppstoreOutlined />,
              key: "/ACPDashboard",
            },
            {
              label: "Overall Analysis",
              key: "/inventory",
              icon: <ShopOutlined />,
            },
            {
              label: "District Wise Analysis",
              key: "/orders",
              icon: <ShoppingCartOutlined />,
            },
            {
              label: "Resource Management",
              key: "/customers",
              icon: <UserOutlined />,
            },
            {
              label: "Calendar",
              key: "/calendar",
              icon: <AppstoreOutlined />,
            },
            {
              label: "Unit",
              key: "/unit",
              icon: <ShopOutlined />,
            }
          ]}
        ></Menu>
      </div>
    );
  }
  export default SideMenu;