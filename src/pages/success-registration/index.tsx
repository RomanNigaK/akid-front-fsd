import { Button, Flex } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import IconSuccess from 'shared/assets/clipart/success.svg?react';
import IconLogo from 'shared/assets/icon/logo-a.svg?react';

export default function SuccessRegistration() {
  const handleEnterApp = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  const navigate = useNavigate();
  return (
    <>
      <Content
        style={{
          borderRadius: '10px 0px 0px 10px',
          width: '350px',
          height: '500px',
          background: '#fff',
          padding: '20px',
        }}
      >
        <Flex align="center" style={{ height: '70px', marginBottom: '50px' }}>
          <IconLogo />
          <div style={{ fontSize: '26px', marginLeft: '10px' }}>АКИД</div>
        </Flex>
        <p>Вы успешно заригистрированны в приложении</p>
        <p>
          Для компановки можно было бы еще что нить интересного тут написать
        </p>
        <Button
          type="primary"
          size="large"
          onClick={handleEnterApp}
          style={{ marginTop: '100px', width: '100%' }}
        >
          Войти в аккаунт
        </Button>
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
        <Flex justify="center" vertical>
          <Title level={4} style={{ color: '#fff' }}>
            Регистрация прошла успешно!
          </Title>
          <IconSuccess style={{ height: '300px', marginTop: '30px' }} />
        </Flex>
      </Content>
    </>
  );
}
