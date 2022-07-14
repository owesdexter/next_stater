import type { NextApiRequest, NextApiResponse } from 'next';
import { csrfTokenName } from '../../../constants';
import axios from 'axios';

interface userInfo{
  company: string,
  department: string,
  headshotPosition: string,
  memberId: string,
  username: string,
}

export default function  handler(req: NextApiRequest, res: NextApiResponse<userInfo>){
  const fake = {
    company: "易勝資訊",
    department: "委外事業一部",
    headshotPosition: "助理工程師",
    memberId: "R0203",
    username: "陳居仲"
  }
  res.status(200).json(fake);
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