/* eslint-disable react-hooks/exhaustive-deps */
import { CheckOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Space, Upload } from 'antd';
import { FormProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
  ControlConstruction,
  entityStore,
} from 'entities/controlConstruction/model';
import { requiredRule } from 'shared/constants/formRules';
import { Person } from 'entities/person';

type Props = {
  person: Person;
};
export const FormControlConstruction = observer(({ person }: Props) => {
  const {
    createControlConstructionAction,
    updateControlConstructionAction,
    controlConstruction,
  } = entityStore;
  const [form] = Form.useForm<ControlConstruction>();

  if (!controlConstruction)
    form.setFieldsValue({ ...person?.constructionControl });

  const onFinish: FormProps<ControlConstruction>['onFinish'] = (value) => {
    if (value.id) {
      form.setFieldsValue({ ...value });
      return updateControlConstructionAction(value);
    }
    createControlConstructionAction(person.id, value);
  };

  useEffect(() => {
    if (controlConstruction?.state === 'fulfilled') {
      form.setFieldsValue({ ...controlConstruction.value });
    }
  }, [controlConstruction?.state]);

  return (
    <Form
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item<ControlConstruction>
        name="id"
        hidden
        initialValue={
          person.constructionControl?.id ||
          controlConstruction?.case({ fulfilled: (c) => c.id })
        }
      >
        <Input size="large" />
      </Form.Item>
      <Flex vertical>
        <Space>
          <Form.Item<ControlConstruction>
            name="postCompany"
            label="Должностьи компания"
            rules={requiredRule}
            style={{ width: '470px' }}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<ControlConstruction>
            name="fio"
            label="Фамилия и инициаллы"
            rules={requiredRule}
          >
            <Input size="large" />
          </Form.Item>
        </Space>
        <Space>
          <Form.Item<ControlConstruction>
            name="nrc"
            label="Номер НРС"
            tooltip="Номер реестра специалистов"
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<ControlConstruction>
            name="dataOrder"
            label="Реквизиты документа"
          >
            <Input size="large" />
          </Form.Item>
        </Space>
      </Flex>

      <Form.Item<ControlConstruction>>
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
      <Form.Item<ControlConstruction>>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          icon={<CheckOutlined />}
          loading={controlConstruction?.state === 'pending'}
        >
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
});
