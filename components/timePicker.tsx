// import SingleDropdown from '../components/dropdown/rrsSingle';
import { useState, KeyboardEvent } from 'react';
interface ITimePickerProps{
  hUpperLimit?: number,
  hLowerLimit?: number,
  mUpperLimit?: number,
  mLowerLimit?: number,
  pickMinuteBySelect?: boolean,
  idSuffix?: string,
}
export default function TimePicker({ hLowerLimit=0, hUpperLimit=23, mLowerLimit=0, mUpperLimit=59, idSuffix='0', pickMinuteBySelect }: ITimePickerProps){
  const [hr, setHr] = useState<string>(`${hLowerLimit}`);
  const [minute, setMinute] = useState<string>(mLowerLimit<10? `0${mLowerLimit}`: `${mLowerLimit}`);

  const hours:string[] = [];
  const minutes:string[] = [];

  if(pickMinuteBySelect){
    for(let i = mLowerLimit; i <= mUpperLimit; i++){
      if(i<10){
        minutes.push(`0${i}`);
      }
      minutes.push(`${i}`);
    }
  }

  for(let i = hLowerLimit; i <= hUpperLimit; i++){
    // if(i<10){
    //   hours.push(`0${i}`);
    // }
    hours.push(`${i}`);
  }

  // onKeyUp Event
  // const handleKeyUp = (e: KeyboardEvent<HTMLElement>)=>{
  //   const value = parseInt(e.key);
  //   // console.log(e.target);
  //   console.log(value, value>=60, value<0);
  //   if(value>=60 || value<0){
  //     setMinute('00');
  //   }
  // }

  const handleMinuteInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = parseInt(e.target.value);
    // console.log(e.target);
    console.log(value, value>=60, value<0);
    if(value>=60 || value<0){
      setMinute('00');
    }else {
      setMinute(e.target.value);
    }
  }

  return(
    <div className="timepicker">
      {/* <label htmlFor={`hr-select-${idSuffix}`}> */}
        {/* <SingleDropdown
          data={[{
            text: '1',
            value: '1',
          },
          {
            text: '2',
            value: '2',
          }]}
        /> */}
        {/* <select
          value={hr}
          name={`hr-select-${idSuffix}`}
          id={`hr-select-${idSuffix}`}
          data-testid={`hr-select-${idSuffix}`}
        >
          {hours?.map(el=>{
            return(
              <option value={el} key={`hr-option-${el}`}>{el}</option>
            )
          })}
        </select> */}
      {/* </label> */}
      <span className="divider">:</span>
      <label htmlFor={`minute-select-${idSuffix}`}>
        {pickMinuteBySelect?
          <select
            value={minute}
            id={`minute-select-${idSuffix}`}
            data-testid={`minute-select-${idSuffix}`}
            name={`minute-select-${idSuffix}`}
          >
            {minutes?.map(el=>{
              return(
                <option value={el} key={`minute-option-${el}`}>{el}</option>
              )
            })}
          </select>
          :<input
            type="number"
            id={`minute-select-${idSuffix}`}
            data-testid={`minute-select-${idSuffix}`}
            name={`minute-select-${idSuffix}`}
            value={minute}
            pattern="\d{2}"
            maxLength={2}
            // onKeyUp={handleKeyUp}
            placeholder={minute}
            onChange={handleMinuteInputChange}
          />
        }
      </label>
    </div>
  )
}