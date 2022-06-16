import { TimePicker, Select, Input, InputNumber } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import type { Moment } from 'moment';
import moment from 'moment';
import { useContext } from 'react';
import { ExporterContext } from '../contextProvider/exporter';
import { getAllMonth } from '../../constants';
import NumericalInput from '../numericalInput';
const { Option } = Select;
const selectableMonths = getAllMonth();

export default function Basic(){
  const { generalWorkTime, setGeneralWorkTime } = useContext(ExporterContext);
  const { sd, startTime, targetMonth } = generalWorkTime;
  // const [name, setName] = useState<string>('');
  // const [time, setTime] = useState<string>('');
  // const [sd, setSd] = useState<number>(generalWorkTime.sd);

  const handleMonthChange = (value: string) => {
    if(setGeneralWorkTime){
      setGeneralWorkTime({
        ...generalWorkTime,
        targetMonth: parseInt(value),
      })
    }
  };

  // const handleNameChange = (value: string) => {
  //   if(setGeneralWorkTime){
  //     setGeneralWorkTime({
  //       ...generalWorkTime,
  //       targetMonth: value,
  //     })
  //   }
  // };

  const handleTimeChange = (value: Moment | null, timeStr: string) => {
    console.log('date', value, timeStr);
    if(setGeneralWorkTime){
      setGeneralWorkTime({
        ...generalWorkTime,
        startTime: value?.toDate() ?? new Date(),
      })
    }
  };

  const handleSdChange = (value: string)=>{
    // console.log(value)
    // const float = parseFloat(value);
    // const value = e.target.value;
    if(setGeneralWorkTime){
      setGeneralWorkTime({
        ...generalWorkTime,
        sd: parseInt(value)
      })
    }
  }

  return(
    <>
      <div>
        <label htmlFor="">建立</label>
        <Select data-testid="month-select-0" defaultValue={`${targetMonth}`} onChange={handleMonthChange}>
          {selectableMonths?.map(el=>
            <Option value={el} key={el}>{el}</Option>
          )}
        </Select>
        <label htmlFor="">月工時表</label>
      </div>
      <div>
        {/* <label htmlFor="">姓名</label>
        <Input
          placeholder="__t_plz_enter_sth"
          prefix={<UserOutlined />}
          id="name-input-0-0"
          data-testid="name-input-0-0"
          value={''}
          disabled
        /> */}
        {/* <input
          type="text"
          id="name-input-0-0"
          data-testid="name-input-0-0"
          name="name-input-0-0"
          value={name}
          placeholder="人員姓名"
          onChange={e=>{setName(e.target.value)}}
        /> */}
      </div>
      <div>
        <label htmlFor="">上班時間</label>
        <TimePicker
          onChange={handleTimeChange}
          format={'HH:mm'}
          minuteStep={5}
          defaultValue={moment(`${startTime.toLocaleTimeString()}`, 'HH:mm')}
          // defaultValue={moment('09:00', 'HH:mm')}
          disabledTime={()=>({
            disabledHours: ()=>[0, 1, 2, 3, 4, 5, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
          })}
          // disabledHours={()=>[0, 1, 2, 3, 4, 5, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}
        />
      </div>
      <div>
        <label htmlFor="sd-input-1-0">&plusmn;</label>
        {/* <InputNumber
          min="0"
          // min={0}
          max="55"
          // max={55}
          // defaultValue="5"
          // defaultValue={5}
          defaultValue={`${sd}`}
          onChange={handleSdChange}
          step={5}
          data-testid="sd-input-1-0"
        /> */}
        <NumericalInput
          value={sd}
          min={0}
          max={55}
          stepAdding={{step: 5, hideStepArrow:true}}
          validationReg={/[-+]?[0-8]?[\.5]?/}
          data-testid="sd-input-1-0"
          onChange={handleSdChange}
        />
        {/* <input
          type="text"
          id="sd-input-1-0"
          data-testid="sd-input-1-0"
          name="sd-input-1-0"
          value={sd}
          pattern="\d{2}"
          maxLength={2}
          placeholder="5"
          onChange={handleSdChange}
        /> */}
        <label htmlFor="sd-input-1-0">分鐘</label>
      </div>
    </>
  )
}