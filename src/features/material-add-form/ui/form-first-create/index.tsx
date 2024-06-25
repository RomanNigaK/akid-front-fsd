import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { FormProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { MaterialRequest, featureStore } from '../../model';
import IconEmptySet from 'shared/assets/clipart/empty-set.svg?react';
import { units } from 'shared/constants/enums';
import { requiredRule } from 'shared/constants/formRules';

type Props = {
  kitId: string;
};
export const FormFirstCreate = observer(({ kitId }: Props) => {
  const { createMaterialAction, material } = featureStore;
  const [form] = Form.useForm<MaterialRequest>();
  const onFinish: FormProps<MaterialRequest>['onFinish'] = (values) => {
    console.log(values);
    createMaterialAction(values, kitId);
  };

  material?.case({ fulfilled: () => form.resetFields() });
  return (
    <Card
      title="Добавте использованные материалы"
      style={{ marginTop: '100px' }}
    >
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
            <Form.Item<MaterialRequest>
              label="Наименование *"
              name="name"
              rules={requiredRule}
            >
              <Input size="large" />
            </Form.Item>
            <Flex justify="space-between">
              <Form.Item<MaterialRequest>
                label="Ед. изм. *"
                name="unit"
                initialValue={units[0].value}
                rules={requiredRule}
              >
                <Select
                  options={units}
                  defaultValue={units[0]}
                  size="large"
                  style={{ width: '150px' }}
                />
              </Form.Item>
              <Form.Item<MaterialRequest>
                label="Количество *"
                name="amount"
                rules={requiredRule}
              >
                <InputNumber size="large" style={{ width: '150px' }} />
              </Form.Item>
            </Flex>
            <Form.Item<MaterialRequest> name="equipment" initialValue={false}>
              <Checkbox>Оборудование</Checkbox>
            </Form.Item>
            <Button
              loading={material?.state === 'pending'}
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
