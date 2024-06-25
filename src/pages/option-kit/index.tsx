import { Card, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { DeveloperForm } from 'features/developer-form';
import { ProjectDocumentForm } from 'features/project-document-form';

export const OptionKitPage = observer(() => {
  const { kitId } = useParams();

  if (!kitId) return null;
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Застройщик (заказчик)',
      children: <DeveloperForm kitId={kitId} />,
    },
    {
      key: '2',
      label: 'Лицо, осуществляющее строительство',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Лицо, выполнившее работы монтажная организация',
      children: 'Contfent of Tab Pane 3',
    },
    {
      key: '4',
      label: 'Лицо, осуществляющее проектирование',
      children: 'Conteffnt of Tab Pane 3',
    },
    {
      key: '5',
      label: 'Эксплотирующая организация',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '6',
      label: 'Сведения о проектной документации',
      children: <ProjectDocumentForm kitId={kitId} />,
    },
  ];
  return (
    <>
      <Card title="Представители">
        <Tabs tabPosition="left" items={items} />
      </Card>
    </>
  );
});
