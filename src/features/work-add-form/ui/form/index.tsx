import { Button, Flex, Form, Input, InputNumber, Select } from 'antd';
import { FormProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { WorkRequest, featureStore } from '../../model';
import { units } from 'shared/constants/enums';
import { requiredRule } from 'shared/constants/formRules';

type Props = {
  kitId: string;
};
export const AddWork = observer(({ kitId }: Props) => {
  const { addWorkAction, work } = featureStore;
  const [form] = Form.useForm<WorkRequest>();
  const onFinish: FormProps<WorkRequest>['onFinish'] = (values) => {
    console.log(values);
    addWorkAction(values, kitId);
  };

  work?.case({ fulfilled: () => form.resetFields() });
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
        <Form.Item<WorkRequest>
          name="name"
          label="Наименование"
          style={{ width: '100%' }}
          rules={requiredRule}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item<WorkRequest>
          name="unit"
          label="Ед. изм."
          initialValue={units[0].value}
          rules={requiredRule}
        >
          <Select
            style={{ width: 150 }}
            options={units}
            size="large"
            onSelect={(e) => console.log(e)}
          />
        </Form.Item>
        <Form.Item<WorkRequest>
          name="amount"
          label="Количество"
          rules={requiredRule}
        >
          <InputNumber style={{ width: 150 }} size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={work?.state === 'pending'}
          >
            Добавить
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
});
