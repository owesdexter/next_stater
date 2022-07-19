import type { NextApiRequest, NextApiResponse } from 'next';
import { CNeuipRequestConfig } from '../../../http';
import { COMPANY_ID, IUserInfo, CUserInfo } from '../../../constants';
import axios from 'axios';

const parseHtml = (htmlStr: string, reg: RegExp, index: number)=>{
  let str = '';
  let result = htmlStr.match(reg);

  if(result?.length){
    return result[index];
  }else {
    return str;
  }
}

const getUserSns = (reqCookie: string[]): Promise<{status: number, data?: any}>=>{
  return new Promise((resolve, reject)=>{
    const axiosConfig = new CNeuipRequestConfig(
      '/personal_leave_resource',
      'get',
      reqCookie
    )

    const res = {
      status: 200,
      data: {} as IUserInfo
    }

    axios({
      ...axiosConfig
    })
    .then((response)=>{
      const data = `${response.data}`;
      res.status = 200;
      res.data.s_sn = parseHtml(data, /(<input type="hidden" id="my_deptsn" value=")(.+)(">)/, 2);
      res.data.u_sn = parseHtml(data, /(<input type="hidden" id="my_sn" value=")(.+)(">)/, 2);
      res.data.d_sn = parseHtml(data, /(<input type="hidden" id="my_dept" value=")(.+)(">)/, 2);
      res.data.c_sn = parseHtml(data, /(<input type="hidden" id="my_cmpny" value=")(.+)(">)/, 2);

      if(res.data.s_sn?.length){
        resolve(res)
      }else {
        reject({status: 401})
      }
    })
    .catch((error)=>{
      res.status = error?.code ? error.code: 401;
      res.data = error?.message ? error.message: 'Error: Bad Request';
      reject(res)
    })
  })
}

const getUserText = (data:any, reqCookie: string[]): Promise<{status: number, data?: any}>=>{
  return new Promise((resolve, reject)=>{
    const axiosConfig = new CNeuipRequestConfig(
      '/home',
      'post',
      reqCookie,
      data,
    )

    const res = {
      status: 200,
      data: {} as IUserInfo
    }

    axios({
      ...axiosConfig
    })
    .then((response)=>{
      const data = `${response.data}`;
      res.status = 200;
      res.data.staffId = parseHtml(data, /(<input type="hidden" name="headshot_uno" value=")(.+)(">)/, 2);
      res.data.username = parseHtml(data, /(<input type="hidden" name="username" value=")(.+)(">)/, 2);
      res.data.position = parseHtml(data, /(<input type="hidden" name="headshot_position" value=")(.+)(">)/, 2);
      res.data.department = parseHtml(data, /(<label class="font-size_13 margin-bottom-0">部門<\/label>)(\s+)(<div class="padding-bottom-10">\s*)(.+)(\s*<\/div>)/, 4);
      res.data.loginToken = parseHtml(data, /(<input type="hidden" name="token" value=")(.+)(">)/, 2);

      if(res.data.loginToken?.length){
        resolve(res)
      }else {
        reject({status: 401})
      }
    })
    .catch((error)=>{
      res.status = error?.code ? error.code: 401;
      res.data = error?.message ? error.message: 'Error: Bad Request';
      reject(res)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>){
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
      req.headers.cookie,
      data
    )

    axios({
      ...loginConfig,
      maxRedirects: 0
    })
    .then((response)=>{
      res.status(401).json("login Failed");
    })
    .catch(async (error)=>{
      const cookies = error.response.headers['set-cookie'];
      Promise.all([getUserText(data, cookies), getUserSns(cookies)])
      .then((value)=>{
        console.log(new CUserInfo({...value[0].data, ...value[1].data}));
        res.status(200).json(value);
      })
      .catch((error)=>{
        res.status(401).json(error.response.message);
      })
    })
    .finally(()=>{
    });

  }else{
    res.status(401).json('Login failed');
  }
}