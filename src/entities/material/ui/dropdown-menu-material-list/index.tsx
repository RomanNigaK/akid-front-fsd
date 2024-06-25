import {
  ClearOutlined,
  DeleteFilled,
  EditFilled,
  MoreOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { useStores } from 'app/provider/ContextProvider';
import { Material } from 'entities/material/model';

type Props = {
  material: Material;
};

export const DropdownMenuMaterialList = ({ material }: Props) => {
  const {
    material: { setMaterialEdit },
  } = useStores();
  const items: MenuProps['items'] = [
    {
      key: '2',
      label: ' Редактировать',
      icon: <EditFilled />,
      onClick: () => setMaterialEdit(material),
    },
    {
      key: '3',
      label: 'Удалить подчиненные документы',
      icon: <ClearOutlined />,
    },
    {
      key: '1',
      label: ' Удалить',
      danger: true,
      icon: <DeleteFilled />,
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <MoreOutlined />
    </Dropdown>
  );
};
