import { useState, useEffect, MouseEventHandler } from 'react';
// import { Input, Button, Space } from 'antd';
// import { useRouter } from 'next/router';
import axios from 'axios';
// import { COMPANY_ID } from '../constants';


export default function PageLogin(){

  useEffect(()=>{
    axios('/api/docker/image')
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
    });
  }, [])

  return(
    <h1>Docker</h1>
  )
}