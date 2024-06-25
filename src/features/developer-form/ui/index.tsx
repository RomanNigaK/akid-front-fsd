import { Button, Col, Flex, Form, Input, Row, Space, Tabs, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
  CheckOutlined,
  ClearOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { FormProps } from 'antd/lib';
import { Developer, featureStore } from '../model';
import { requiredRule } from 'shared/constants/formRules';
import { ParseInn } from 'features/parse-company-inn';
import { TypePerson } from 'shared/constants/enums';

type Props = {
  kitId: string;
};
export const DeveloperForm = observer(({ kitId }: Props) => {
  const { developer } = featureStore;
  console.log(kitId, developer);
  
  const [form] = Form.useForm<Developer>();
  form.setFieldValue('type', TypePerson.developer);

  const onFinish: FormProps<Developer>['onFinish'] = () => {};
  return (
    <>
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row>
          <Col span={16}>
            <Form.Item<Developer>
              name={['person', 'name']}
              label="Наименование организации"
              rules={requiredRule}
            >
              <Input size="large" style={{ width: '500px' }} />
            </Form.Item>
            <Form.Item<Developer>
              name={['person', 'data']}
              label="Полные данные"
              rules={requiredRule}
            >
              <TextArea style={{ width: '500px', height: '120px' }} />
            </Form.Item>
          </Col>
          <Col span={3} />
          <Col span={5} style={{ paddingLeft: '20px' }}>
            <ParseInn />
          </Col>
        </Row>
        <br />
        <Tabs
          items={[
            {
              key: '1',
              label: 'Представитель',
              children: (
                <Flex vertical>
                  <Space>
                    <Form.Item<Developer>
                      name={['person', 'representative', 'postCompany']}
                      label="Должностьи компания"
                      rules={requiredRule}
                    >
                      <Input size="large" style={{ width: '500px' }} />
                    </Form.Item>
                    <Form.Item<Developer>
                      name={['person', 'representative', 'fio']}
                      label="Фамилия и инициаллы"
                      rules={requiredRule}
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Space>
                  <Space>
                    <Form.Item<Developer>
                      name={['person', 'representative', 'nrc']}
                      label="Номер НРС"
                      tooltip="Номер реестра специалистов"
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item<Developer>
                      name={['person', 'representative', 'order']}
                      label="Реквизиты документа"
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Space>
                  <Space>
                    <Upload>
                      <Button
                        icon={<UploadOutlined />}
                        size="large"
                        style={{ marginTop: '13px' }}
                      >
                        Загрузить
                      </Button>
                    </Upload>
                  </Space>
                </Flex>
              ),
            },
            { key: '2', label: 'Строительный контроль', disabled: true },
          ]}
        />
        <br />
        <br />
        <Form.Item>
          <Flex justify="space-between">
            <Space size={10}>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                icon={<CheckOutlined />}
              >
                Сохранить
              </Button>
              <Button size="large" icon={<ClearOutlined />}>
                Очистить форму
              </Button>
            </Space>
            <Button size="large" icon={<DeleteOutlined />} danger>
              Удалить
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
});
