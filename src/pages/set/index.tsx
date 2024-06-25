/* eslint-disable react-hooks/exhaustive-deps */
import { nanoid } from '@ant-design/pro-components';
import { Avatar, Card, Flex, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Content } from 'antd/es/layout/layout';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from 'app/provider/ContextProvider';
import { ButtonDefault, FormFirstCreate } from 'features/set';
import { DropdownMenuSet } from 'widgets/drop-down-set-menu';
import { GetSet } from 'entities/set';

export const Set = observer(() => {
  const {
    set: { sets, getSetsAction },
    file: { resetFileStore },
    material: { resetMaterialStore },
    work: { resetWorkStore },
  } = useStores();

  useEffect(() => {
    getSetsAction();
    resetFileStore();
    resetMaterialStore();
    resetWorkStore();
  }, []);

  return (
    <>
      {sets?.case({
        pending: () => <Skeleton active />,
        fulfilled: (sets) => (
          <Content>
            <Flex justify="center">
              {sets.length > 0 && (
                <Flex vertical justify="center" style={{ width: '600px' }}>
                  <Flex
                    justify="space-between"
                    align="center"
                    style={{ marginTop: '50px', marginBottom: '10px' }}
                  >
                    <ButtonDefault />
                  </Flex>

                  <Flex gap={20} wrap>
                    {sets.map((e) => {
                      return (
                        <Card
                          key={nanoid()}
                          style={{ width: '100%' }}
                          actions={[
                            <GetSet key="open" setId={e.id} />,
                            <DropdownMenuSet set={e} key={nanoid()} />,
                          ]}
                        >
                          <Meta
                            avatar={
                              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title={e.name}
                            description="Здесь будет отображаться сборная информация по комплекту, которая будет тут уместной и попожет пользователю быстрее искать нужное"
                          />
                        </Card>
                      );
                    })}
                  </Flex>
                </Flex>
              )}
            </Flex>
            {sets.length === 0 && (
              <Flex vertical align="center" style={{ marginTop: '100px' }}>
                <FormFirstCreate />
              </Flex>
            )}
          </Content>
        ),
      })}
    </>
  );
});
