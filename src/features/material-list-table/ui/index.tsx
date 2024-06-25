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
import { EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { getErrorMessage } from 'shared/lib/getErrorMessage';
import { useStores } from 'app/provider/ContextProvider';
import { DropdownMenuMaterialList, Material } from 'entities/material';
import { CloudUpload } from 'shared/ui/CloudUpload';
import { Unit } from 'shared/constants/enums';

type Props = {
  kitId: string;
  selectMaterial: Dispatch<SetStateAction<Material | undefined>>;
};
export const MaterialList = observer(({ kitId, selectMaterial }: Props) => {
  const {
    material: { getMaterialsAction, materials },
    file: { setIsViewDrawerFileList, setIsViewDrawerUpload },
  } = useStores();

  const columns: TableColumnsType<Material> = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: () => (
        <Space>
          Документы
          <Tooltip
            placement="topLeft"
            title="Сертификаты паспорта и прочие сопутствующие докумнты"
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </Space>
      ),
      colSpan: 2,
      dataIndex: 'attchment',
      key: 'attchment',
      width: 75,
      align: 'center',
      render: (_, record) => (
        <>
          <CloudUpload
            onclick={() => {
              selectMaterial(record), setIsViewDrawerUpload(true);
            }}
            amount={record.files?.length}
          />
        </>
      ),
    },
    {
      dataIndex: 'file_list',
      key: 'file_list',
      width: 75,
      colSpan: 0,
      align: 'center',
      render: (_, record) => (
        <>
          {record.files && (
            <EllipsisOutlined
              onClick={() => {
                setIsViewDrawerFileList(true);
                selectMaterial(record);
              }}
            />
          )}
        </>
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
      title: 'Оборуд.',
      dataIndex: 'equipment',
      key: 'equipment',
      width: 100,
      align: 'center',
    },
    {
      align: 'right',
      width: 100,
      dataIndex: 'action',
      key: 'unit',
      render: (_, record) => <DropdownMenuMaterialList material={record} />,
    },
  ];
  useEffect(() => {
    if (!materials) getMaterialsAction(kitId);
  }, []);

  materials?.case({
    rejected: async (e) => {
      const { errorText } = await getErrorMessage(e);
      notification.open({
        message: 'Ведомость работ',
        description: errorText,
        type: 'error',
      });
    },
  });

  return materials?.case({
    fulfilled: (materials) => (
      <Table
        bordered
        sticky
        rowKey="id"
        columns={columns}
        dataSource={materials}
        pagination={false}
        scroll={{ y: 'calc(100vh - 480px)' }}
      />
    ),
    pending: () => <Skeleton active />,
  });
});
