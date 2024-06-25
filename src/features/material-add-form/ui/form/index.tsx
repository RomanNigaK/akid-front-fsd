import { Button, Checkbox, Flex, Form, Input, InputNumber, Select } from 'antd';
import { FormProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { MaterialRequest, featureStore } from '../../model';
import { units } from 'shared/constants/enums';
import { requiredRule } from 'shared/constants/formRules';

type Props = {
  kitId: string;
};
export const AddMaterial = observer(({ kitId }: Props) => {
  const { addMaterialAction, material } = featureStore;
  const [form] = Form.useForm<MaterialRequest>();
  const onFinish: FormProps<MaterialRequest>['onFinish'] = (values) => {
    addMaterialAction(values, kitId);
  };

  material?.case({ fulfilled: () => form.resetFields() });
  return (
    <Form
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
    >
      <Flex gap={10} align="flex-end" style={{ width: '100%' }}>
        <Form.Item<MaterialRequest>
          name="name"
          label="Наименование"
          style={{ width: '100%' }}
          rules={requiredRule}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item<MaterialRequest>
          name="unit"
          label="Ед. изм."
          rules={requiredRule}
          initialValue={units[0].value}
        >
          <Select style={{ width: 150 }} options={units} size="large" />
        </Form.Item>
        <Form.Item<MaterialRequest>
          name="amount"
          label="Количество"
          rules={requiredRule}
        >
          <InputNumber style={{ width: 150 }} size="large" />
        </Form.Item>
        <Form.Item<MaterialRequest> name="equipment">
          <Checkbox>Оборуд.</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={material?.state === 'pending'}
          >
            Добавить
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
});
