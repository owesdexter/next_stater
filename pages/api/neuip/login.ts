import type { NextApiRequest, NextApiResponse } from 'next';
import express from 'express';
import Cors from 'cors';
import axios from 'axios';
import { setCookies } from 'cookies-next';

interface userInfo{
  company: string,
  department: string,
  headshotPosition: string,
  memberId: string,
  username: string,
}

const cors = Cors({
  methods: ['GET', 'POST'],
})

function runCors(req: NextApiRequest, res: NextApiResponse<string>, fn:any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result:any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

// function setCookie(req: NextApiRequest, res: NextApiResponse<string>, fn:any) {
//   return new Promise((resolve, reject) => {
//     req.cookies.set('Hi', 'Hi');
//   })
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse<string> ){
  await runCors(req, res, cors);

  let cookieStr = '';
  console.log(req.cookies)
  for (const [key, value] of Object.entries(req.cookies)) {
    cookieStr += `${key}=${value}; `;
    // setCookies(key, value, { req, res })
  }

  const data = JSON.stringify({
    // inputCompany: req.body.company,
    // inputID: req.body.memberId,
    // inputPassword: req.body.password
    'inputCompany': 'essences',
    'inputID': 'R0203',
    'inputPassword': '@Aa987654322'
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

  // Postman
  // const data = JSON.stringify({
  //   'inputCompany': 'essences',
  //   'inputID': 'R0203',
  //   'inputPassword': '@Aa987654322'
  // });
  // var config = {
  //   method: 'post',
  //   url: 'https://cloud.nueip.com//login/index/param',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Cookie': 'PHPSESSID=mrti2lpjoq5bqfjrsrfbirne32; csrf_token=6e1f9a4e83858e5f72936ec7914e6f4b;'
  //   },
  //   data : data
  // };

  // axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}