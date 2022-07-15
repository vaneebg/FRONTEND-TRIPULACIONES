import {
  UserOutlined,
  MenuUnfoldOutlined,
  ReconciliationOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Routes from '../Main/Routes/Routes';

const Header = () => {
  const rootSubmenuKeys = ['sub1'];
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const { pathname } = useLocation();
  if (pathname === '/' || pathname === '/register') return null;

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
    getItem('', 'sub1', <MenuUnfoldOutlined />, [
      getItem(
        '',
        '1',
        <Link to='/profile'>
          <UserOutlined />
        </Link>
      ),
      getItem(
        '',
        '2',
        <Link to='/quiz'>
          <ReconciliationOutlined />
        </Link>
      ),
      getItem(
        '',
        '3',
        <Link to='/main'>
          <HomeOutlined />
        </Link>
      ),
      //   getItem('Option 4', '4'),
    ]),
  ];

  return (
    <>
      <Menu
        mode='inline'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 150,
        }}
        items={items}
      />
      <Routes />
    </>
  );
};

export default Header;
