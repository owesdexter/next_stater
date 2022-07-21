import { useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import type { Row, CellValue, CellRichTextValue, CellFormulaValue } from "exceljs";
import { ExporterContext } from '../contextProvider/exporter';
import { thKeywordMappingList, EThs, ALL_COLUMNS_LENGTH } from '../../constants';

type TTitles = {
  date: string,
  title: string,
  staffName: string,
  customerName: string
};

type TThIndexMapping = {
  [key in EThs]: number;
};

export default function Preview(){
  const [title, setTitle] = useState<Row[]>();
  const [content, setContent] = useState<Row[]>([]);
  const [footer, setFooter] = useState<Row[]>([]);
  const [importantRowIdx, setImportantRowIdx] = useState<{[key:string]: number}>({
    title: 1,
    header: 2,
    th: 3,
    inputStart: 4,
    inputEnd: 35,
  });

  const [indexMapping, setIndexMapping] = useState<TThIndexMapping>({
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
  });

  const { generalWorkTime, worksheet } = useContext(ExporterContext);

  const test = ()=>{
    console.log()
    console.log(title)
    console.log(content)
    console.log(footer)
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

  const buildImportantRowIdx = useCallback((row: Row)=>{
    row.eachCell((row, colNumber)=>{
      const value = renderCellText(row.value);
      const target = thKeywordMappingList.find(el=>value.includes(el.keyword));
      if(target){
        setIndexMapping(pre=>({
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
    let importantRowIdxTmp = {
      title: 1,
      header: 2,
      th: 3,
      inputStart: 4,
      inputEnd: 35,
      signature: 39
    }

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
          importantRowIdxTmp.title = j;

        }else if(`${values[j]}`.includes('姓名')){
          importantRowIdxTmp.header = j;

        }else if(`${values[j]}`.includes('日期')){
          importantRowIdxTmp.th = j;
          importantRowIdxTmp.inputStart = j + 1;
          buildImportantRowIdx(worksheet.getRow(j));

        }else if(`${values[j]}`.includes('簽名')){
          importantRowIdxTmp.signature = j;

        }else if(typeof values[j] !== 'number'){
          importantRowIdxTmp.inputEnd = j;
          break
        }
      }

      setImportantRowIdx({
        ...importantRowIdxTmp,
      });

      break
    }

    const titleTr: Row[] = [];
    const content: Row[] = [];
    const footer: Row[] = [];

    worksheet.eachRow((row, rowNumber)=>{
      if(rowNumber <importantRowIdxTmp.inputStart) {
        titleTr.push(row);

      }else if(rowNumber > importantRowIdxTmp.inputEnd){
        footer.push(row);

      }else{
        content.push(row);

      }
    })
    setTitle(titleTr);
    setContent(content);
    setFooter(footer);

  }, [worksheet, buildImportantRowIdx])



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
          {title?.length? title.map((row, idx)=>{
            if((idx+1) === importantRowIdx.title){
              return (
                <tr key={`title-${idx}`}>
                  {renderRow('title', row)}
                </tr>
              )
            }else if((idx+1) === importantRowIdx.th){
              return (
                <tr key={`th-${idx}`}>
                  {renderRow('th', row)}
                </tr>
              )
            }else{
              return (
                <tr key={`other-title-${idx}`}>
                  {renderRow('', row)}
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