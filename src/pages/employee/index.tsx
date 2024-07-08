import { Button, Card, Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { UsergroupAddOutlined } from '@ant-design/icons';
import IconEmployee from 'shared/assets/clipart/empty-employee.svg?react';

export const Employee = observer(() => {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ paddingTop: '100px' }}
    >
      <Card title="В вашей команде нет участников">
        <Flex
          vertical
          style={{ width: '800px' }}
          justify="center"
          align="center"
        >
          <IconEmployee style={{ height: '300px' }} />
          <Button
            type="primary"
            size="large"
            icon={<UsergroupAddOutlined />}
            style={{ width: '150px' }}
          >
            Пригласить
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
});
