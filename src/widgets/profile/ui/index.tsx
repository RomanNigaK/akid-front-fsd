import { Avatar, Flex, Space, Spin } from 'antd';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { widgetStore } from '../model';
import { ProfileMenu } from 'features/profile-menu';

export const BadgeProfile = observer(() => {
  const { getProfileAction, profile } = widgetStore;

  useEffect(() => {
    getProfileAction();
  }, []);

  if (!profile) return null;

  return profile?.case({
    fulfilled: (profile) => (
      <Flex align="center" gap={15}>
        <ProfileMenu {...profile} />
      </Flex>
    ),
    pending: () => (
      <Flex align="center">
        <Space>
          <Avatar style={{ background: '#F5F5F5' }}>
            <Spin />
          </Avatar>
        </Space>
      </Flex>
    ),
  });
});
