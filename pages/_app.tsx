import '../styles/style.scss';
import 'antd/dist/antd.css';
import type { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import  store  from '../store';
import { appWithTranslation } from 'next-i18next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: any) =>{
  const getLayout = Component.getLayout ?? ((page:any) => page);
  return (
    <Provider store={store}>{
      getLayout(
          <Component {...pageProps} />
      )
    }
    </Provider>
  )
}

export default appWithTranslation(MyApp);