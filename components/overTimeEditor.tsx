import { useState, useEffect, MouseEventHandler } from 'react';
import { ISpecialWorkTime, IOvertime } from './contextProvider/exporter';
import { IOptions, ESpecialWorkHour, DAILY_OVERTIME_LIMIT } from '../constants';
import { DatePicker, Select , Input, Space } from 'antd';
import type { Moment } from 'moment';
import { PlusCircleOutlined } from '@ant-design/icons';
import NumericalInput from './numericalInput';
import moment from 'moment';
import { CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

interface IWorkTimeEditorProps<T>{
  type: ESpecialWorkHour;
  options: IOptions[];
  defaultValue: T[];
  defaultHour: number,
  minHour?: number,
  maxHour?: number,
  weeklyMaxHour?: number,
  monthlyMaxHour?: number
  onChange: (list: T[])=>void
  onInvalid?: (value: boolean)=>void;
}

export default function WorkTimeEditor({
  type,
  options,
  defaultValue,
  defaultHour,
  minHour,
  maxHour,
  onChange,
  onInvalid
}: IWorkTimeEditorProps<ISpecialWorkTime>){
  class CSpecialWorkTime implements ISpecialWorkTime {
    startDate = new Date();
    hour: number;
    type: string;
    reason: string;
    file?: string;

    constructor(props?: ISpecialWorkTime){
      this.startDate = props? props.startDate: new Date();
      this.hour = props? props.hour: defaultHour;
      this.type = props? props.type: options[0].value;
      this.reason = props? props.reason: '';
      this.file = props? props.file: '';
    }
  }

  const [list, setList] = useState<ISpecialWorkTime[]>(defaultValue);

  const checkHasSameDate = (date: Date)=>{
    return list.findIndex(el=>
      el.startDate.toLocaleDateString() === date.toLocaleDateString()
    )
  }


  const createItem = (date:Date = new Date(), counter:number=0)=>{
    const index = checkHasSameDate(date);
    if(index>=0){
      if(counter===0){
        date.setDate(27);
      }else{
        date.setDate(27-counter);
      }
      counter++;
      createItem(date, counter);
      return
    }
    const obj = new CSpecialWorkTime({
      startDate: date,
      hour: defaultHour,
      type: options[0].value,
      reason: ''
    });
    setList(pre=>[...pre, obj]);
  }

  const handleDateChange = (value: Moment | null, dateString:string, item:ISpecialWorkTime, idx:number) => {
    if(!value){
      return
    }
    if(checkHasSameDate(value.toDate())>=0){
      return
    }
    const arr = [...list];
    item.startDate = value.toDate();
    arr.splice(idx, 1, item);
    setList(arr);
  };

  const handleHourChange = (value: string, item:ISpecialWorkTime, idx:number) => {
    const arr = [...list];
    item.hour = parseInt(value);
    arr.splice(idx, 1, item);
    setList(arr);
  };

  const handleTypeChange = (value: string, item:ISpecialWorkTime, idx:number) => {
    const arr = [...list];
    item.type = value;
    arr.splice(idx, 1, item);
    setList(arr);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>, item:ISpecialWorkTime, idx:number) => {
    const arr = [...list];
    item.reason = e.target.value;
    arr.splice(idx, 1, item);
    setList(arr);
  };

  const deleteItem = (idx:number)=>{
    const arr = [...list];
    arr.splice(idx, 1);
    setList(arr);
  };

  useEffect(()=>{
    // console.log('effect', list)
    onChange(list);
  }, [list, onChange])

  return(
    <div className="basic-step-container">
      <ul className="special-worktime-container">
        {list?.length? list.map((el, index)=>(
          <li className="special-worktime-card" key={index}>
            <div className="close-btn-container" onClick={()=>deleteItem(index)}>
              <CloseOutlined />
            </div>
            <div>
              <label htmlFor="">日期</label>
              <DatePicker
                defaultValue={moment(el.startDate.toLocaleDateString(), 'MM/DD/YYYY')}
                format={'YYYY/MM/DD'}
                onChange={(date, dateString)=>handleDateChange(date, dateString, el, index)}
              />
            </div>
            <div>
              <label htmlFor="">申請</label>
              <Select defaultValue={el.type} onChange={(value)=>handleTypeChange(value, el, index)}>
                {options.map(option=>(
                  <Option value={option.value} key={option.title}>{option.title}</Option>
                ))}
              </Select>
              <NumericalInput
                value={el.hour}
                min={minHour}
                max={maxHour}
                maxWarningHint={`一天只能加 ${DAILY_OVERTIME_LIMIT} 小啦`}
                minWarningHint={`拜託不要亂填`}
                onChange={(value)=>handleHourChange(value, el, index)}
                onInvalid={onInvalid}
              />
              <label htmlFor="">小時</label>
            </div>
            <div>
              <label htmlFor="">理由</label>
              <TextArea
                defaultValue={el.reason}
                placeholder="__t_enter_sth"
                autoSize={true}
                onChange={(e)=>handleReasonChange(e, el, index)}
              />
            </div>
          </li>
          )):null
        }
      </ul>
      <PlusCircleOutlined onClick={()=>createItem()} />
    </div>
  )
}