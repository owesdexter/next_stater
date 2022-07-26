import { useState, useContext } from 'react';
import type { ReactElement } from 'react';
import Layout from '../components/layout';
import Basic from '../components/exporter/basic';
import Overtime from '../components/exporter/overtime';
// import Dayoff from '../components/exporter/dayoff';
import Preview from '../components/exporter/preview';
import Output from '../components/exporter/output';
import ExportContextProvider, { ExporterContext } from '../components/providers/context/exporter';
import { Button, message, Steps } from 'antd';
import { useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const { Step } = Steps;

const steps = [
  '基本',
  '加班',
  '預覽',
  '輸出',
]

export default function PageExporter(){
  const { isProhibitedNext } = useContext(ExporterContext);
  const [currentStep, setCurrentStep] = useState<number>(2);
  const userInfo = useSelector((state:any) => state.user);
  const { t } = useTranslation();

  const next = ()=>{
    if(isProhibitedNext){
      return
    }
    setCurrentStep(pre=> pre + 1);
  }
  const prev = ()=>{
    setCurrentStep(pre=> pre - 1);
  }

  const goStep = (value: number) => {
    if(isProhibitedNext){
      return
    }
    setCurrentStep(value);
  };

  const done = ()=>{
    setCurrentStep(0);
    const key = 'updatable';
    message.loading({ content: 'Resetting...', key });
    setTimeout(() => {
      message.success({ content: 'Reset!', key, duration: 2 });
    }, 1000);
  }

  const renderSwitch = (index:number)=>{
    switch(index) {
      case 1:
        return <Overtime/>
      // case 2:
      //   return <Dayoff onInvalid={setIsProhibitedNext}/>
      case 2:
        return <Preview />
      case 3:
        return <Output />
      default:
        return <Basic />
    }
  }

  return(
    <div className="page-exporter bs5-container">
      <div className="content">
        <Steps
          current={currentStep}
          type="navigation"
          direction="vertical"
          className="site-navigation-steps step-bar-container"
          onChange={goStep}
        >
          {steps.map(item => (
            <Step key={item} title={t(item)} />
          ))}
        </Steps>

        <ExportContextProvider>
          <div className="steps-coimage.pngntent">
            {renderSwitch(currentStep)}
          </div>
        </ExportContextProvider>
      </div>

      <div className="footer steps-action">
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            {t('__t_Previous')}
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            {t('__t_Next')}
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={() => done()}>
            {t('__t_Done')}
          </Button>
        )}
      </div>
    </div>
  )
}

PageExporter.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps  = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale?? `${process.env.defaultLocale}`, ['common'])),
  },
});