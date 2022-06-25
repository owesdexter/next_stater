import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface userInfo{
  company: string,
  department: string,
  headshotPosition: string,
  memberId: string,
  username: string,
}

export default function  handler(req: NextApiRequest, res: NextApiResponse<string>, ){
  let cookieStr = '';
  for (const [key, value] of Object.entries(req.cookies)) {
    cookieStr += `${key}=${value}; `;
  }

  const data = JSON.stringify({

    inputCompany: req.body.company,
    inputID: req.body.memberId,
    inputPassword: req.body.password
  });

  // console.log(data)
  // console.log('cookieStr: ', cookieStr)

  axios({
    url: 'https://cloud.nueip.com/login/index/param',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': `${cookieStr}`
    },
    method: 'post',
    data
  })
  .then((response)=>{
    res.status(200).json(response.data);
  })
  .catch((error)=>{
    // console.log(error);
  })
  .finally(()=>{
  });
}