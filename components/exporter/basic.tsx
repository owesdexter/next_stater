import { TimePicker, Select, InputNumber } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState, useContext, useEffect } from 'react';
import { ExporterContext } from '../contextProvider/exporter';
import { getAllMonth } from '../../constants';
import NumericalInput from '../numericalInput';
import { useTranslation } from 'next-i18next';

const { Option } = Select;
const selectableMonths = getAllMonth();

export default function Basic(){
  const { generalWorkTime, updateGeneralWorkTime } = useContext(ExporterContext);
  const { sd, startTime, targetMonth } = generalWorkTime;
  const { t } = useTranslation();

  const handleMonthChange = (value: string) => {
    updateGeneralWorkTime({
      ...generalWorkTime,
      targetMonth: parseInt(value),
    })
  };
  const [showMaxWarning, setShowMaxWarning] = useState<boolean>(false);
  const [showMinWarning, setShowMinWarning] = useState<boolean>(false);

  const handleTimeChange = (value: Moment | null, timeStr: string) => {
    updateGeneralWorkTime({
      ...generalWorkTime,
      startTime: value?.toDate() ?? new Date(),
    })
  };

  const handleSdChange = (value: string)=>{
    updateGeneralWorkTime({
      ...generalWorkTime,
      sd: parseInt(value)
    })
  }

  useEffect(()=>{
    const maxRef = new Date(generalWorkTime.startTime.getTime());
    const minRef = new Date(generalWorkTime.startTime.getTime());
    maxRef.setMinutes(maxRef.getMinutes()+sd);
    minRef.setMinutes(minRef.getMinutes()-sd);

    if(maxRef.getHours()>=9 && maxRef.getMinutes()>30){
      setShowMaxWarning(true);
    }else {
      setShowMaxWarning(false);
    }
    if(minRef.getHours()<=8 && minRef.getMinutes()<45){
      setShowMinWarning(true);
    }else {
      setShowMinWarning(false);
    }
  }, [generalWorkTime, sd]);

  return(
    <div className="basic-step-container">
      <div className="step-title-container">
        <label htmlFor="">{t('__t_Create')}</label>
        <Select data-testid="month-select-0" defaultValue={`${targetMonth}`} onChange={handleMonthChange}>
          {selectableMonths?.map(el=>
            <Option value={el} key={el}>{el}</Option>
          )}
        </Select>
        <label htmlFor="">{t('__t_month_timesheet')}</label>
      </div>
      <div>
      </div>
      <div>
        <label htmlFor="">{t('__t_Check_in_time')}</label>
        <TimePicker
          format={'HH:mm'}
          minuteStep={5}
          defaultValue={moment(`${startTime.toLocaleTimeString()}`, 'HH:mm')}
          disabledTime={()=>({
            disabledHours: ()=>[0, 1, 2, 3, 4, 5, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
          })}
          onChange={handleTimeChange}
        />
      </div>
      <div>
        <label htmlFor="sd-input-1-0">&plusmn;</label>
        <NumericalInput
          value={sd}
          min={0}
          max={55}
          step={5}
          hideStepArrow={true}
          validationReg={/[-+]?[0-8]?[\.5]?/}
          data-testid="sd-input-1-0"
          onChange={handleSdChange}
        />
        <label htmlFor="sd-input-1-0">{t('__t_minute')}</label>
      </div>
      <ul className="warning-hint-container">
        {showMaxWarning?<li>{t('__t_exporter_warning_basic_setup_too_late')}</li>:null}
        {showMinWarning?<li>{t('__t_exporter_warning_basic_setup_too_early')}</li>:null}
      </ul>
    </div>
  )
}