import { Checkbox, Flex, Form, Input, InputNumber, Modal, Select } from 'antd';
import { FormProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { MaterialRequest, featureStore } from '../model';
import { requiredRule } from 'shared/constants/formRules';
import { units } from 'shared/constants/enums';
import { useStores } from 'app/provider/ContextProvider';

export const MaterialEditForm = observer(() => {
  const {
    material: { materialUpdateDelete, setMaterialEdit },
  } = useStores();
  const { isViewModal, setIsViewModal, updateMaterialAction, update } =
    featureStore;
  const [form] = Form.useForm<MaterialRequest>();
  form.setFieldsValue({ ...materialUpdateDelete });
  const onFinish: FormProps<MaterialRequest>['onFinish'] = (values) => {
    if (materialUpdateDelete)
      updateMaterialAction(values, materialUpdateDelete.id);
  };

  useEffect(() => {
    setIsViewModal(materialUpdateDelete ? true : false);
  }, [materialUpdateDelete, setIsViewModal]);

  update?.case({ fulfilled: () => form.resetFields() });
  return (
    <Modal
      open={isViewModal}
      onCancel={() => setMaterialEdit(undefined)}
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
        <Form.Item<MaterialRequest>
          label="Наименование *"
          name="name"
          rules={requiredRule}
        >
          <Input size="large" />
        </Form.Item>
        <Flex justify="start" gap={10}>
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
      </Form>
    </Modal>
  );
});
