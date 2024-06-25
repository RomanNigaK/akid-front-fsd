import { InboxOutlined } from '@ant-design/icons';
import { Drawer, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import Dragger from 'antd/es/upload/Dragger';
import { UploadProps } from 'antd/lib';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Material } from 'entities/material';
import { useStores } from 'app/provider/ContextProvider';

type Props = {
  material: Material;
  updateMaterialList: () => void;
  setMaterial: Dispatch<SetStateAction<Material | undefined>>;
};

export const DrawerUploadfile = observer(
  ({ material, updateMaterialList, setMaterial }: Props) => {
    const [isUpload, setIsUpload] = useState(false);

    const {
      file: {
        getFilesByMaterialIdAction,
        files,
        isViewDrawerUpload,
        setIsViewDrawerUpload,
      },
    } = useStores();

    const handleClose = () => {
      if (isUpload) updateMaterialList();
      setIsViewDrawerUpload(false);
      setMaterial(undefined);
    };

    useEffect(() => {
      if (isViewDrawerUpload) getFilesByMaterialIdAction(material.id);
    }, [getFilesByMaterialIdAction, isViewDrawerUpload, material.id]);
    return (
      <Drawer
        width={800}
        open={isViewDrawerUpload}
        onClose={handleClose}
        title="Загрузить документы"
        destroyOnClose
      >
        {files?.case({
          fulfilled: (files) => {
            console.log(files);
            const props: UploadProps = {
              name: 'file',
              multiple: true,
              action: `/api/material/${material?.id}/upload-file`,
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
              onChange: ({ file }) => {
                if (file.status === 'done') setIsUpload(true);
              },
              defaultFileList: files.map((e) => {
                return { uid: e.id, name: e.originalName, status: 'done' };
              }),
            };
            return (
              <>
                <Title
                  level={5}
                  style={{ marginTop: '0px', marginBottom: '15px' }}
                >
                  {material?.name}
                </Title>
                <Dragger
                  {...props}
                  style={{ maxHeight: '200px', width: '100%' }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Нажмите или перетащите файл в эту область, чтобы загрузить
                  </p>
                  <p className="ant-upload-hint">
                    Поддержка одиночной или массовой загрузки. Строго запрещено
                    загрузка данных компании или других запрещенных файлов.
                  </p>
                </Dragger>
              </>
            );
          },
          pending: () => <Spin />,
        })}
      </Drawer>
    );
  }
);
