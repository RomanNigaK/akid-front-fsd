import { Button, Card, Col, Form, Input, Row, message } from 'antd';
import { featureStore } from '../../model';
import { useStores } from 'app/provider/ContextProvider';
import { Set } from 'entities/set';
import { getErrorMessage } from 'shared/lib/getErrorMessage';
import IconEmptySet from 'shared/assets/clipart/empty-set.svg?react';

export const FormFirstCreate = () => {
  const { set, createSetAction, setUndefined } = featureStore;
  const {
    set: { getSetsAction },
  } = useStores();
  const [form] = Form.useForm<Set>();

  const onFinish = (params: Set) => {
    createSetAction(params);
  };

  set?.case({
    fulfilled: () => {
      form.resetFields();
      getSetsAction();
      setUndefined();
    },
    rejected: async (e) => {
      const { errorText } = await getErrorMessage(e);
      message.open({ type: 'error', content: errorText });
      setUndefined();
    },
  });
  return (
    <Card title="У вас нет созданных комплектов">
      <Row style={{ width: '700px' }}>
        <Col span={12}>
          <Form
            name="basic"
            form={form}
            initialValues={{ remember: true }}
            autoComplete="off"
            requiredMark={false}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item<Set> label="Наименование *" name="name">
              <Input size="large" />
            </Form.Item>
            <Button
              loading={set?.state === 'pending'}
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
};
