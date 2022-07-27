import { useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import { userActions } from "../components/providers/store/user";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function Login(){
  const [password, setPassword] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLogining, setIsLogining] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

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
      dispatch(userActions.storeUser(res.data));
      router.push('/');
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
        <Input type="text" className="account-input" placeholder={t('__t_Staff_ID')} onChange={e=>{setMemberId(e.target.value)}}/>
        <Input.Password placeholder={t('__t_Password')} onChange={e=>{setPassword(e.target.value)}}/>
      </div>
      <div>
        <Button type="primary" loading={isLogining} onClick={handleLogin} suppressHydrationWarning>
          {t('__t_Login')}
        </Button>
      </div>
      <div>
        <span>{errorMsg}</span>
      </div>
    </div>
  )
}