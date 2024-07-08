/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { FormPerson } from 'entities/person';
import { FormRepresentative } from 'entities/representative';
import { FormControlConstruction } from 'entities/controlConstruction';
import { useStores } from 'app/provider/ContextProvider';
import { TypePerson } from 'shared/constants/enums';

type Props = {
  kitId: string;
};

export const Construction = observer(({ kitId }: Props) => {
  const {
    person: {
      person,
      getPersonAction,
      createPersonAction,
      updatePersonAction,
      clearPerson,
    },
  } = useStores();

  useEffect(() => {
    getPersonAction(kitId, TypePerson.construction);
  }, []);

  person?.case({
    pending: () =>
      message.loading({
        content: 'Загружаем данные строительной организации',
        duration: 0.5,
      }),
  });

  useEffect(() => {
    return () => clearPerson();
  }, []);
  return (
    <>
      <FormPerson
        type={TypePerson.construction}
        kitId={kitId}
        person={person?.case({ fulfilled: (p) => p })}
        loading={person?.state === 'pending'}
        create={createPersonAction}
        update={updatePersonAction}
      />
      {person?.case({
        fulfilled: (p) => {
          if (p)
            return (
              <Tabs
                items={[
                  {
                    key: '1',
                    label: 'Представитель',
                    children: <FormRepresentative person={p} />,
                  },
                  {
                    key: '2',
                    label: 'Строительный контроль',
                    children: <FormControlConstruction person={p} />,
                  },
                ]}
              />
            );
        },
      })}
    </>
  );
});
