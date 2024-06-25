import {
  ClearOutlined,
  DeleteFilled,
  EditFilled,
  MoreOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { useStores } from 'app/provider/ContextProvider';
import { Work } from 'entities/work/model';

type Props = {
  work: Work;
};

export const DropdownMenuWorklList = ({ work }: Props) => {
  const {
    work: { setWorkEdit },
  } = useStores();
  const items: MenuProps['items'] = [
    {
      key: '2',
      label: ' Редактировать',
      icon: <EditFilled />,
      onClick: () => setWorkEdit(work),
    },
    {
      key: '3',
      label: 'Удалить связанные материаллы',
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
