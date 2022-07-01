import type { CellValue } from "exceljs";
import type { Moment } from 'moment';
import moment from 'moment';
import { TimePicker } from 'antd';
import { useState, useEffect } from 'react';

export enum EThs {
  Date = 'date',
  Day = 'day',
  CheckInTime = 'checkInTime',
  CheckOutTime = 'checkOutTime',
  NormalWorkHours = 'normalWorkHours',
  AbsentHours = 'absentHours',
  OverTimeHours = 'overTimeHours',
  ActualHours = 'actualHours',
  Note = 'note',
};

export type TThIndexMapping = {
  [key in EThs]?: number
}

type TRowProp = {
  data: string[] | CellValue[];
  indexMapping: TThIndexMapping
}

export default function Row({data, indexMapping}: TRowProp){

  return(
    <tr>
      {data.map((td,idx)=>{
        if(
          idx === indexMapping.date ||
          idx === indexMapping.day ||
          idx === indexMapping.normalWorkHours ||
          idx === indexMapping.note
        ){
          return (
            <td key={idx}>{`${td}`}</td>
          )
        }else if(idx === indexMapping.checkInTime || idx === indexMapping.checkOutTime){
          return (
            <td>
              {/* <TimePicker
                format={'HH:mm'}
                minuteStep={5}
                defaultValue={moment(`${startTime.toLocaleTimeString()}`, 'HH:mm')}
                disabledTime={()=>({
                  disabledHours: ()=>[0, 1, 2, 3, 4, 5, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                })}
                onChange={handleTimeChange}
              /> */}
            </td>
          )
        }else{
          return (
            <td>
              <span></span>
            </td>
          )
        }
      })}
    </tr>
  )
}