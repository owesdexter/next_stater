import type { NextApiRequest, NextApiResponse } from 'next';
import { CNeuipRequestConfig } from '../../../http';
import { COMPANY_ID, IUserInfo, CUserInfo } from '../../../constants';
import axios , { AxiosResponse }from 'axios';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>){
  return new Promise((resolve, reject)=>{
    // const reqCookies = req.headers.cookie;
    const axiosConfig = new CNeuipRequestConfig(
      '/personal_leave_resource',
      'post',
      req.headers.cookie,
      'action=list'
    )

    console.log(req.headers.cookie);


    axios({
      ...axiosConfig
    })
    .then((response)=>{
      res.status(200).json(response.data)
    })
    .catch((error)=>{
      const error_msg = error?.response?.message ? error.response.message: 'Bad Request';
      res.status(200).json(error_msg)
    })
  })
}