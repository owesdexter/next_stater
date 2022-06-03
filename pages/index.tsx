import Layout from '../components/layout';
import type { ReactElement } from 'react';

export default function Home(){

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
