import { useState, useContext } from 'react';
import { ExporterContext } from '../contextProvider/exporter'
import ExcelEditor from '../excelEditor'

export default function Preview(){
  // const { currentStep } = useContext(ExporterContext);
  const [currentStep, set] = useState<number>(1);
  const {  } = useContext(ExporterContext)

  const handleChange = (index:number)=>{

  }

  return(
    <>
      <ExcelEditor />
      <a href="mailto:john@example.com">John</a>
    </>
  )
}