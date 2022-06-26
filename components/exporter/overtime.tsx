import { useState, useContext, useEffect } from 'react';
import { ExporterContext, ISpecialWorkTime } from '../contextProvider/exporter'
import OverTimeEditor from '../overTimeEditor';
import { ESpecialWorkHour, EOvertimeAwardType, MONTHLY_OVERTIME_LIMIT } from '../../constants';

const overTimeOptions = [
  {
    title: '加班費',
    value: EOvertimeAwardType.Money,
  },
  {
    title: '補休',
    value: EOvertimeAwardType.Dayoff,
  },
]

export default function Overtime(){
  const { overtime, updateOvertime, updateIsProhibitedNext } = useContext(ExporterContext);
  const [showMaxWarning, setShowMaxWarning] = useState<boolean>(false);

  const handleListChange = (list:ISpecialWorkTime[])=>{
    updateOvertime(list);
  }

  useEffect(()=>{
    const total = overtime.reduce((acc, cur)=>acc + cur.hour, 0);
    let value = total > MONTHLY_OVERTIME_LIMIT;
    setShowMaxWarning(value);
    updateIsProhibitedNext(value);
  }, [overtime, updateIsProhibitedNext]);

  return(
    <div className="basic-step-container">
      <div className="step-title-container">新增加班</div>
      <OverTimeEditor
        type={ESpecialWorkHour.Overtime}
        defaultHour={2}
        minHour={0}
        maxHour={8}
        options={overTimeOptions}
        defaultValue={overtime}
        onChange={handleListChange}
        onInvalid={updateIsProhibitedNext}
      />
      <ul className="warning-hint-container">
        {showMaxWarning?<li>{`每月加班不能超過 ${MONTHLY_OVERTIME_LIMIT} 小時!`}</li>:null}
      </ul>
    </div>
  )
}