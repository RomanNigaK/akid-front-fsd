import { Layout, Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F4F7FE',
        }}
      >
        <Flex justify="space-evenly" align="center">
          <Outlet />
        </Flex>
      </Content>
    </Layout>
  );
};
