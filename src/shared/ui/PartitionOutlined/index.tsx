import { PartitionOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Amount } from './styled';

type Props = {
  onclick: () => void;
  amount?: number;
};
export const Partition = ({ onclick, amount }: Props) => {
  return (
    <Space>
      <PartitionOutlined onClick={onclick} />
      {amount && <Amount>{amount}</Amount>}
    </Space>
  );
};
