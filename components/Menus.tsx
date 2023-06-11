import {
  AntCloudOutlined,
  BugOutlined,
  SettingOutlined,
  UserSwitchOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import React, {useState} from 'react';

type MenuItem = Required<MenuProps>['items'][number];

function itemBuilder(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  itemBuilder('百家讲坛', 'BaijiaJiangtan', <AntCloudOutlined />, [
    itemBuilder('教师管理', '1'),
    itemBuilder('系列管理', '2'),
    itemBuilder('章节管理', '3'),
  ]),
  itemBuilder('日志管理', 'Logs', <BugOutlined />, [
    itemBuilder('日志管理', '4'),
  ]),
  itemBuilder('用户管理', 'People', <UserSwitchOutlined />, [
    itemBuilder('用户管理', '5'),
    itemBuilder('评论管理', '6'),
  ]),
  itemBuilder('合作生态', 'Welcome', <WhatsAppOutlined />, [
    itemBuilder('商城管理', '7'),
  ]),
  itemBuilder('通知公告', 'Notification', <SettingOutlined />, [
    itemBuilder('通知公告', '8'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = [
  'BaijiaJiangtan',
  'Logs',
  'People',
  'Welcome',
  'Notification',
];

interface MenusProps {
  onMenuPress: (menu: any) => void;
}

const Menus: React.FC<MenusProps> = props => {
  const {onMenuPress} = props;
  const [openKeys, setOpenKeys] = useState([...rootSubmenuKeys]);

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{width: 256}}
      items={items}
      onClick={onMenuPress}
    />
  );
};

export default Menus;
