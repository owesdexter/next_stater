import { useState, useEffect, MouseEventHandler } from 'react';
import { Input, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import { COMPANY_ID } from '../constants';


export default function PageLogin(){
  const [password, setPassword] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLogining, setIsLogining] = useState<boolean>(false);

  const router = useRouter();

  const loginAPI = ()=>{
    const data = {
      memberId,
      password
    }
    axios({
      url: '/api/neuip/login',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      method: 'post',
      data,
    })
    .then((res)=>{
      console.log(res.data)
      router.push('/login');
      // setIsLogining(false);
    })
    .catch((err)=>{
      console.log(err);
      setErrorMsg(err.data);
    })
    .finally(()=>{
      setIsLogining(false);
    });
  }

  const handleLogin = ()=>{
    setIsLogining(true);
    loginAPI();
  }

  useEffect(()=>{
    axios('/api/neuip/preLogin')
    .then((res)=>{
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
    });
  }, [])

  return(
    <div className="login-page">
      <div>
        <Input type="text" className="account-input" placeholder="員工編號" onChange={e=>{setMemberId(e.target.value)}}/>
        <Input.Password placeholder="密碼" onChange={e=>{setPassword(e.target.value)}}/>
      </div>
      <div>
        <Button type="primary" loading={isLogining} onClick={handleLogin}>
          登入
        </Button>
      </div>
      <div>
        <span>{errorMsg}</span>
      </div>
    </div>
  )
}