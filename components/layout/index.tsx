import Header from './header';
import { useState } from 'react';
import type { ReactElement } from 'react';

interface IHeaderProp {
  children: ReactElement;
}

// TODO: declare children type
export default function Layout({ children }: IHeaderProp) {
  // const [counter, setCounter] = useState<number>(0);
  // const add = ()=>{
  //   let value = counter +1;
  //   setCounter(value)
  // }
  return (
    <>
      <Header />

      <main>
        <span>IN layout</span>
        {children}
      </main>
    </>
  )
}