import { Card, Flex, Space, Tabs, Tooltip } from 'antd';
import { TabsProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Standart } from './standart';

export const Template = observer(() => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Системные',
      children: <Standart />,
    },
    {
      key: '2',
      label: (
        <>
          Пользовательские (ЯСПШ)
          <Tooltip title="ЯСПШ: язык формирования пользовательских актов">
            <QuestionCircleOutlined style={{ marginLeft: '5px' }} />
          </Tooltip>
        </>
      ),
      children: 'sdf',
    },
  ];
  return (
    <>
      <Card
        title={
          <Flex justify="space-between">
            <Space>Шаблоны актов, приложений, ведомостей</Space>
          </Flex>
        }
      >
        <Tabs items={items} />
      </Card>
    </>
  );
});
