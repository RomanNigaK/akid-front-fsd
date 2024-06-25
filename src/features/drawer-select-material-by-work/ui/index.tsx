/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
  TableColumnsType,
} from 'antd';
import { observer } from 'mobx-react-lite';
import { Key, useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import { SearchOutlined } from '@ant-design/icons';
import { featureStore } from '../model';
import { Work } from 'entities/work';
import { useStores } from 'app/provider/ContextProvider';
import { Material } from 'entities/material';
import { Unit } from 'shared/constants/enums';

type Props = {
  clearWork: () => void;
  work: Work;
  kitId: string;
  updateWorkList: () => void;
};

export const DrawerSelectMaterials = observer(
  ({ clearWork, work, kitId, updateWorkList }: Props) => {
    const {
      work: { works },
      material: { materials, getMaterialsAction },
    } = useStores();

    const {
      materialsWork,
      getMaterialsWorkAction,
      bundleMaterialsWorkAction,
      updateBundle,
    } = featureStore;

    const [selectedWorkId, setSelectedWorkId] = useState(work.id);

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    const [isUpdateListIds, setIsUpdateListIds] = useState(false);

    const onSelectChange = (newSelectedRowKeys: Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
      if (!isUpdateListIds) setIsUpdateListIds(true);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };

    const columns: TableColumnsType<Material> = [
      {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Оборудование',
        dataIndex: '1',
        key: '1',
        width: 150,
        align: 'center',
        render: (_, record) => record.equipment && <Checkbox checked />,
      },
    ];
    useEffect(() => {
      if (!materials) getMaterialsAction(kitId);
    }, [getMaterialsAction, kitId, materials]);

    useEffect(() => {
      getMaterialsWorkAction(selectedWorkId);
    }, [selectedWorkId]);

    useEffect(() => {
      if (materialsWork?.state === 'fulfilled') {
        setSelectedRowKeys(materialsWork.value);
      }
    }, [materialsWork?.state, materialsWork]);

    const handleUpdateBundle = () => {
      bundleMaterialsWorkAction(selectedWorkId, selectedRowKeys);
    };

    const hahdlCloseDrawer = () => {
      if (isUpdateListIds) updateWorkList();
      clearWork();
    };

    return (
      <Drawer
        width={800}
        open={!!work}
        onClose={hahdlCloseDrawer}
        title={`${work.name} (${Unit[work.unit]})`}
        destroyOnClose
        footer={
          <Flex justify="end" gap={20}>
            <Button
              type="primary"
              size="large"
              onClick={handleUpdateBundle}
              loading={updateBundle?.state === 'pending'}
              disabled={!isUpdateListIds}
            >
              Сохранить изменения
            </Button>
            <Button size="large" onClick={hahdlCloseDrawer}>
              Отмена
            </Button>
          </Flex>
        }
      >
        {materials?.case({
          fulfilled: (m) => (
            <Content>
              <Row gutter={15}>
                <Col span={12}>
                  <Form layout="vertical">
                    <Form.Item label="Быстрый поиск">
                      <Input
                        prefix={<SearchOutlined />}
                        size="large"
                        placeholder="Наименование"
                      />
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={12}>
                  <Form layout="vertical">
                    <Form.Item label="Изменить работу">
                      <Select
                        style={{ width: '100%' }}
                        size="large"
                        defaultValue={work.name}
                        onSelect={(e) => setSelectedWorkId(e)}
                        options={works?.case({
                          fulfilled: (w) =>
                            w.map((e) => {
                              return { label: e.name, value: e.id };
                            }),
                        })}
                      />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>

              <br />
              <br />
              {materialsWork?.case({
                fulfilled: () => (
                  <Table
                    rowKey="id"
                    dataSource={m}
                    columns={columns}
                    pagination={false}
                    rowSelection={rowSelection}
                  />
                ),
                pending: () => <Spin />,
              })}
            </Content>
          ),
          pending: () => <Spin />,
        })}
      </Drawer>
    );
  }
);
