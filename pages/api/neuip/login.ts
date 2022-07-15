import type { NextApiRequest, NextApiResponse } from 'next';
import { CNeuipRequestConfig } from '../../../http';
import { COMPANY_ID } from '../../../constants';
import axios from 'axios';

interface userInfo{
  company: string,
  department: string,
  headshotPosition: string,
  memberId: string,
  username: string,
}

const homeAPI = (data:any, reqCookie: string[]): Promise<[number, string]>=>{
  return new Promise((resolve, reject)=>{

    const axiosConfig = new CNeuipRequestConfig(
      '/home',
      'post',
      data,
      reqCookie
    )

    axios({
      ...axiosConfig
    })
    .then((response)=>{
      let token = '';
      const result = `${response.data}`.match(/(<input type="hidden" name="token" value=")(.+)(">)/);
      if(result?.length){
        token = result[2];
        console.log('token', token);
        resolve([response.status, 'Login successfully!'])
      }else {
        resolve([401, 'Login failed'])
      }
    })
    .catch((error)=>{
      reject([error.status, error])
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<string> ){
  // const data = {
  //   inputCompany: 'essences',
  //   inputID: 'R0203',
  //   inputPassword: '@Aa987654321'
  // };
  const data = {
    inputCompany: COMPANY_ID,
    inputID: req.body.memberId,
    inputPassword: req.body.password
  };

  const reqCookies = req.headers.cookie;

  if(reqCookies){
    const loginConfig = new CNeuipRequestConfig(
      '/login/index/param',
      'post',
      data,
      req.headers.cookie
    )

    axios({
      ...loginConfig,
      maxRedirects: 0
    })
    .then((response)=>{
      res.status(401).json("login Failed");
    })
    .catch(async (error)=>{
      const resCookies = error.response.headers['set-cookie'];
      const [status, message] = await homeAPI(data, resCookies);
      res.status(status).json(message);
    })
    .finally(()=>{
    });

  }else{
    res.status(401).json('Login failed');
  }
}