import { createContext, useContext } from 'react';
import { RootStore } from 'shared/store';

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStores = () => {
  const context = useContext(RootStoreContext);
  if (context === null) throw new Error('wrap in provider app');
  return context;
};
