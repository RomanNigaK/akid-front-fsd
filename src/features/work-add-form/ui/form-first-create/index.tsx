import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd';
import { FormProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { WorkRequest, featureStore } from '../../model';
import IconEmptySet from 'shared/assets/clipart/empty-set.svg?react';
import { requiredRule } from 'shared/constants/formRules';
import { units } from 'shared/constants/enums';

type Props = {
  setId: string;
};
export const FormFirstCreate = observer(({ setId }: Props) => {
  const { createWorkAction, create } = featureStore;
  const [form] = Form.useForm<WorkRequest>();
  const onFinish: FormProps<WorkRequest>['onFinish'] = (values) => {
    createWorkAction(values, setId);
  };

  return (
    <Card title="Добавте проведенные работы" style={{ marginTop: '100px' }}>
      <Row style={{ width: '700px' }}>
        <Col span={12}>
          <Form
            name="basic"
            form={form}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item<WorkRequest>
              label="Наименование"
              name="name"
              rules={requiredRule}
            >
              <Input size="large" />
            </Form.Item>
            <Space>
              <Form.Item<WorkRequest>
                name="unit"
                label="Ед. изм."
                rules={requiredRule}
                initialValue={units[0].value}
              >
                <Select
                  style={{ width: 150 }}
                  options={units}
                  size="large"
                  defaultValue={units[0].value}
                />
              </Form.Item>
              <Form.Item<WorkRequest>
                label="Количество"
                name="amount"
                rules={requiredRule}
              >
                <InputNumber size="large" style={{ width: '100%' }} />
              </Form.Item>
            </Space>
            <Button
              loading={create?.state === 'pending'}
              type="primary"
              size="large"
              htmlType="submit"
            >
              Создать
            </Button>
          </Form>
        </Col>
        <Col span={12}>
          <IconEmptySet style={{ width: '400px' }} />
        </Col>
      </Row>
    </Card>
  );
});
