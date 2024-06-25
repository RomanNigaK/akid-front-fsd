/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import {
  Skeleton,
  Space,
  Table,
  TableColumnsType,
  Tooltip,
  notification,
} from 'antd';
import {
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Work } from 'entities/work';
import { getErrorMessage } from 'shared/lib/getErrorMessage';
import { useStores } from 'app/provider/ContextProvider';
import { Unit } from 'shared/constants/enums';
import { Partition } from 'shared/ui/PartitionOutlined';
import { DropdownMenuWorklList } from 'entities/work/ui';

type Props = {
  kitId: string;
  selectWork: Dispatch<SetStateAction<Work | undefined>>;
};

export const WorkList = observer(({ kitId, selectWork }: Props) => {
  const {
    work: { works, getWorksAction },
  } = useStores();

  const columns: TableColumnsType<Work> = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: () => (
        <Space>
          Исп. мат.
          <Tooltip
            placement="topLeft"
            title="Перечень материалов для производства робот"
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </Space>
      ),
      dataIndex: 'material',
      key: 'material',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <Partition onclick={() => selectWork(record)} amount={record.count} />
      ),
    },
    {
      title: 'Ед. изм.',
      dataIndex: 'unit',
      key: 'unit',
      width: 150,
      align: 'center',

      render: (_, record) => Unit[record.unit],
    },

    {
      title: 'Количество',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      align: 'center',
    },
    {
      align: 'right',
      width: 100,
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => <DropdownMenuWorklList work={record} />,
    },
  ];

  useEffect(() => {
    if (!works) getWorksAction(kitId);
  }, []);

  works?.case({
    rejected: async (e) => {
      const { errorText } = await getErrorMessage(e);
      notification.open({
        message: 'Ведомость работ',
        description: errorText,
        type: 'error',
      });
    },
  });

  return works?.case({
    fulfilled: (works) => (
      <Table
        sticky
        rowKey="id"
        columns={columns}
        dataSource={works}
        pagination={false}
        scroll={{ y: 'calc(100vh - 480px)' }}
      />
    ),
    pending: () => <Skeleton active />,
  });
});
