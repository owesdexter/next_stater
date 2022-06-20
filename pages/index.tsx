import Layout from '../components/layout';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { getCookie } from 'cookies-next';
import { csrfTokenName } from '../constants';

export default function Home(){
  const router = useRouter();
  if(typeof window !== 'undefined' && getCookie(csrfTokenName)){
    router.push('/login');
  }

  return (
    <div>
      <h1>Index</h1>
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
