import { createRoot } from 'react-dom/client';
import { App as AntdApp } from 'antd';
import { App } from 'app';
import { RootStoreContext } from 'app/provider/ContextProvider';
import { RootStore } from 'shared/store';

createRoot(document.getElementById('root')!).render(
  <RootStoreContext.Provider value={new RootStore()}>
    <AntdApp>
      <App />
    </AntdApp>
  </RootStoreContext.Provider>
);
