import { Form, Input, Modal, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { featureStore } from '../model';
import { useStores } from 'app/provider/ContextProvider';
import { Set } from 'entities/set';
import { getErrorMessage } from 'shared/lib/getErrorMessage';

export const ModalCreate = observer(() => {
  const { isViewForm, set, setIsViewForm, createSetAction, setUndefined } =
    featureStore;
  const {
    set: { getSetsAction },
  } = useStores();
  const [form] = Form.useForm<Set>();

  const onFinish = (params: Set) => {
    createSetAction(params);
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
      <Modal
        onCancel={() => setIsViewForm(false)}
        open={isViewForm}
        title="Создание комплекта"
        confirmLoading={set?.state === 'pending'}
        onOk={() => form.submit()}
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
          <Form.Item<Set> label="Наименование *" name="name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
