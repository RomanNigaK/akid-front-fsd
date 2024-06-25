import { Flex, Layout, Space } from 'antd';
import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { MainMenu } from './MainMenu';
import { SetMenu } from './SetMenu';
import LogoIcon from 'shared/assets/icon/logo-white.svg?react';
import { BadgeProfile } from 'widgets/profile/ui';

const { Header } = Layout;

export const MainLayout: React.FC = () => {
  return (
    <Layout style={{ background: '#F4F7FE' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <Space>
            <Flex align="center" gap={10}>
              <LogoIcon style={{ height: '45px', marginRight: '30px' }} />
              <MainMenu />
            </Flex>
          </Space>

          <Space>
            <BadgeProfile />
          </Space>
        </Flex>
      </Header>
      <SetMenu />
      <Content
        style={{
          overflow: 'auto',
          height: 'calc(100vh - 150px)',
          padding: '20px',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};
