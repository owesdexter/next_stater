import { useState, useContext, MouseEventHandler } from 'react';
import { ISpecialWorkTime } from './contextProvider/exporter';
import { IOptions, ESpecialWorkHour } from '../constants';
import { DatePicker, DatePickerProps, Input, Space } from 'antd';
import type { Moment } from 'moment';
import { PlusCircleOutlined } from '@ant-design/icons';
import NumericalInput from './numericalInput';
import moment from 'moment';

const { TextArea } = Input;

interface IWorkTimeEditorProps{
  type: ESpecialWorkHour;
  options: IOptions[];
}

export default function WorkTimeEditor({ type, options }: IWorkTimeEditorProps){
  const defaultApplyHour = type===ESpecialWorkHour.Overtime? 2: 8;
  class CSpecialWorkTime implements ISpecialWorkTime {
    startDate = new Date();
    hour: number;
    type: string;
    reason: string;
    file?: string;

    constructor(props?: ISpecialWorkTime){
      this.startDate = props? props.startDate: new Date();
      this.hour = props? props.hour: defaultApplyHour;
      this.type = props? props.type: options[0].value;
      this.reason = props? props.reason: '';
      this.file = props? props.file: '';
    }
  }

  const [list, setList] = useState<ISpecialWorkTime[]>([]);
  const checkHasSameDate = (date: Date)=>{
    // const index = list.findIndex(el=>{
    //   el.startDate.toLocaleDateString() === date.toLocaleDateString();
    // })
    return list.findIndex(el=>{
      el.startDate.toLocaleDateString() === date.toLocaleDateString();
    })
  }


  const createItem:MouseEventHandler<HTMLSpanElement> = ()=>{
    // let obj = {};
    const index = checkHasSameDate(new Date());
    if(index>=0){

      return
    }
    const obj = new CSpecialWorkTime({
      startDate: new Date(),
      hour: defaultApplyHour,
      type: options[0].value,
      reason: ''
    });
    setList(pre=>[...pre, obj]);
  }

  const handleDateChange = (date: Moment | null, dateString:string, item:ISpecialWorkTime) => {
    console.log(date, dateString, item);
  };

  const handleHourChange = (value: string, item:ISpecialWorkTime) => {
    console.log(value, item);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>, item:ISpecialWorkTime) => {
    console.log(e.target.value, item);
  };

  return(
    <div className="basic-step-container">
      <ul className="special-worktime-container">
        {list?.length? list.map((el, index)=>(
          <li className="special-worktime-card" key={index}>
            <span>{el.startDate.toLocaleDateString()}</span>
            <DatePicker
              defaultValue={moment(el.startDate.toLocaleDateString(), 'MM/DD/YYYY')}
              format={'YYYY/MM/DD'}
              onChange={(date, dateString)=>handleDateChange(date, dateString, el)}
            />
            <NumericalInput
              value={el.hour}
              onChange={(value)=>handleHourChange(value, el)}
            />
            <TextArea
              defaultValue={el.reason}
              placeholder="__t_enter_sth"
              autoSize={true}
              onChange={(e)=>handleReasonChange(e, el)}
            />
          </li>
          )):null
        }
      </ul>
      <PlusCircleOutlined onClick={createItem} />
    </div>
  )
}