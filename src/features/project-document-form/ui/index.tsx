import { Button, Flex, Form, Input, Space } from 'antd';

import {
  CheckOutlined,
  ClearOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { ProjectDocumentDetails, featureStore } from '../model';

type Props = {
  kitId: string;
};
export const ProjectDocumentForm = observer(({ kitId }: Props) => {
  const { details } = featureStore;
  console.log(details, kitId);
  const [form] = Form.useForm<ProjectDocumentDetails>();
  return (
    <>
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
      >
        <Flex vertical style={{ width: '400px' }}>
          <Form.Item<ProjectDocumentDetails>
            name="project"
            label="Проектная документация"
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<ProjectDocumentDetails>
            name="amountCopies"
            label="Количество копий"
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<ProjectDocumentDetails>
            name="constructionObject"
            label="Объект строительства"
          >
            <Input size="large" />
          </Form.Item>
        </Flex>

        <Form.Item>
          <Flex justify="space-between">
            <Space>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                icon={<CheckOutlined />}
              >
                Сохранить
              </Button>
              <Button size="large" icon={<ClearOutlined />}>
                Очистить поля
              </Button>
            </Space>
            <Button size="large" icon={<DeleteOutlined />} danger>
              Удалить данные
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
});
