/* eslint-disable sonarjs/no-duplicate-string */
import { Flex, Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStores } from 'app/provider/ContextProvider';
import { SetItemsType } from 'shared/constants/enums';
import {
  getCaptureUrl,
  getDocumentUrl,
  getMaterialUrl,
  getOptionKitUrl,
  getReqistryUrl,
  getWorkUrl,
} from 'app/router';

export const itemsSetMenuName = {
  [SetItemsType.work]: 'Ведомость работ',
  [SetItemsType.material]: 'Материалы',
  [SetItemsType.document]: 'Документы',
  [SetItemsType['basic-option']]: 'Общие настройки',
  [SetItemsType.capture]: 'Захватки',
  [SetItemsType.reqistry]: 'Реестр',
};

export const SetMenu: React.FC = observer(() => {
  const {
    set: { currentSet },
  } = useStores();

  return (
    <>
      {currentSet && currentSet.state === 'fulfilled' && (
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[SetItemsType.material]}
          items={[
            {
              key: SetItemsType.material,
              label: (
                <Link to={getMaterialUrl(currentSet.value.id)}>
                  {itemsSetMenuName[SetItemsType.material]}
                </Link>
              ),
            },
            {
              key: SetItemsType.work,
              label: (
                <Link to={getWorkUrl(currentSet.value.id)}>
                  {itemsSetMenuName[SetItemsType.work]}
                </Link>
              ),
            },
            {
              key: SetItemsType.document,
              label: (
                <Link to={getDocumentUrl(currentSet.value.id)}>
                  {itemsSetMenuName[SetItemsType.document]}
                </Link>
              ),
            },
            {
              key: SetItemsType['basic-option'],
              label: (
                <Link to={getOptionKitUrl(currentSet.value.id)}>
                  {itemsSetMenuName[SetItemsType['basic-option']]}
                </Link>
              ),
            },
            {
              key: SetItemsType.capture,
              label: (
                <Link to={getCaptureUrl(currentSet.value.id)}>
                  {itemsSetMenuName[SetItemsType.capture]}
                </Link>
              ),
            },
            {
              key: SetItemsType.reqistry,
              label: (
                <Link to={getReqistryUrl(currentSet.value.id)}>
                  {itemsSetMenuName[SetItemsType.reqistry]}
                </Link>
              ),
            },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
      )}
      {(!currentSet || currentSet.state !== 'fulfilled') && (
        <Flex
          style={{ color: '#6F7071', background: '#fff', height: '46px' }}
          justify="center"
          align="center"
        >
          Выберите из списка или создайте комплект документов для продолжения
          работы.
        </Flex>
      )}
    </>
  );
});
