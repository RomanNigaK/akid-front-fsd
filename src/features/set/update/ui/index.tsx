import { Form, Input, Modal, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { featureStore } from '../model';
import { Set } from 'entities/set';
import { getErrorMessage } from 'shared/lib/getErrorMessage';
import { useStores } from 'app/provider/ContextProvider';
type Props = {
  editSet: Set;
};
export const UpdateSet = observer(({ editSet }: Props) => {
  const { set, setUndefined, updateSetAction } = featureStore;
  const {
    set: { getSetsAction },
  } = useStores();

  const [form] = Form.useForm<Set>();

  const [isViewForm, setIsViewForm] = useState(false);

  const onFinish = (params: Set) => {
    updateSetAction(params);
  };

  set?.case({
    fulfilled: () => {
      form.resetFields();
      getSetsAction();
      setUndefined();
    },
    rejected: async (e) => {
      const { errorText } = await getErrorMessage(e);
      message.open({ type: 'error', content: errorText });
      setUndefined();
    },
  });
  return (
    <>
      <span onClick={() => setIsViewForm(true)}>Редактировать</span>
      <Modal
        onCancel={() => setIsViewForm(false)}
        open={isViewForm}
        title="Создание комплекта"
        confirmLoading={set?.state === 'pending'}
        onOk={() => form.submit()}
        okText="Сохранить изменения"
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
          <Form.Item<Set> name="id" hidden initialValue={editSet.id}>
            <Input />
          </Form.Item>

          <Form.Item<Set>
            rules={[{ required: true }]}
            label="Наименование *"
            name="name"
            initialValue={editSet.name}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
