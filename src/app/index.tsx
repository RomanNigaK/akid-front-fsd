import { ConfigProvider } from 'antd';
import './styles/styles.css';
import './styles/reset.css';
import { RouterProvider } from 'react-router-dom';
import localeRU from 'antd/lib/locale/ru_RU';
import { router } from './router';
import { theme } from 'shared/config/theme';

export const App = () => {
  return (
    <ConfigProvider
      locale={localeRU}
      form={{ validateMessages: { required: 'Поле не пожет быть пустым' } }}
      theme={theme}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};
