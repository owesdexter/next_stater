import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setCookies } from 'cookies-next';
// import { csrfTokenName } from '../../constants';

export default function  handler(req: NextApiRequest, res: NextApiResponse<any>){
  axios({
    url: 'https://cloud.nueip.com/login/index/param',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    withCredentials: true
  })
  .then((response)=>{
    const cookies = response.headers['set-cookie'];
          console.log(cookies)
    if(cookies?.length){
      for(let i=0; i<cookies.length; i++){
        let option: {[key: string]: any} = {req, res};
        const options = cookies[i].split('; ');

        const indexOfHttpOnly = options.indexOf('HttpOnly');
        if(indexOfHttpOnly>=0){
          option['HttpOnly'] = true;
          options.splice(indexOfHttpOnly, 1);
        }

        const firstElement = options.shift();

        if(!firstElement){
          res.status(200).json(response.status);
          break
        }

        const cookieKeyValue = firstElement.split('=');

        for(let j=0; j<options.length; j++){
          const mappingArr = options[j].split('=');
          if(mappingArr[0]==='expires'){

          }else if(mappingArr[0]==='Max-Age'){
            option['maxAge'] = mappingArr[1];

          }else{
            option[mappingArr[0]] = mappingArr[1];
          }
        }
        setCookies(cookieKeyValue[0], cookieKeyValue[1], option);
      }
    }
    res.status(200).json(response.status);
    console.log('');
  })
  .catch((error)=>{
    console.log(error);
  })
  .finally(()=>{
  });
}