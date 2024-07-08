import { Menu } from 'antd';
import { MenuProps } from 'antd/lib';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileTextOutlined,
  FolderOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useStores } from 'app/provider/ContextProvider';
import { MainMenuItemsType } from 'shared/constants/enums';
import { getEmployeeUrl, getTemplateUrl } from 'app/router';

export const MainMenu = () => {
  const {
    set: { clearCurrentSet },
  } = useStores();
  const navigate = useNavigate();
  const itemsMainMenuName = {
    [MainMenuItemsType.set]: 'Комплекты',
    [MainMenuItemsType.employee]: 'Сотрудники',
    [MainMenuItemsType.template]: 'Шаблоны актов',
  };
  const mainMenuItems: MenuProps['items'] = [
    {
      key: MainMenuItemsType.set,
      label: itemsMainMenuName[MainMenuItemsType.set],
      onClick: () => {
        clearCurrentSet();
        navigate('/');
      },
      icon: <FolderOutlined />,
    },
    {
      key: MainMenuItemsType.employee,
      label: (
        <Link to={getEmployeeUrl()}>
          {itemsMainMenuName[MainMenuItemsType.employee]}
        </Link>
      ),
      icon: <TeamOutlined />,
    },
    {
      key: MainMenuItemsType.template,
      label: (
        <Link to={getTemplateUrl()}>
          {itemsMainMenuName[MainMenuItemsType.template]}
        </Link>
      ),
      icon: <FileTextOutlined />,
    },
  ];
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[MainMenuItemsType.set]}
      items={mainMenuItems}
      style={{ flex: 1, minWidth: 0, width: '500px' }}
    />
  );
};
