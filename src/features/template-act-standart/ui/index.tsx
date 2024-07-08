import { Button, Spin, Table, TableProps, Tag } from 'antd';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { Template, featureStore } from '../model';

const columns: TableProps<Template>['columns'] = [
  {
    title: ' Наименование',
    dataIndex: 'name',
  },
  {
    title: 'Тег',
    width: 100,
    dataIndex: 'teg',
    render: (_, { abbreviation }) => (
      <Tag key={abbreviation}>{abbreviation.toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Тип',
    width: 100,
    dataIndex: 'type',
  },
  {
    title: 'Примечание',
    width: 200,
    dataIndex: 'note',
  },
  {
    width: 100,
    key: 'action',
    render: () => (
      <Button type="text" icon={<CloudDownloadOutlined />}>
        Скачать
      </Button>
    ),
  },
];

export const TemplateListStandart = observer(() => {
  const { getTemplatesAction, template } = featureStore;
  useEffect(() => {
    if (!template) getTemplatesAction();
  }, [getTemplatesAction, template]);

  if (!template) return null;

  return template?.case({
    fulfilled: (data) => (
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
      />
    ),
    pending: () => <Spin />,
  });
});
