import { ThemeConfig } from 'antd/lib';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#47B3F1',
    colorLink: '#0698EC',
    colorPrimaryHover: '#7FC5FF',
  },
  components: {
    Layout: {
      headerBg: '#47B3F1',
      headerHeight: 80,
    },
    Typography: {
      titleMarginBottom: 5,
      titleMarginTop: 5,
    },
    Form: {
      itemMarginBottom: 16,
    },
    Menu: {
      darkItemBg: '#47B3F1',
      darkItemSelectedBg: '#5FBDF3',
      darkItemColor: '#575757',
      darkItemSelectedColor: '#575757',
      darkItemHoverColor: '#000',
      iconSize: 20,
    },
    Table: {
      rowExpandedBg: '#fff',
    },
    Drawer: {
      footerPaddingBlock: 20,
    },
  },
};

export { theme };
