import type { NextApiRequest, NextApiResponse } from 'next';
import { csrfTokenName } from '../../constants';
import axios from 'axios';
import  { getCookies, setCookies } from 'cookies-next';

interface userInfo{
  company: string,
  department: string,
  headshotPosition: string,
  memberId: string,
  username: string,
}

export default function  handler(req: NextApiRequest, res: NextApiResponse<string>){
  res.status(200).json('this is token');
  // axios({
  //   url: 'https://cloud.nueip.com/login/index/param',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   method: 'post',
  //   withCredentials: true
  // })
  // .then((response)=>{
  //   // setCookies(csrfTokenName, str2, {
  //   //   req,
  //   //   res,
  //   //   httpOnly: true
  //   // })
  //   res.status(200).json(fake);
  // })
  // .catch((error)=>{
  //   console.log(error);
  // })
  // .finally(()=>{
  // });
}