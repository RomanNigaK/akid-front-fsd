import { Button, Flex, Form, FormProps, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Content } from 'antd/es/layout/layout';
import { LoginReguest, featureStore } from '../model';
import { getErrorMessage } from 'shared/lib/getErrorMessage';
import IconLogo from 'shared/assets/icon/logo-a.svg?react';

export const SignIn = observer(() => {
  const { loginAction, auth } = featureStore;
  const onFinish: FormProps<LoginReguest>['onFinish'] = (values) => {
    loginAction(values);
  };
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginReguest>();

  auth?.case({
    rejected: async (e) => {
      const { errorText } = await getErrorMessage(e);
      form.setFields([{ name: 'password', errors: [errorText] }]);
    },
  });

  useEffect(() => {
    if (auth?.state === 'fulfilled') navigate('/');
  }, [auth?.state, navigate]);

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
              name="signin"
              autoComplete="off"
              layout="vertical"
              onFinish={onFinish}
              form={form}
              style={{ padding: '24px' }}
            >
              <Form.Item<LoginReguest>
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email' }]}
                style={{ marginBottom: '30px' }}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item<LoginReguest>
                label="Пароль"
                name="password"
                rules={[{ required: true }]}
                style={{ marginBottom: '30px' }}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                loading={auth?.state === 'pending'}
              >
                Войти
              </Button>
            </Form>
            <Link
              to={'/auth/registration'}
              style={{ height: '70px', padding: '24px' }}
            >
              Восстановить пароль
            </Link>
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
            <div>У вас нет аккаунта?</div>

            <Link to={'/auth/registration'}>Регистрация</Link>
          </Flex>
        </Flex>
      </Content>
    </>
  );
});
