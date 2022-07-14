import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import qs from 'qs';
// var cookie = require('cookie');

enum EAPIs{
  Neuip = 'Neuip',
  Firebase = 'Firebase',
}

const urlMapping = (type: EAPIs)=>{
  switch(type){
    case EAPIs.Neuip: return process.env.NEUIP_API_URL;
    case EAPIs.Firebase: return process.env.FIREBASE_DB_URL;
  }
}

class ConfigFactory {
  private url: string;
  private method: string;
  public headers: AxiosRequestHeaders;

  constructor(type: EAPIs, contentType: string,  path: string, method: string, cookies?: string[] | string){
    this.url = urlMapping(type) + path;
    this.method = method;

    let cookieStr = '';
    if(cookies && Array.isArray(cookies)){
      for (let i = 0; i < cookies.length; i++){
        const cookieKeyValue = cookies[i].split('; ')[0];
        cookieStr += `${cookieKeyValue}; `;
      }
    }else if(cookies){
      cookieStr = cookies
    }

    this.headers = {
      'Content-Type': contentType,
      'Cookie': cookieStr
    }
  }
}

export class CNeuipRequestConfig extends ConfigFactory{
  public data: any;

  constructor(path: string, method: string, data?:any, cookies?: string[] | string){
    super(EAPIs.Neuip, 'application/x-www-form-urlencoded', path, method, cookies);
    this.data = qs.stringify(data);
  }

}
