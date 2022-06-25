import { useState, useContext, useEffect } from 'react';
import { ExporterContext, ISpecialWorkTime } from '../contextProvider/exporter'
import DayoffEditor from '../dayoffEditor';
import { ESpecialWorkHour, ELeaveType } from '../../constants';

const dayoffOptions = [
  {
    title: '特休',
    value: ELeaveType.Annual,
  },
  {
    title: '疫苗假 (不支薪)',
    value: ELeaveType.Vaxxed,
  },
  {
    title: '病假',
    value: ELeaveType.Sick,
  },
  {
    title: '事假',
    value: ELeaveType.Personal,
  },
  {
    title: '家庭照顧假',
    value: ELeaveType.FamilyCare,
  },
  {
    title: '公假',
    value: ELeaveType.Official,
  },
  {
    title: '婚假',
    value: ELeaveType.Marriage,
  },
  {
    title: '喪假',
    value: ELeaveType.Funeral,
  },
  {
    title: '陪產假',
    value: ELeaveType.Paternity,
  },
]

type TDayoffProps = {
  onInvalid?: React.Dispatch<React.SetStateAction<boolean>>;
 }

export default function Dayoff({onInvalid}: TDayoffProps){
  const { overtime, updateOvertime } = useContext(ExporterContext);
  const [showMaxWarning, setShowMaxWarning] = useState<boolean>(false);

  const handleListChange = (list:ISpecialWorkTime[])=>{
    updateOvertime(list);
  }

  return(
    <div className="basic-step-container">
      <div className="step-title-container">新增請假</div>
      <DayoffEditor
        type={ESpecialWorkHour.Overtime}
        defaultHour={2}
        maxHour={8}
        options={dayoffOptions}
        defaultValue={overtime}
        onChange={handleListChange}
      />
      {/* <ul className="warning-hint-container">
        {showMaxWarning?<li>{`每月加班不能超過 ${MONTHLY_OVERTIME_LIMIT} 小時!`}</li>:null}
      </ul> */}
    </div>
  )
}