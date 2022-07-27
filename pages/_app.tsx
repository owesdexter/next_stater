import '../styles/style.scss';
import 'antd/dist/antd.css';
import type { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import  StoreProvider  from '../components/providers/store';
import NonSSRWrapper from '../components/nonSSRWrapper';
import { useTranslation, Trans } from 'react-i18next';
import '../i18n';
// import { Provider } from 'react-redux';
// import  i18nProvider  from '../components/providers/i18n';
// import { appWithTranslation } from 'react-i18next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: any) =>{
  const { t } = useTranslation();
  const getLayout = Component.getLayout ?? ((page:any) => page);
  const allProps = {...pageProps, t};
  return (
    <NonSSRWrapper>
      <StoreProvider>{
        getLayout(
          <Component {...allProps} />
        )
      }
      </StoreProvider>
    </NonSSRWrapper>
  )
}

// export default appWithTranslation(MyApp);
export default MyApp;