import { Drawer, Dropdown, Spin, Table, TableColumnsType } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { DeleteFilled, EditFilled, EllipsisOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd/lib';
import { FileType } from 'entities/file/model';
import { useStores } from 'app/provider/ContextProvider';
import { Material } from 'entities/material';

type Props = {
  material: Material;
};

export const DrawerFileList = observer(({ material }: Props) => {
  const {
    file: {
      getFilesByMaterialIdAction,
      files,
      setIsViewDrawerFileList,
      isViewDrawerFileList,
    },
  } = useStores();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Удалить',
      icon: <DeleteFilled />,
    },
    {
      key: '2',
      label: 'Редектировать',
      icon: <EditFilled />,
    },
  ];
  const columns: TableColumnsType<FileType> = [
    {
      title: 'Наименование документа',
      dataIndex: 'originalName',
      key: 'originalName',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      width: 150,
      align: 'center',
      render: () => '-',
    },
    {
      title: 'Кол-во страниц',
      dataIndex: 'amount_page',
      key: 'amount_page',
      width: 150,
      align: 'center',
      render: () => '-',
    },
    {
      align: 'right',
      width: 50,
      dataIndex: 'action',
      key: 'unit',
      render: () => (
        <Dropdown menu={{ items }} trigger={['click']}>
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    getFilesByMaterialIdAction(material.id);
  }, [getFilesByMaterialIdAction, material.id]);

  return (
    <Drawer
      width={800}
      open={isViewDrawerFileList}
      title="Детали подгруженных документов"
      destroyOnClose
      onClose={() => setIsViewDrawerFileList(false)}
    >
      {files?.case({
        fulfilled: (files) => (
          <Table
            dataSource={files}
            columns={columns}
            pagination={false}
            style={{ border: '1px solid #F0F0F0' }}
          />
        ),
        pending: () => <Spin />,
      })}
    </Drawer>
  );
});
