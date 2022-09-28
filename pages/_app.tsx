import '../styles/style.scss';
import 'antd/dist/antd.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import  StoreProvider  from '../components/providers/store';
import NonSSRWrapper from '../components/nonSSRWrapper';
import '../i18n';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) =>{
  const getLayout = Component.getLayout ?? ((page:any) => page);
  return (
    <NonSSRWrapper>
      <StoreProvider>{
        getLayout(
          <Component {...pageProps} />
        )
      }
      </StoreProvider>
    </NonSSRWrapper>
  )
}

export default MyApp;