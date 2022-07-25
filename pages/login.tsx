import { GetStaticProps } from 'next';
import { useState, useEffect, MouseEventHandler } from 'react';
import { Input, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import { userActions } from "../store/user";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelector } from "react-redux";

export default function Login(){
  const [password, setPassword] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLogining, setIsLogining] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state:any) => state.user);

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
  // const testStore = ()=>{
  //   console.log(userInfo)
  //   // router.push('/');
  // }
  // const testRouter = ()=>{
  //   console.log(userInfo)
  //   router.push('/');
  // }

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
      {/* <div>
        <Button type="primary" loading={isLogining} onClick={testStore} suppressHydrationWarning>
          {t('User')}
        </Button>
      </div>
      <div>
        <Button type="primary" loading={isLogining} onClick={testRouter} suppressHydrationWarning>
          {t('Route')}
        </Button>
      </div> */}
      <div>
        <span>{errorMsg}</span>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps  = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale?? `${process.env.defaultLocale}`, ['common'])),
  },
});