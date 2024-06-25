import { Flex, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { UploadProps } from 'antd/lib';
import Title from 'antd/es/typography/Title';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useStores } from 'app/provider/ContextProvider';

export const DocumentPage = observer(() => {
  const { kitId } = useParams();
  const {
    file: { documents, getDocumentByKitAction },
  } = useStores();
  if (!kitId) return null;

  console.log(documents);

  useEffect(() => {
    getDocumentByKitAction(kitId);
  }, [getDocumentByKitAction, kitId]);
  return (
    <Flex justify="center" align="center" vertical>
      {documents?.case({
        fulfilled: (documents) => {
          const props: UploadProps = {
            name: 'file',
            multiple: true,
            action: `/api/kit/${kitId}/upload-document`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            defaultFileList: documents.map((e) => {
              return { uid: e.id, name: e.originalName, status: 'done' };
            }),
          };
          return (
            <>
              <Title
                level={5}
                style={{
                  marginTop: '0px',
                  marginBottom: '15px',
                  width: '700px',
                }}
              >
                Документы комплекта
              </Title>
              <Dragger
                {...props}
                style={{ maxHeight: '200px', width: '700px' }}
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
    </Flex>
  );
});
