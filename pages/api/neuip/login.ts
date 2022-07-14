import type { NextApiRequest, NextApiResponse } from 'next';
import { COMPANY_ID } from '../../../constants';
import { CNeuipRequestConfig } from '../../../http';
import axios from 'axios';
import qs from 'qs';

interface userInfo{
  company: string,
  department: string,
  headshotPosition: string,
  memberId: string,
  username: string,
}

const homeAPI = (reqCookie: string[])=>{
  return new Promise((resolve, reject)=>{
    const axiosConfig = new CNeuipRequestConfig(
      '/home',
      'get',
      '',
      reqCookie,
    )
    axios({
      ...axiosConfig
    })
    .then((response)=>{
      const token = JSON.stringify(response).match(/<input type="hidden" name="token" value="(.+)">/);
      console.log(token);
      return {status: response.status, token: token}
    })
    .catch((error)=>{
      return {status: error.status, error: error}
    })
    .finally(()=>{
    });
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<string> ){
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
      const repCookies = error.response.headers['set-cookie'];
      const loginToken = await homeAPI(repCookies);
    })
    .finally(()=>{
    });

  }else{
    res.status(401).json('Login failed');
  }
}