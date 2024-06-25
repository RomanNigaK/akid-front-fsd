import { Button, Flex, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FormProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { Content } from 'antd/es/layout/layout';
import { RequestRegistration, featureStore } from '../model';
import IconLogo from 'shared/assets/icon/logo-a.svg?react';
import { getErrorMessage } from 'shared/lib/getErrorMessage';

export const SignUp = observer(() => {
  const { registrationAction, user } = featureStore;

  const onFinish: FormProps<RequestRegistration>['onFinish'] = (values) => {
    registrationAction(values);
  };

  const navigate = useNavigate();

  user?.case({
    rejected: async (e) => {
      const { errorText } = await getErrorMessage(e);
      notification.open({
        message: 'Регистрация пользователя',
        type: 'error',
        description: errorText,
      });
    },
    fulfilled: () => navigate('/auth/success'),
  });

  return (
    <>
      <Content
        style={{
          borderRadius: '10px 0px 0px 10px',
          height: '100%',
        }}
      >
        <Flex vertical justify="space-between" style={{ height: '100%' }}>
          <div>
            <Flex align="center" style={{ height: '70px', padding: '24px' }}>
              <IconLogo />
              <div style={{ fontSize: '26px', marginLeft: '10px' }}>АКИД</div>
            </Flex>
            <Form
              name="basic"
              autoComplete="off"
              layout="vertical"
              onFinish={onFinish}
              style={{ padding: '24px' }}
            >
              <Form.Item<RequestRegistration>
                name="name"
                label="Как вас зовут?"
                rules={[{ required: true }]}
                style={{ marginBottom: '20px' }}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<RequestRegistration>
                name="sername"
                label="Ваша фамилия"
                rules={[{ required: true }]}
                style={{ marginBottom: '20px' }}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<RequestRegistration>
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email' }]}
                style={{ marginBottom: '20px' }}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<RequestRegistration>
                name="password"
                label="Придумайте пароль"
                rules={[{ required: true }]}
                style={{ marginBottom: '30px' }}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={user?.state === 'pending'}
              >
                Регистрация
              </Button>
            </Form>
          </div>
          <Flex
            style={{
              background: '#F2F9FD',
              height: '40px',
              padding: '20px',
              borderRadius: '0px 0px 0px 10px',
            }}
            justify="space-evenly"
            align="center"
          >
            <div>Есть аккаунт?</div>

            <Link to={'/auth'}>Вход</Link>
          </Flex>
        </Flex>
      </Content>
    </>
  );
});
