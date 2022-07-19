import type { NextApiRequest, NextApiResponse } from 'next';
import { CNeuipRequestConfig, changeCookiesDomain } from '../../../http';
import { COMPANY_ID, IUserInfo, CUserInfo } from '../../../constants';
import axios , { AxiosResponse }from 'axios';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>){
  return new Promise((resolve, reject)=>{
    const axiosConfig = new CNeuipRequestConfig(
      '/personal_leave_resource',
      'post',
      req.headers.cookie,
      'action=list'
    )


    axios({
      ...axiosConfig
    })
    .then((response)=>{
      console.log(response.data);

    })
    .catch((error)=>{
      console.log(error.response.message);
    })
  })
}