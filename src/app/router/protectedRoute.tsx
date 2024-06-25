import { observer } from 'mobx-react-lite';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useStores } from 'app/provider/ContextProvider';

const ProtectedRoute: FC<PropsWithChildren> = observer(({ children }) => {
  const {
    auth: { authData, validTokenAction, isAuth, isTokenValid },
  } = useStores();
  useEffect(() => {
    validTokenAction();
  }, [validTokenAction]);

  if (
    !isAuth &&
    (isTokenValid?.state === 'rejected' || authData?.state === 'rejected')
  ) {
    return <Navigate to="/auth" replace />;
  }

  if (isTokenValid?.state === 'fulfilled' || authData?.state === 'fulfilled')
    return children;
});

export { ProtectedRoute };
