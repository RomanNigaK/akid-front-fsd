/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Card, Flex, Layout, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import { useStores } from 'app/provider/ContextProvider';
import { WorkList } from 'features/work-list-table';
import { Work } from 'entities/work';
import { DrawerSelectMaterials } from 'features/drawer-select-material-by-work';
import { AddWork, FormFirstCreate } from 'features/work-add-form';
import { WorkEditForm } from 'features/work-edit-modal';

export const WorkPage = observer(() => {
  const { kitId } = useParams();

  if (!kitId) return null;

  const {
    work: { count, getCountAction, getWorksAction },
  } = useStores();

  useEffect(() => {
    if (!count) getCountAction(kitId);
  }, []);

  const [work, setWork] = useState<Work>();

  return count?.case({
    fulfilled: ({ count }) => (
      <>
        <WorkEditForm />
        {count === 0 && (
          <Flex vertical justify="center" align="center">
            <FormFirstCreate setId={kitId} />
          </Flex>
        )}
        {count > 0 && (
          <Layout>
            <Content>
              <Card title="Ведомость работ" style={{ marginTop: '20px' }}>
                {work && (
                  <DrawerSelectMaterials
                    clearWork={() => setWork(undefined)}
                    work={work}
                    kitId={kitId}
                    updateWorkList={() => getWorksAction(kitId)}
                  />
                )}

                <AddWork kitId={kitId} />
                <br />
                <WorkList kitId={kitId} selectWork={setWork} />
              </Card>
            </Content>
          </Layout>
        )}
      </>
    ),
    pending: () => <Skeleton active />,
  });
});
