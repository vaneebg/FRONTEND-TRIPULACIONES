import { UserOutlined,MenuUnfoldOutlined,ReconciliationOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
  
import {Link} from 'react-router-dom'
import Routes from './Routes/Routes';


const Main = () => {
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
        getItem( '', 'sub1', <MenuUnfoldOutlined />, [
          getItem('', '1', <Link to='/profile'><UserOutlined /></Link>),
          getItem('', '2', <Link to='/quiz'><ReconciliationOutlined /></Link>),
        //   getItem('Option 3', '3'),
        //   getItem('Option 4', '4'),
        ]),
    ]
      
      const rootSubmenuKeys = ['sub1'];
      const [openKeys, setOpenKeys] = useState(['sub1']);

      const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      };      

  return (<>
  
  <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 150,
      }}
      items={items}
    />
      <Routes/>
      </>
    );
  };
    

export default Main