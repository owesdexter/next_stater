// import Layout from '../components/layout';
// import { ExporterContext } from '../components/contextProvider/exporter';
import { useState } from 'react';
import type { ReactElement } from 'react';
import { Button, message, Steps } from 'antd';
const { Step } = Steps;

type TStepBarProps = {
  steps: string[];
  children: ReactElement
}

export default function StepBar({steps, children}: TStepBarProps){
  const [currentStep, setCurrentStep] = useState<number>(1);
  const next = ()=>{
    setCurrentStep(pre=> pre + 1);
  }
  const prev = ()=>{
    setCurrentStep(pre=> pre - 1);
  }



  return(
    <div className="step-bar-container">
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item} title={item} />
        ))}
      </Steps>
      <div className="steps-content">
        {children}
      </div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>

      {/* {steps.map((el, idx)=>{return (
          <div className="step-indicator" key={el}>
            <span className="step">{idx+1}</span>
            <span className="title">{el}</span>
          </div>
        )})
      } */}
    </div>
  )
}