import { useState, useContext } from 'react';
import { ExporterContext } from '../providers/context/exporter'
import ExcelEditor from '../excelEditor/worksheet'

export default function Preview(){
  // const { currentStep } = useContext(ExporterContext);
  const [currentStep, set] = useState<number>(1);
  const {  } = useContext(ExporterContext)

  const handleChange = (index:number)=>{
  }

  return(
    <>
      Preview
      <ExcelEditor />
    </>
  )
}