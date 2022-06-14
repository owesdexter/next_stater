import { useState, useContext } from 'react';
import { ExporterContext } from '../contextProvider/exporter'

export default function Preview(){
  // const { currentStep } = useContext(ExporterContext);
  const [currentStep, set] = useState<number>(1);
  const {  } = useContext(ExporterContext)

  const handleChange = (index:number)=>{
  }
  console.log(useContext(ExporterContext))
  return(
    <>
      OverTime
    </>
  )
}