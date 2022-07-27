import { useState, useContext, useEffect } from 'react';
import { ExporterContext, IDayoff } from '../providers/context/exporter'
import DayoffEditor from '../dayoffEditor';
import { ESpecialWorkHour, ELeaveType } from '../../constants';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const dayoffOptions = [
  {
    title: '__t_Annual_leave',
    value: ELeaveType.Annual,
  },
  {
    title: '__t_Vaxxed_leave',
    value: ELeaveType.Vaxxed,
  },
  {
    title: '__t_Sick_leave',
    value: ELeaveType.Sick,
  },
  {
    title: '__t_Personal_leave',
    value: ELeaveType.Personal,
  },
  {
    title: '__t_Familycare_leave',
    value: ELeaveType.Familycare,
  },
  {
    title: '__t_Official_leave',
    value: ELeaveType.Official,
  },
  {
    title: '__t_Marriage_leave',
    value: ELeaveType.Marriage,
  },
  {
    title: '__t_Funeral_leave',
    value: ELeaveType.Funeral,
  },
  {
    title: '__t_Paternity_leave',
    value: ELeaveType.Paternity,
  },
]

type TDayoffProps = {
  onInvalid?: React.Dispatch<React.SetStateAction<boolean>>;
 }

export default function Dayoff({onInvalid}: TDayoffProps){
  const { dayoff, updateDayoff } = useContext(ExporterContext);
  const [showMaxWarning, setShowMaxWarning] = useState<boolean>(false);
  const [showMaxWarning, setShowMaxWarning] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleListChange = (list:IDayoff[])=>{
    updateDayoff(list);
  }

  useEffect(()=>{
    const total = dayoff.reduce((acc, cur)=>acc + cur.hour, 0);
    let value = total > MONTHLY_OVERTIME_LIMIT;
    setShowMaxWarning(value);
    updateIsProhibitedNext(value);
  }, [overtime, updateIsProhibitedNext]);

  useEffect(()=>{
    axios('/api/neuip/getLeaveResouce',{
      withCredentials: true
    })
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
    });
  }, [])

  return(
    <div className="basic-step-container">
      <div className="step-title-container">{t('__t_Add_sth', {sth: t('__t_leave_section')})}</div>
      <DayoffEditor
        type={ESpecialWorkHour.Dayoff}
        defaultHour={2}
        maxHour={8}
        options={dayoffOptions}
        defaultValue={overtime}
        onChange={handleListChange}
      />
    </div>
  )
}