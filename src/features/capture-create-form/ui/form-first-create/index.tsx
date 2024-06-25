import { NodeExpandOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import IconEmptySet from 'shared/assets/clipart/create-capture.svg?react';

type Props = {
  kitId: string;
};
export const FormFirstCreate = observer(({ kitId }: Props) => {
  console.log(kitId);
  return (
    <Card title="Создайте первую захватку">
      <Row style={{ width: '700px' }}>
        <Col span={12}>
          <Button type="primary" size="large" icon={<NodeExpandOutlined />}>
            Состав захватки
          </Button>
        </Col>
        <Col span={12}>
          <IconEmptySet style={{ width: '400px' }} />
        </Col>
      </Row>
    </Card>
  );
});
