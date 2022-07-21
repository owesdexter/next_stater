import Layout from '../components/layout';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { getCookie } from 'cookies-next';
import { useSelector } from "react-redux";

export default function Home(){
  const router = useRouter();
  if(typeof window !== 'undefined' && !getCookie('sns')){
    router.push('/login');
  }
  const userInfo = useSelector((state:any) => state.user);
  console.log('userInfo', userInfo);
  router.push('/exporter');

  return (
    <div>
      <h1>Index</h1>
      <ul>
        {/* <li>{userInfo}</li> */}
      </ul>
    </div>
  )
}

import { GetServerSideProps } from 'next'



Home.getLayout = function getLayout(page: ReactElement){
  return (
    <Layout>
      {page}
    </Layout>
  )
}
