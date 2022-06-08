import { TimePicker } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { useState, useContext } from 'react';
import { ExporterContext } from '../contextProvider/exporter'

export default function Basic(){
  const [name, setName] = useState<string>('');
  const [sd, setSd] = useState<string>('5');
  const { generalWorkTime, setGeneralWorkTime } = useContext(ExporterContext)

  const handleTimeChange = (value: Moment | null, timeStr: string) => {
    console.log('date', value);
    // console.log('str', timeStr);

  };

  const handleSdChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    console.log(value);
  }

  // const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
  //   const value = e.target.value;
  //   console.log(value);
  //   setName(value);
  // }

  return(
    <>
      <div>
        <label htmlFor="">姓名</label>
        <input
          type="text"
          id="name-input-0-0"
          data-testid="name-input-0-0"
          name="name-input-0-0"
          value={name}
          placeholder="人員姓名"
          onChange={e=>{setName(e.target.value)}}
        />
      </div>
      <div>
        <label htmlFor="">上班時間</label>
        <TimePicker
          onChange={handleTimeChange}
          format={'HH:mm'}
          defaultValue={moment('00:00', 'HH:mm')}
          minuteStep={5}
        />
      </div>
      <div>
        <label htmlFor="sd-input-1-0">&plusmn;</label>
        <input
          type="text"
          id="sd-input-1-0"
          data-testid="sd-input-1-0"
          name="sd-input-1-0"
          value={sd}
          pattern="\d{2}"
          maxLength={2}
          placeholder="5"
          onChange={handleSdChange}
        />
        <label htmlFor="sd-input-1-0">分鐘</label>
      </div>
    </>
  )
}