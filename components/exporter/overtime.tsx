import { useState, useContext } from 'react';
import { ExporterContext } from '../contextProvider/exporter'
import WorkTimeEditor from '../workTimeEditor';
import { ESpecialWorkHour, EOvertimeAwardType } from '../../constants';

const overTimeOptions = [
  {
    title: '__t_Overtime_pay',
    value: EOvertimeAwardType.Money,
  },
  {
    title: '__t_Comp_time',
    value: EOvertimeAwardType.Dayoff,
  },
]

export default function Preview(){
  // const { currentStep } = useContext(ExporterContext);
  const [currentStep, set] = useState<number>(1);
  const {  } = useContext(ExporterContext)

  const handleChange = (index:number)=>{
  }
  return(
    <div className="basic-step-container">
      <div className="step-title-container">新增加班</div>
      <WorkTimeEditor
        type={ESpecialWorkHour.Overtime}
        options={overTimeOptions}
      />
    </div>
  )
}