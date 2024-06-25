import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';

import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { getProfileUrl } from 'app/router';

type ProfileMenuProps = {
  name: string;
  lastName: string;
  email: string;
  imageName?: string;
};

export const ProfileMenu = observer(
  ({ name, imageName, email }: ProfileMenuProps) => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: <Link to={getProfileUrl()}>Профиль пользоваетя</Link>,
        icon: <UserOutlined />,
      },
      {
        key: '2',
        label: 'Удалить учетную запись',
        icon: <DeleteOutlined />,
        danger: true,
      },
    ];
    return (
      <>
        <Dropdown trigger={['hover']} menu={{ items }}>
          <Avatar size={40} src={`/image/${imageName}`}>
            {!imageName && `${name.charAt(0)}${name.charAt(1)}`}
          </Avatar>
        </Dropdown>
        <div style={{ color: '#fff' }}>
          <div style={{ height: '20px' }}>{name}</div>
          <div>{email}</div>
        </div>
      </>
    );
  }
);
