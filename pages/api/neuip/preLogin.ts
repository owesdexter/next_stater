import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function  handler(req: NextApiRequest, res: NextApiResponse<any>){
  axios({
    url: 'https://cloud.nueip.com',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'get',
  })
  .then((response)=>{
    const cookies = response.headers['set-cookie'];
    if(cookies?.length){
      res.setHeader('Set-Cookie', cookies);
    }
    res.status(200).json('Welcome, Please login first ^_^');
  })
  .catch((error)=>{
    console.log(error);
  })
  .finally(()=>{
  });
}