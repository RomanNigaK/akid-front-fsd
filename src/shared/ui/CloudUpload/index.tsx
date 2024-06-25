import { CloudUploadOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Amount } from './styled';

type Props = {
  onclick: () => void;
  amount?: number;
};
export const CloudUpload = ({ onclick, amount }: Props) => {
  return (
    <Space>
      <CloudUploadOutlined onClick={onclick} />
      {amount && <Amount>{amount}</Amount>}
    </Space>
  );
};
