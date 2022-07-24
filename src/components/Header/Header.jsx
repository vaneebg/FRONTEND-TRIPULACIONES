import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  ReconciliationOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import './Header.scss';


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
        '3',
        <Link to='/main'>
          <HomeOutlined /> Rutas
        </Link>
      ),
      getItem(
        '',
        '2',
        <Link to='/quiz'>
          <ReconciliationOutlined /> Recomendación
        </Link>
      ),
      getItem(
        '',
        '1',
        <Link to='/profile'>
          <UserOutlined /> Perfil
        </Link>
      ),
      getItem(
        '',
        '4',
        <Link to='/aboutUs'>
          <UsergroupAddOutlined /> Sobre nosotros
        </Link>
      ),
    ]),
  ];

  return (
    <div className='menu'>
      <Menu
        mode='inline'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 200,
          height: 100,
          border: 0,
        }}
        items={items}
      />
    </div>
  );
};

export default Header;
