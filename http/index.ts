import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import qs from 'qs';

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

const cookieToString = (cookies?: string[] | string, filterCookieFn?: (key:string, value:string)=>string):string =>{
  let cookieStr = '';
  if(cookies && Array.isArray(cookies)){
    for (let i = 0; i < cookies.length; i++){
      const keyAndValue = cookies[i].split('; ')[0];
      let [key, value] = keyAndValue.split('=');

      const filteredArr = cookies.filter(el=>el.startsWith(`${key}=`));
      if(filteredArr?.length>1 && filteredArr[filteredArr.length-1] !== cookies[i] && value!=='deleted'){
        continue
      }

      if(filterCookieFn){
        value = filterCookieFn(key, value);
      }

      if(value && value!=='deleted'){
        cookieStr += `${keyAndValue}; `;
        if(i===cookies.length-1){
          cookieStr = cookieStr.trim();
        }
      }
    }
  }else if(cookies){
    cookieStr = cookies
  }
  return cookieStr
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

  constructor(path: string, method: string, data?:any, cookies?: string[] | string){
    let cookieStr = '';
    const filterCookieFn = (key: string, value:string): string =>{
      if((
        key==='activity' ||
        key==='signature' ||
        key==='checksum' ||
        key==='tkchecksum'
        ) && value==='1'
      ){
        return ''
      }else{
        return value
      }
    }
    cookieStr = cookieToString(cookies, filterCookieFn);
    super(EAPIs.Neuip, 'application/x-www-form-urlencoded', path, method, cookieStr);
    this.data = qs.stringify(data);
  }
}
