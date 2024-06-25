import { Button, Form, Input } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { Inn, featureStore } from '../model';
import { requiredRule } from 'shared/constants/formRules';

export const ParseInn = observer(() => {
  const { data } = featureStore;
  console.log(data);
  const [form] = Form.useForm<Inn>();
  return (
    <>
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<Inn>
          name="inn"
          label="ИНН организации"
          rules={requiredRule}
          tooltip={
            'Автоматический заполнение данных, если данные не найдены, заполните в ручную'
          }
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            style={{ width: '100%' }}
          >
            Поиск
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});
