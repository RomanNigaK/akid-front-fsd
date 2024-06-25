import { Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { SignIn } from 'features/sign-in';
import IconSignIn from 'shared/assets/clipart/login.svg?react';

export default function SignInPage() {
  return (
    <>
      <Content
        style={{
          borderRadius: '10px 0px 0px 10px',
          width: '350px',
          height: '500px',
          background: '#fff',
        }}
      >
        <SignIn />
      </Content>

      <Content
        style={{
          background: '#47B3F1',
          padding: '24px',
          borderRadius: '0px 10px 10px 0px',
          height: '500px',
          width: '500px',
        }}
      >
        <Title style={{ color: '#fff', margin: '0px' }} level={4}>
          Добро пожаловать
        </Title>
        <Flex justify="center">
          <IconSignIn style={{ height: '400px' }} />
        </Flex>
      </Content>
    </>
  );
}
