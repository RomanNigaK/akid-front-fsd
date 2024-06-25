/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Card, Flex, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useStores } from 'app/provider/ContextProvider';
import { Material } from 'entities/material';
import { AddMaterial, FormFirstCreate } from 'features/material-add-form';
import { DrawerUploadfile } from 'features/drawer-upload-file';
import { MaterialList } from 'features/material-list-table';
import { DrawerFileList } from 'features/drawer-file-list';
import { MaterialEditForm } from 'features/material-edit-modal';

export const MaterialPage = observer(() => {
  const { kitId } = useParams();

  if (!kitId) return null;

  const {
    material: { count, getCountAction, getMaterialsAction },
  } = useStores();

  useEffect(() => {
    if (!count) getCountAction(kitId);
  }, []);

  const [material, setMaterial] = useState<Material>();

  return count?.case({
    fulfilled: ({ count }) => (
      <>
        <MaterialEditForm />
        {count === 0 && (
          <Flex vertical justify="center" align="center">
            <FormFirstCreate kitId={kitId} />
          </Flex>
        )}
        {count > 0 && (
          <Card title="Ведомость материалов" style={{ marginTop: '20px' }}>
            {material && (
              <>
                <DrawerUploadfile
                  material={material}
                  updateMaterialList={() => getMaterialsAction(kitId)}
                  setMaterial={setMaterial}
                />

                <DrawerFileList material={material} />
              </>
            )}

            <AddMaterial kitId={kitId} />
            <br />
            <MaterialList kitId={kitId} selectMaterial={setMaterial} />
          </Card>
        )}
      </>
    ),
    pending: () => <Skeleton active />,
  });
});
