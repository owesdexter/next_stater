import { useState, useEffect, MouseEventHandler } from 'react';
import { Input, Button, Space } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';
import { userActions } from "../store/user";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

export const Login = ()=>{
  const [password, setPassword] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLogining, setIsLogining] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  // console.log(useTranslation())
  // console.log(t('__t_Login'))
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
      router.push('/');
      dispatch(userActions.storeUser(res.data));
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
        <Link
          href={router.pathname}
          locale={router.locale === "en" ? "zh-tw" : "en"}
          passHref
        >
          <a>
            <span>{router.locale}</span>
          </a>
        </Link>
        <Button type="primary" loading={isLogining} onClick={handleLogin} suppressHydrationWarning>
          {/* 登入 */}
          {t('__t_Login')}
        </Button>
        {/* <button onClick={() => i18n.changeLanguage('zh-tw')}>
            Click to Change Language
        </button> */}
      </div>
      <div>
        <span>{errorMsg}</span>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ['common'],
      // nextI18NextConfig
    )),
  },
});

module.exports = Login