import { Menu } from 'antd';
import { MenuProps } from 'antd/lib';
import { useNavigate } from 'react-router-dom';
import { useStores } from 'app/provider/ContextProvider';
import { MainMenuItemsType } from 'shared/constants/enums';

export const MainMenu = () => {
  const {
    set: { clearCurrentSet },
  } = useStores();
  const navigate = useNavigate();
  const itemsMainMenuName = {
    [MainMenuItemsType.set]: 'Комплекты',
    [MainMenuItemsType.employee]: 'Сотрудники',
  };
  const mainMenuItems: MenuProps['items'] = [
    {
      key: MainMenuItemsType.set,
      label: itemsMainMenuName[MainMenuItemsType.set],
      onClick: () => {
        clearCurrentSet();
        navigate('/');
      },
    },
    {
      key: MainMenuItemsType.employee,
      label: itemsMainMenuName[MainMenuItemsType.employee],
    },
  ];
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[MainMenuItemsType.set]}
      items={mainMenuItems}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};
