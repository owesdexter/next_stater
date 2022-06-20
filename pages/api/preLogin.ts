import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import  { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { csrfTokenName } from '../../constants';

export default function  handler(req: NextApiRequest, res: NextApiResponse<string>){
  axios({
    url: 'https://cloud.nueip.com/login/index/param',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    withCredentials: true
  })
  .then((response)=>{
    const str1 = response.data.match(/(name=.*csrf_token.*value=\')(.*)\'/gi)[0];
    const str2 = str1.match(/(value=\')(.*)\'/)[2];
    setCookies(csrfTokenName, str2, {
      req,
      res,
      httpOnly: true
    })
    res.status(200).json(str2);
  })
  .catch((error)=>{
    console.log(error);
  })
  .finally(()=>{
  });
}