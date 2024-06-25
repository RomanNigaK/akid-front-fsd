import { Button, Flex, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import ClipartError from 'shared/assets/clipart/error.svg?react';

export default function SetNotFound() {
  const navigate = useNavigate();
  return (
    <Flex
      justify="center"
      style={{ marginTop: '100px' }}
      vertical
      align="center"
    >
      <ClipartError style={{ width: '300px' }} />
      <Title level={4}>Комплект не найден</Title>
      <p>Возможно комплект документов был удален или отправлен в архив.</p>
      <Space size={10}>
        <Button type="primary" size="large" onClick={() => navigate('/')}>
          Перейти к списку комплектов
        </Button>
      </Space>
    </Flex>
  );
}
