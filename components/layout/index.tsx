import Header from './header';
// import { useState } from 'react';
import type { ReactElement } from 'react';

// TODO: declare children type
export default function Layout({ children }: any) {
  // const [counter, setCounter] = useState<number>(0);
  // const add = ()=>{
  //   let value = counter +1;
  //   setCounter(value)
  // }
  return (
    <div className="layout-wrapper d-flex">
      <Header />
      <div className="page-container">
        {children}
      </div>
    </div>
  )
}

