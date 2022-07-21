import '../styles/style.scss';
import 'antd/dist/antd.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import  store  from '../store';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    getLayout(
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  )
}

export default MyApp