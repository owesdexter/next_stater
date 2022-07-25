const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

export const neuipFilterCookieFn = (key: string, value:string): string =>{
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

export const cookieToString = (cookies?: string[] | string, filterFn?: (key:string, value:string)=>string):string =>{
  let cookieStr = '';
  if(cookies && Array.isArray(cookies)){
    for (let i = 0; i < cookies.length; i++){
      const keyAndValue = cookies[i].split('; ')[0];
      let [key, value] = keyAndValue.split('=');

      const filteredArr = cookies.filter(el=>el.startsWith(`${key}=`));
      if(filteredArr?.length>1 && filteredArr[filteredArr.length-1] !== cookies[i] && value!=='deleted'){
        continue
      }

      if(filterFn){
        value = filterFn(key, value);
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

export const getCookieExpireTime = (cookie: string): number=>{
  if(cookie.includes('expires')){
    const matches = cookie.match(/(expires=)(.+)(;.+)/);
    if(matches?.length){
      return Math.floor(new Date(matches[3]).getTime()/ 1000);
    }else {
      return -1
    }
  }else{
    return -1
  }
}

export const getMinCookieExpireTime = (cookies: string[]): number=>{
  const now = new Date();
  now.setHours(now.getHours()+2);
  now.setMinutes(now.getMinutes()-5);
  let minExpire = Math.floor(now.getTime()/ 1000);

  for (let i = 0; i < cookies.length; i++){
    const value = getCookieExpireTime(cookies[i]);
    if(value>0){
      minExpire = value< minExpire? value: minExpire;
    }
  }
  return minExpire;
}

export const changeCookieDomain = (cookie: string): string=>{
  if(cookie.includes('domain')){
    return cookie.replace(/(domain=)(.+)(;.+)/, `$1${process.env.HOST}$3`);
  }else{
    return cookie
  }
}

export const resetCookies = (cookies: string[], filterCookieFn?:(key: string, value:string)=>string):string[] =>{
  const arr = [] as string[];
  for (let i = 0; i < cookies.length; i++){
    let cookieStr = cookies[i];
    const keyAndValue = cookies[i].split('; ')[0];
    let [key, value] = keyAndValue.split('=');

    if(!value || value==='deleted'){
      continue
    }

    const filteredArr = cookies.filter(el=>el.startsWith(`${key}=`));
    if(filteredArr?.length>1 && filteredArr[filteredArr.length-1] !== cookies[i] && value!=='deleted'){
      continue
    }
    if(filterCookieFn){
      value = filterCookieFn(key, value);
    }

    cookieStr = changeCookieDomain(cookieStr);

    arr.push(cookieStr);
  }
  return arr;
}

export const jwtEncoder = (obj: any, expire?: string):string =>{
  return jwt.sign(obj, SECRET);
}

export const jwtDecoder = (token: string):any =>{
  return jwt.decode(token);
}