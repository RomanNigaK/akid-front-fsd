import { Flex, Form, Input, InputNumber, Modal, Select } from 'antd';
import { FormProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { WorkRequest, featureStore } from '../model';
import { requiredRule } from 'shared/constants/formRules';
import { units } from 'shared/constants/enums';
import { useStores } from 'app/provider/ContextProvider';

export const WorkEditForm = observer(() => {
  const {
    work: { setWorkEdit, workUpdateDelete },
  } = useStores();
  const { isViewModal, setIsViewModal, updateWorkAction, update } =
    featureStore;
  const [form] = Form.useForm<WorkRequest>();
  form.setFieldsValue({ ...workUpdateDelete });
  const onFinish: FormProps<WorkRequest>['onFinish'] = (values) => {
    if (workUpdateDelete) updateWorkAction(values, workUpdateDelete.id);
  };

  useEffect(() => {
    setIsViewModal(workUpdateDelete ? true : false);
  }, [workUpdateDelete, setIsViewModal]);

  update?.case({ fulfilled: () => form.resetFields() });
  return (
    <Modal
      open={isViewModal}
      onCancel={() => setWorkEdit(undefined)}
      title="Редактирование"
      okText="Сохранить"
    >
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        autoComplete="off"
        requiredMark={false}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item<WorkRequest>
          label="Наименование *"
          name="name"
          rules={requiredRule}
        >
          <Input size="large" />
        </Form.Item>
        <Flex justify="start" gap={10}>
          <Form.Item<WorkRequest>
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
          <Form.Item<WorkRequest>
            label="Количество *"
            name="amount"
            rules={requiredRule}
          >
            <InputNumber size="large" style={{ width: '150px' }} />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
});
