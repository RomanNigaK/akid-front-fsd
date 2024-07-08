/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-debugger */
import { CheckOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Space, Upload } from 'antd';
import { FormProps } from 'antd/lib';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Person } from 'entities/person';
import { Representative, entityStore } from 'entities/representative/model';
import { requiredRule } from 'shared/constants/formRules';

type Props = {
  person: Person;
};
export const FormRepresentative = observer(({ person }: Props) => {
  const {
    representative,
    createRepresentativeAction,
    updateRepresentativeAction,
    clearRepresentative,
  } = entityStore;
  const [form] = Form.useForm<Representative>();
  if (!representative) form.setFieldsValue({ ...person?.representative });

  const onFinish: FormProps<Representative>['onFinish'] = (value) => {
    if (value.id) return updateRepresentativeAction(value);
    createRepresentativeAction(person.id, value);
  };

  useEffect(() => {
    if (representative?.state === 'fulfilled') {
      form.setFieldsValue({ ...representative.value });
    }
  }, [representative?.state]);

  useEffect(() => {
    return () => clearRepresentative();
  }, []);

  return (
    <Form
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item<Representative>
        name="id"
        hidden
        initialValue={
          person.representative?.id ||
          representative?.case({ fulfilled: (r) => r.id })
        }
      >
        <Input size="large" />
      </Form.Item>
      <Flex vertical>
        <Space>
          <Form.Item<Representative>
            name="postCompany"
            label="Должностьи компания"
            rules={requiredRule}
            style={{ width: '470px' }}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<Representative>
            name="fio"
            label="Фамилия и инициаллы"
            rules={requiredRule}
          >
            <Input size="large" />
          </Form.Item>
        </Space>
        <Space>
          <Form.Item<Representative>
            name="nrc"
            label="Номер НРС"
            tooltip="Номер реестра специалистов"
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<Representative>
            name="dataOrder"
            label="Реквизиты документа"
          >
            <Input size="large" />
          </Form.Item>
        </Space>
      </Flex>

      <Form.Item<Representative>>
        <Upload>
          <Button
            icon={<UploadOutlined />}
            size="large"
            style={{ marginTop: '13px' }}
          >
            Загрузить
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item<Representative>>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          icon={<CheckOutlined />}
          loading={representative?.state === 'pending'}
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
});
