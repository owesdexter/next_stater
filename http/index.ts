import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { cookieToString, neuipFilterCookieFn, jwtEncoder, jwtDecoder } from './methods';
import qs from 'qs';
export * from  './methods';

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

  constructor(
    type: EAPIs,
    contentType: string,
    path: string,
    method: string,
    cookies?: string,
  ){
    this.url = urlMapping(type) + path;
    this.method = method;

    this.headers = {
      'Content-Type': contentType,
      'Cookie': `${cookies}`
    }
  }
}

export class CNeuipRequestConfig extends ConfigFactory{
  public data: any;

  constructor(path: string, method: string, cookies?: string[] | string, data?:any){
    let cookieStr = '';

    cookieStr = cookieToString(cookies, neuipFilterCookieFn);
    super(EAPIs.Neuip, 'application/x-www-form-urlencoded', path, method, cookieStr);
    this.data = qs.stringify(data);
  }
}
