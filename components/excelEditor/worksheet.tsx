import { useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import type { Row, Column, CellValue, CellRichTextValue, CellFormulaValue } from "exceljs";
import { ExporterContext } from '../providers/context/exporter';
import { thKeywordMappingList, EThs, ALL_COLUMNS_LENGTH } from '../../constants';
import { useSelector } from "react-redux";
import { useTranslation } from 'next-i18next';

const initRowIdxMapping = {
  title: 1,
  staffinfo: 2,
  th: 3,
  inputStart: 4,
  inputEnd: 35,
  signature: 39
}

type TThColIdxMapping = {
  [key in EThs]: number;
};

const initColIdxMapping: TThColIdxMapping = {
  date: 1,
  day: 2,
  checkInTime: 3,
  checkOutTime: 4,
  normalWorkHours: 5,
  absentHours: 6,
  leaveHours: 7,
  overTimeHours: 8,
  actualHours: 9,
  note: 10,
}

export default function Preview(){
  const userInfo = useSelector((state:any) => state.user);
  const { t } = useTranslation();
  const [header, setHeader] = useState<Row[]>();
  const [content, setContent] = useState<Row[]>([]);
  const [footer, setFooter] = useState<Row[]>([]);
  const [rowIdxMapping, setRowIdxMapping] = useState<{[key:string]: number}>(initRowIdxMapping);
  const [colIdxMapping, setColIdxMapping] = useState<TThColIdxMapping>(initColIdxMapping);
  const { worksheet } = useContext(ExporterContext);

  const test = ()=>{
    console.log()
    console.log(header)
    console.log(content)
    console.log(footer)
    console.log(userInfo)
  }

  const renderCellText = (value: any): string=>{
    if (!value) {
      return '';

    }else if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      const obj = value as any;
      if(obj?.richText){
        let result = value as CellRichTextValue;
        return result.richText.reduce((pre, cur)=>pre + cur.text, '');

      }else if(obj?.formula){
        let result = value as CellFormulaValue;
        return (`${result.result}`);
      }else{
        return `${value}`
      }
    }else {
      return `${value}`
    }
  }

  const getImpColIndex = useCallback((row: Row)=>{
    row.eachCell((row, colNumber)=>{
      const value = renderCellText(row.value);
      const target = thKeywordMappingList.find(el=>value.includes(el.keyword));
      if(target){
        setColIdxMapping(pre=>({
          ...pre,
          [target.keyName]: colNumber
        }))
      }
    })
  }, [])

  useEffect(()=>{
    if(!worksheet){
      return
    }
    let impRowIdxTmp = initRowIdxMapping;

    for(let i=1; i<ALL_COLUMNS_LENGTH; i++){
      if(!worksheet.getColumn(i)){
        continue
      }
      const values = worksheet.getColumn(i).values as CellValue[];
      if(!values.find(el=>el)){
        continue
      }

      for(let j=0; j<values.length; j++){
        if(!values[j]){
          continue
        }else if(`${values[j]}`.includes('年')){
          impRowIdxTmp.title = j;

        }else if(`${values[j]}`.includes('姓名')){
          impRowIdxTmp.staffinfo = j;

        }else if(`${values[j]}`.includes('日期')){
          impRowIdxTmp.th = j;
          impRowIdxTmp.inputStart = j + 1;
          getImpColIndex(worksheet.getRow(j));

        }else if(`${values[j]}`.includes('簽名')){
          impRowIdxTmp.signature = j;

        }else if(typeof values[j] !== 'number'){
          impRowIdxTmp.inputEnd = j;
          break
        }
      }

      setRowIdxMapping({
        ...impRowIdxTmp,
      });
      break
    }

    const headerTr: Row[] = [];
    const content: Row[] = [];
    const footer: Row[] = [];

    worksheet.eachRow((row, rowNumber)=>{
      if(rowNumber <impRowIdxTmp.inputStart) {
        headerTr.push(row);

      }else if(rowNumber > impRowIdxTmp.inputEnd){
        footer.push(row);

      }else{
        content.push(row);

      }
    })
    setHeader(headerTr);
    setContent(content);
    setFooter(footer);

  }, [worksheet, getImpColIndex])

  // useEffect(()=>{
  //   if(!worksheet){
  //     return
  //   }
  //   let impAddress = initImpAddress;

  //   for(let i=1; i<ALL_COLUMNS_LENGTH; i++){
  //     if(!worksheet.getColumn(i)){
  //       continue
  //     }
  //     const values = worksheet.getColumn(i).values as CellValue[];
  //     for(let j=0; j<values.length; j++){

  //       if(!values.find(el=>el)){
  //         continue

  //       }else if(`${values[j]}`.includes('客戶')){
  //         impAddress.custom = `${String.fromCharCode(i+64+2)}${j}`;

  //       }else if(`${values[j]}`.includes('姓名')){
  //         impAddress.userName = `${String.fromCharCode(i+64+2)}${j}`;
  //       }
  //     }
  //   }
  //   setCellAddrMapping({
  //     ...impAddress,
  //   });
  // }, [worksheet])

  const renderRow = (rowType:string='data', row: Row): ReactNode[]=>{
    const cells = [] as ReactNode[];
    let colspan = 0;

    if(rowType === 'title'){
      let element = null;
      const values = row.values as CellValue[];

      if(values?.length){
        for(let i = 1; i < values.length; i++){
          const value = values[i]?`${values[i]}`: '';

          if(value){
            const index = values.lastIndexOf(value);
            if(index !== i){
              colspan = index - i + 1;
              element = (
                <th key={`${rowType}-${value}-${i}`} className="th" colSpan={colspan}>{value}</th>
              )
              if(index+1>=values.length){
                cells.push(element)
                break

              }else{
                i= index + 1;
              }
            }else{
              element = (
                <th key={`${rowType}-${value}-${i}`} className="th">{value}</th>
              )
            }
          }else{
            element = (
              <th key={`${rowType}-empty-${i}`} className="th"></th>
            )
          }
          cells.push(element)
        }
      }
    }else if(rowType === 'staffInfo'){
      let element = null;
      const values = row.values as CellValue[];

      if(values?.length){
        for(let i = 1; i < values.length; i++){
          const value = values[i]?`${values[i]}`: '';

          if(value){
            // const unKnown = t('__t_Unknown');
            // console.log('User Name:', userInfo.username, userInfo.username ?? t('__t_Unknown'));
            if(value.includes('姓名')){
              row.getCell(i+1).value = userInfo.username ?? t('__t_Unknown');

            }else if(value.includes('客戶')){
              // row.getCell(i).value = userInfo?.additionalInfo?.serveUnit ?
              // t('__t_Serve_Unit', {serveUnit: userInfo.additionalInfo.serveUnit}):
              // t('__t_Serve_Unit', {serveUnit: 'Unkown'});
            }
            element = (
              <th key={`${rowType}-${value}-${i}`} className="staff-info">{value}</th>
            )
          }else{
            element = (
              <th key={`${rowType}-empty-${i}`} className="th"></th>
            )
          }
          cells.push(element)
        }
      }
    }else{
      row.eachCell({ includeEmpty: true }, (cell, colNumber)=>{
        let element = null;
        const displayText = renderCellText(cell.value);
        const key = `${rowType}-${displayText}-${cell.fullAddress.address}`;

        if(rowType === 'th'){
          element = (
            <th key={key} className="th">{displayText}</th>
          )
        }else{
          element = (
            <td key={key}>{displayText}</td>
          )
        }
        cells.push(element);
      })
    }

    return cells
  }

  return(
    <div className="worksheet-container">
      <button onClick={test}>
        TEST
      </button>
      <table className="worksheet">
        <thead>
          {header?.length? header.map((row, idx)=>{
            if((idx+1) === rowIdxMapping.title){
              return (
                <tr key={`title-${idx}`}>
                  {renderRow('title', row)}
                </tr>
              )
            }else if((idx+1) === rowIdxMapping.th){
              return (
                <tr key={`th-${idx}`}>
                  {renderRow('th', row)}
                </tr>
              )
            }else{
              return (
                <tr key={`staff-info-${idx}`}>
                  {renderRow('staffInfo', row)}
                </tr>
              )
            }
          }): null}
        </thead>
        <tbody>
          {content?.length? content.map((row, idx)=>(
            <tr key={`content-${idx}`}>
              {renderRow('content', row)}
            </tr>
          )): null}
        </tbody>
      </table>
    </div>
  )
}