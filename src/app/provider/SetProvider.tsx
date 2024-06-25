/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStores } from './ContextProvider';
import { getHomeUrl } from 'app/router';

export const SetProvider = ({ children }: PropsWithChildren) => {
  const {
    set: { currentSet, getCurrentSet },
  } = useStores();
  const navigate = useNavigate();

  const { kitId } = useParams();

  if (!kitId) navigate(getHomeUrl());

  useLayoutEffect(() => {
    if (kitId && !currentSet) getCurrentSet(kitId);
  }, []);
  return children;
};
