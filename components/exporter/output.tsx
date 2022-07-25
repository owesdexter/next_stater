import { useState, useContext } from 'react';
import { ExporterContext } from '../providers/context/exporter'

export default function Preview(){
  // const { currentStep } = useContext(ExporterContext);
  const [currentStep, set] = useState<number>(1);
  const {  } = useContext(ExporterContext)

  const handleChange = (index:number)=>{

  }

  return(
    <>
      <a href="mailto:john@example.com">John</a>
    </>
  )
}