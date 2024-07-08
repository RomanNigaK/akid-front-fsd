import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { FormProps } from 'antd/lib';
import { Person } from 'entities/person/model/types';
import { TypePerson } from 'shared/constants/enums';
import { requiredRule } from 'shared/constants/formRules';

type Props = {
  type: TypePerson;
  kitId: string;
  person?: Person;
  loading: boolean;
  create: (kitId: string, person: Person, type: TypePerson) => void;
  update: (person: Person) => void;
};
export const FormPerson = ({
  kitId,
  person,
  loading,
  create,
  update,
  type,
}: Props) => {
  const [form] = Form.useForm<Person>();
  form.setFieldsValue({ ...person });
  const onFinish: FormProps<Person>['onFinish'] = (values) => {
    if (person) return update(values);
    create(kitId, values, type);
  };

  if (!person) form.resetFields();

  return (
    <Form
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
      style={{ width: '400px' }}
    >
      <Form.Item<Person> name="id" label="Наименование организации" hidden>
        <Input size="large" />
      </Form.Item>
      <Form.Item<Person>
        name="inn"
        label="ИНН"
        tooltip="Поск данных компании по ИНН"
      >
        <Space.Compact>
          <Input size="large" />
          <Button type="primary" icon={<SearchOutlined />} size="large">
            Поиск
          </Button>
        </Space.Compact>
      </Form.Item>
      <Form.Item<Person>
        name="name"
        label="Наименование организации"
        rules={requiredRule}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item<Person> name="data" label="Полные данные" rules={requiredRule}>
        <TextArea style={{ width: '500px', height: '120px' }} />
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          icon={<CheckOutlined />}
          disabled={loading}
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};
