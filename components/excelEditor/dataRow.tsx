import type { Row, CellValue } from "exceljs";
import type { Moment } from 'moment';
import { TimePicker } from 'antd';
import moment from 'moment';
import { ExporterContext } from '../providers/context/exporter';
import { useState, useEffect, useContext, ReactNode } from 'react';
import { TThColIdxMapping } from './worksheet';

type TRowProp = {
  row: Row;
  colIdxMapping: TThColIdxMapping
}

export default function DataRow({row, colIdxMapping}: TRowProp){
  const {
    generalWorkTime,
    overtime,
    dayoff,
    isProhibitedNext
  } = useContext(ExporterContext);

  const getDefaultCheckInTime = (): Date=>{
    const { sd, startTime } = generalWorkTime;
    const tmpStartTime = new Date(startTime);
    tmpStartTime.setMinutes(tmpStartTime.getMinutes() + Math.floor(Math.random() * (Math.random() < 0.5 ? -1 : 1) *sd));
    return tmpStartTime;
  }
  const getRespCheckOutTime = (): Date=>{
    const checkOutTime = new Date(checkInTime);
    checkOutTime.setHours(checkOutTime.getHours() + 9);
    return checkOutTime;
  }

  const handleCheckInTimeChange = (value: Moment | null, timeStr: string) => {

  };

  const [checkInTime, setCheckInTime] = useState<Date>(getDefaultCheckInTime());
  const [checkOutTime, setCheckOutTime] = useState<Date>(getRespCheckOutTime());
  const [checkLeaveHours, setLeaveHours] = useState<number>(0);
  const [checkOverTimeHours, setOverTimeHours] = useState<number>(0);

  const renderRow = (): ReactNode[]=>{
    const cells = [] as ReactNode[];
    row.eachCell({ includeEmpty: true }, (cell, colNumber)=>{
      if(colNumber === colIdxMapping.checkInTime){
        cells.push(
          <td>
            <TimePicker
              format={'HH:mm'}
              minuteStep={5}
              defaultValue={moment(`${checkInTime.toLocaleTimeString('en-US', { hour12: false })}`, 'HH:mm')}
              onChange={handleCheckInTimeChange}
              className="checkin-timer"
            />
          </td>
        )
      }else if(colNumber === colIdxMapping.checkOutTime){
        cells.push(
          <td>
            <TimePicker
              format={'HH:mm'}
              minuteStep={5}
              defaultValue={moment(`${checkOutTime.toLocaleTimeString('en-US', { hour12: false })}`, 'HH:mm')}
              onChange={handleCheckInTimeChange}
              className="checkin-timer"
            />
          </td>
        )
      }else if(colNumber === colIdxMapping.absentHours){
        cells.push(
          <td>

          </td>
        )
      }else{
        cells.push(
          <td>{cell.value? `${cell.value}` : null}</td>
        )
      }
    })
    return cells
  }
  // const render
  return(
    <tr>
      {renderRow()}
    </tr>
  )
}