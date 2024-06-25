import { Flex } from 'antd';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { FormFirstCreate } from 'features/capture-create-form';

export const CapturePage = observer(() => {
  const { kitId } = useParams();

  if (!kitId) return null;

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ paddingTop: '100px' }}
    >
      <FormFirstCreate kitId={kitId} />
    </Flex>
  );
});
