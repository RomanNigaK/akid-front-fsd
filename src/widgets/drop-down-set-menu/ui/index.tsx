import {
  DeleteOutlined,
  EllipsisOutlined,
  SignatureOutlined,
} from '@ant-design/icons';
import { Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';
import { Set } from 'entities/set';
import { UpdateSet } from 'features/set';

type DropdownMenuSetProps = {
  set: Set;
};

export const DropdownMenuSet = ({ set }: DropdownMenuSetProps) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <UpdateSet editSet={set} />,
      icon: <SignatureOutlined />,
    },
    {
      key: '2',
      label: 'Удалить',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <EllipsisOutlined />
    </Dropdown>
  );
};
