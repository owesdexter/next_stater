import { useState } from 'react';
import type { ReactElement } from 'react';
import Layout from '../components/layout';
import StepBar from '../components/stepBar';
import Basic from '../components/exporter/basic';
import ExportContextProvider, { ExporterContext } from '../components/contextProvider/exporter';

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

  const renderSwitch = (index:number)=>{
    switch(index) {
      case 1:
        return <Basic />
      case 2:
        return <Basic />
      case 3:
        return <Basic />
      case 4:
        return <Basic />
    }
  }

  return(
    <div className="page-exporter">
      <ExportContextProvider>
        <StepBar steps={steps}/>
        {renderSwitch(currentStep)}


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