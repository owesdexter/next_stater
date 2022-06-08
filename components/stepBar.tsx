// import Layout from '../components/layout';
// import { ExporterContext } from '../components/contextProvider/exporter';
// import { useContext } from 'react';
// import type { ReactElement } from 'react';

type TStepBarProps = {
  steps: string[];
}

export default function StepBar({steps}: TStepBarProps){
  return(
    <div className="step-bar-wrapper">
      {steps.map((el, idx)=>{return (
          <div className="step-indicator" key={el}>
            <span className="step">{idx+1}</span>
            <span className="title">{el}</span>
          </div>
        )})
      }
    </div>
  )
}