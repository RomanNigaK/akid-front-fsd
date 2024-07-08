import {
  DeleteOutlined,
  EllipsisOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, Flex, Form, Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { MenuProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { requiredRule } from 'shared/constants/formRules';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: ' Удалиить профиль',
    icon: <DeleteOutlined />,
    danger: true,
  },
];

export const ProfilePage = observer(() => {
  return (
    <Flex justify="center">
      <Card
        style={{ width: '400px' }}
        title={
          <Flex justify="space-between">
            <Title level={5} style={{ margin: '0px' }}>
              Профиль пользователя
            </Title>
            <Dropdown trigger={['click']} menu={{ items }}>
              <EllipsisOutlined />
            </Dropdown>
          </Flex>
        }
      >
        <Flex align="center" vertical>
          <Avatar size={150} />
          <Space style={{ marginTop: '10px' }}>
            <Button icon={<UploadOutlined />} type="primary" />
            <Button icon={<DeleteOutlined />} />
          </Space>
        </Flex>
        <Form style={{ marginTop: '50px' }} layout="vertical">
          <Form.Item label="Имя" rules={requiredRule}>
            <Input size="large" />
          </Form.Item>
          <Form.Item label="Фамилия" rules={requiredRule}>
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
});
