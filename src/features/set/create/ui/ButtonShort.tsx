import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { featureStore } from '../model';
import { ModalCreate } from './ModalCreate';

export const ButtonShort = () => {
  const { setIsViewForm } = featureStore;

  return (
    <>
      <Button
        size="large"
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsViewForm(true)}
      >
        Создать комплект
      </Button>
      <ModalCreate />
    </>
  );
};
