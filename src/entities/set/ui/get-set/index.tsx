/* eslint-disable react-hooks/exhaustive-deps */
import { Spin, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { FolderOpenOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from 'shared/lib/getErrorMessage';
import { useStores } from 'app/provider/ContextProvider';
import { getMaterialUrl } from 'app/router';
type Props = {
  setId: string;
};
export const GetSet = observer(({ setId }: Props) => {
  const {
    set: { getCurrentSet, currentSet },
  } = useStores();

  const navigate = useNavigate();

  currentSet?.case({
    rejected: async (e) => {
      const { errorText } = await getErrorMessage(e);
      message.open({ type: 'error', content: errorText });
    },
  });
  useEffect(() => {
    if (currentSet?.state === 'fulfilled')
      navigate(getMaterialUrl(currentSet.value.id));
  }, [currentSet?.state]);
  return (
    <>
      {currentSet?.state === 'pending' && <Spin />}
      {currentSet?.state !== 'pending' && (
        <FolderOpenOutlined key="open" onClick={() => getCurrentSet(setId)} />
      )}
    </>
  );
});
