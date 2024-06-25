import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { Flex } from 'antd';
import IconSignUp from 'shared/assets/clipart/signup.svg?react';
import { SignUp } from 'features/sign-up';

export default function SignUpPage() {
  return (
    <>
      <Content
        style={{
          borderRadius: '10px 0px 0px 10px',
          width: '350px',
          height: '600px',
          background: '#fff',
        }}
      >
        <SignUp />
      </Content>

      <Content
        style={{
          background: '#47B3F1',
          padding: '24px',
          borderRadius: '0px 10px 10px 0px',
          height: '600px',
          width: '500px',
        }}
      >
        <Title style={{ color: '#fff', margin: '0px' }} level={4}>
          Здравствуйте!
        </Title>
        <Flex justify="center">
          <IconSignUp style={{ height: '400px' }} />
        </Flex>
      </Content>
    </>
  );
}
