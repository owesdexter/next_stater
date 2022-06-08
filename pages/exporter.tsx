import { useState } from 'react';
import type { ReactElement } from 'react';
import Layout from '../components/layout';
// import StepBar from '../components/stepBar';
import Basic from '../components/exporter/basic';
import Overtime from '../components/exporter/overtime';
import Dayoff from '../components/exporter/dayoff';
import Preview from '../components/exporter/preview';
import Output from '../components/exporter/output';
import ExportContextProvider, { ExporterContext } from '../components/contextProvider/exporter';
import { Button, message, Steps } from 'antd';
const { Step } = Steps;

const steps = [
  '__t_General',
  '__t_Overtime',
  '__t_Dayoff',
  '__t_Preview',
  '__t_Export',
]

export default function PageExporter(){
  // const { currentStep } = useContext(ExporterContext);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const next = ()=>{
    setCurrentStep(pre=> pre + 1);
  }
  const prev = ()=>{
    setCurrentStep(pre=> pre - 1);
  }
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
        return <Overtime />
      case 2:
        return <Dayoff />
      case 3:
        return <Preview />
      case 4:
        return <Output />
      default:
        return <Basic />
    }
  }

  return(
    <div className="page-exporter">
      <ExportContextProvider>
        <div className="step-bar-container">
          <Steps current={currentStep}>
            {steps.map(item => (
              <Step key={item} title={item} />
            ))}
          </Steps>

          <div className="steps-content">
            {renderSwitch(currentStep)}
          </div>

          <div className="steps-action">
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={() => done()}>
                Done
              </Button>
            )}
            {currentStep > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </ExportContextProvider>
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