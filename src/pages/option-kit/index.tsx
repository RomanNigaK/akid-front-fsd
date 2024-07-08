import { Button, Card, Flex, Space, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { Developer } from './developer';
import { Construction } from './construction';
import { PerformedSubjectInspection } from './performedSubjectInspection';
import { PreparationProjectDocumentation } from './preparationProjectDocumentation';
import { Exploit } from './exploit';
import { ProjectDocumentForm } from 'features/project-document-form';

export const OptionKitPage = observer(() => {
  const { kitId } = useParams();

  if (!kitId) return null;
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Застройщик (заказчик)',
      children: <Developer kitId={kitId} />,
    },
    {
      key: '2',
      label: 'Лицо, осуществляющее строительство',
      children: <Construction kitId={kitId} />,
    },
    {
      key: '3',
      label: 'Лицо, выполнившее работы монтажная организация',
      children: <PerformedSubjectInspection kitId={kitId} />,
    },
    {
      key: '4',
      label: 'Лицо, осуществляющее проектирование',
      children: <PreparationProjectDocumentation kitId={kitId} />,
    },
    {
      key: '5',
      label: 'Эксплотирующая организация',
      children: <Exploit kitId={kitId} />,
    },
    {
      key: '6',
      label: 'Сведения о проектной документации',
      children: <ProjectDocumentForm kitId={kitId} />,
    },
  ];
  return (
    <>
      <Card
        title={
          <Flex justify="space-between">
            <Space>Компании и их представители</Space>
            <Button size="large" icon={<DeleteOutlined />} danger>
              Удалить
            </Button>
          </Flex>
        }
      >
        <Tabs tabPosition="left" items={items} destroyInactiveTabPane />
      </Card>
    </>
  );
});
