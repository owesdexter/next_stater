import type { NextApiRequest, NextApiResponse } from 'next';
import { CNeuipRequestConfig, resetCookies, getMinCookieExpireTime, jwtEncoder} from '../../../http';
import { COMPANY_ID, ISns, ITokens, IUserInfo, CUserInfo } from '../../../constants';
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
      data: {} as ISns
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
      data: {} as any
    }

    axios({
      ...axiosConfig
    })
    .then((response)=>{
      const data = `${response.data}`;
      res.status = 200;
      res.data.company = parseHtml(data, /(target="_blank" rel="noreferrer noopener">)([\s\n]*)(.+)(<\/a>)/, 3);
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

let Tom: [string, number] = ['hi', 0];
Tom[0] = 'Tom';

export default async function useHandler(req: NextApiRequest, res: NextApiResponse<any>){
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
        const resetCookie = resetCookies(cookies);
        const expireTimestamp = getMinCookieExpireTime(resetCookie);
        const secureInfo = {
          ...value[1].data,
          loginToken: value[0].data.loginToken,
          exp: expireTimestamp
        };

        res.setHeader('Set-Cookie', [...resetCookie, `sns=${jwtEncoder(secureInfo)}; path=/; domain=${process.env.HOST};`]);
        res.setHeader('Authentication', jwtEncoder(secureInfo));
        delete value[0].data.loginToken;
        res.status(200).json(value[0].data);
      })
      .catch((error)=>{
        const error_msg = error?.response?.message ? error.response.message: 'login failed';
        res.status(401).json(error_msg);
      })
    })
    .finally(()=>{
    });

  }else{
    res.status(401).json('Login failed');
  }
}