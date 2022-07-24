import React, { useState } from "react";
import { useLocation } from "react-router";
import { Menu, Checkbox } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";

const FilterDetail = () => {
   
  const rootSubmenuKeys = ["sub1"];
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onChangeBike = async (e) => {
    console.log(e.target.value);
  };

  const onChangeWalk = async (e) => {
    console.log(e.target.value);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("", "sub1", <MenuUnfoldOutlined />, [
      getItem(
        "En bici",
        "1",
        <Checkbox onChange={onChangeBike} value="bicicleta" />
      ),
      getItem("A pie", "2", <Checkbox onChange={onChangeWalk} value="peu" />),
    ]),
  ];
  return (
    <div>
      {" "}
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 200,
          height: 100,
          border: 0,
        }}
        items={items}
      />{" "}
    </div>
  );
};

export default FilterDetail;
