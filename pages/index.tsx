import Layout from '../components/layout';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { jwtDecoder } from '../http'

export default function Home(){
  const { t } = useTranslation('common');
  const router = useRouter();
  if(typeof window !== 'undefined'){
    const sn = document.cookie.split('; ').find(el=>el.startsWith('sns'));
    if(sn){
      const loginTokenExpireTime = jwtDecoder(sn.split('=')[1]).exp;
      const now = new Date();
      now.setMinutes(now.getMinutes() - 3);

      if(loginTokenExpireTime - Math.floor(now.getTime()/ 1000) <0){
        router.push('/login');
        console.log(`登入逾時 ${loginTokenExpireTime} < ${Math.floor(now.getTime()/ 1000)}`);
      }else{
        console.log(`登入成功 ${loginTokenExpireTime} > ${Math.floor(now.getTime()/ 1000)}`);
        router.push('/exporter');
      }
    }else{
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