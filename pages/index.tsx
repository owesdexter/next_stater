import Layout from '../components/layout';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { getCookie } from 'cookies-next';
import { useSelector } from "react-redux";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home(){
  const { t } = useTranslation('common');
  const router = useRouter();
  if(typeof window !== 'undefined'){
    if(!getCookie('sns')){
      router.push('/login');
    }
  }
  const userInfo = useSelector((state:any) => state.user);

  return (
    <div>
      <h1>{t('__t_Home')}</h1>
      <ul>
        {/* <li>{userInfo}</li> */}
      </ul>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement){
  return (
    <Layout>
      {page}
    </Layout>
  )
}


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
