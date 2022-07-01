import { useState, useContext, useEffect } from 'react';
import Excel from "exceljs";
import type { Worksheet, Row, CellValue, CellRichTextValue } from "exceljs";
import { ExporterContext } from '../contextProvider/exporter';
import Table, { TThIndexMapping, EThs } from './table';
import { storage } from '../../pages/api/firebase/getFile';
import { ThList, ITh, ALL_ROWS_LENGTH, ALL_COLUMNS_LENGTH } from '../../constants';
import { Console } from 'console';

type TTitles = {
  date: string,
  title: string,
  staffName: string,
  customerName: string
};

export default function Preview(){
  const [table, setTable] = useState<any>([]);
  const [titles, setTitles] = useState<TTitles>();
  const [ths, setThs] = useState<CellValue[]>([]);
  const [content, setContent] = useState<CellValue[][]>([]);
  const [footers, setFooters] = useState<CellValue[][]>([]);
  const [indexMapping, setIndexMapping] = useState<TThIndexMapping>({
    date: 0,
    day: 1,
    checkInTime: 2,
    checkOutTime: 3,
    normalWorkHours: 4,
    note: 9,
  });

  const { generalWorkTime, worksheet } = useContext(ExporterContext);

  // const importantAddress = {
  //   staffName: 'C2',
  //   startTime: 'C4',
  // }

  // const importantRowIdx = {
  //   title: 1,
  //   header: 2,
  //   th: 3,
  //   inputEnd: 35,
  // }

  const test = ()=>{
    console.log()
    console.log('title', titles)
    console.log('ths', ths)
    console.log('content', content)
    console.log('footer', footers)
  }

  useEffect(()=>{
    if(!worksheet){
      return
    }
    let startCol = 1;
    let startRow = 1;
    const importantRowIdx = {
      title: 1,
      header: 2,
      th: 3,
      inputEnd: 35,
    }

    for(let i=1; i<ALL_COLUMNS_LENGTH; i++){
      if(!worksheet.getColumn(i)){
        startCol ++;
        continue
      }
      const values = worksheet.getColumn(i).values as CellValue[];
      if(!values.find(el=>el)){
        startCol ++;
        continue
      }else{
        for(let j=0; j<values.length; j++){
          if(!values[j]){
            continue
          }else if(`${values[j]}`.includes('年')){
            importantRowIdx.title = j;
          }else if(`${values[j]}`.includes('姓名')){
            importantRowIdx.header = j;
          }else if(`${values[j]}`.includes('日期')){
            importantRowIdx.th = j;
          }else if(typeof values[j] !== 'number'){
            importantRowIdx.inputEnd = j;
            break
          }
        }
        break
      }
    }

    const titles: TTitles = {
      date: '',
      title: '',
      staffName: '',
      customerName: ''
    };
    const titleArr = [] as Row[];
    const thArr = [] as Row[];
    const contentArr = [] as Row[];
    const footerArr = [] as Row[];


    for(let i = 0; i<ALL_ROWS_LENGTH; i++){
      const row = worksheet.getRow(i);
      const values = worksheet.getRow(i).values as CellValue[];
      if(!values.find(el=>(el && el!==0))){
        startRow ++;
      }else{
        // Titles: 易勝資訊人員工時表、人員姓名、客戶單位名稱、工時表月份
        if(i===importantRowIdx.title || i===importantRowIdx.header){
          console.log('values', values)

          // for(let j=1; j<values.length; j++){
          //   // row.eachCell((cell, colNumber)=>{
          //   //   const index = values.indexOf(values[j]);
          //   //   if(j !== index){
          //   //     console.log(`   ORI: ${row.getCell(j).value}, ${values[j]}, j: ${j}, index: ${index}, ${j !== index}`)
          //   //     if(row.getCell(j)){
          //   //       row.getCell(j).value = '';
          //   //     }
          //   //   }
          //   // })
          //   // const index = values.indexOf(values[j]);
          //   // console.log(`${values[j]}, j: ${j}, index: ${index}, ${j !== index}`)
          //   //   // console.log(`if: ${j !== index}`)
          //   // if(j !== index){
          //   //   // console.log(`   ORI: ${row.getCell(j).value}, ${values[j]}, j: ${j}, index: ${index}, ${j !== index}`)
          //   //   if(row.getCell(j)){
          //   //     row.getCell(j).value = '';
          //   //   }
          //   //   if(row.getCell(index)){
          //   //     row.getCell(index).value = '';
          //   //   }
          //   // }else{
          //   //   if(row.getCell(j)){
          //   //     row.getCell(j).value = values[j];
          //   //   }
          //   // }
          //   // if(`${values[j]}`.includes('年') || `${values[j]}`.includes('月')){
          //   //   titles.date = (`${values[j]}`).trim();
          //   // }else if(`${values[j]}`.includes('工時表')){
          //   //   titles.title = (`${values[j]}`).trim();
          //   // }else if(`${values[j]}`.includes('姓名')){
          //   //   titles.staffName = (`${values[j]}`).trim();
          //   // }else if(`${values[j]}`.includes('客戶')){
          //   //   titles.customerName = (`${values[j]}`).trim();
          //   // }
          // }
          titleArr.push(row);

        // Ths: 日期、上下班時間等工時表表頭
        }else if(i===importantRowIdx.th){
          for(let j=1; j<values.length; j++){
            if (
              values[j] &&
              typeof values[j] === 'object' &&
              !Array.isArray(values[j])
            ) {
              let result = '';
              const obj = values[j] as CellRichTextValue;
              if(obj?.richText){
                result = obj.richText.reduce((pre, cur)=>pre + cur.text, '');
              }
              if(row.getCell(j)){
                row.getCell(j).value = result;
              }
            }
          }
          thArr.push(row);
          setThs(values);

        // Footers: 小計、工時總計、簽名、等
        }else if(i>=importantRowIdx.inputEnd){
          for(let j=1; j<values.length; j++){
            if(!values[j]){
              if(row.getCell(j)){
                row.getCell(j).value = '';
              }
              // values[j] = '';
            }
          }
          footerArr.push(row);
          // footersArr.push(values);

        // 工時表主要內容: 每日出席編輯、填寫
        }else{
          for(let j=1; j<values.length; j++){
            if(!values[j]){
              if(row.getCell(j)){
                row.getCell(j).value = '';
              }
              // values[j] = '';
            }
          }
          contentArr.push(row);
          // content.push(values);
        }
      }
      // setTitles(titles);
      // setContent(content);
      // setFooters(footersArr);
    }
    titleArr.forEach(el=>{console.log(el.values)})
    console.log('')
    console.log('')
    const arr = [];
    worksheet?.eachRow((row, rowNumber)=>{
      arr.push(row);
    })
    setTable(arr);
              // thArr.forEach(el=>{console.log(el.values)})
    // contentArr.forEach(el=>{console.log(el.values)})
    // footerArr.forEach(el=>{console.log(el.values)})
  }, [worksheet])

  return(
    <div className="worksheet-container">
      <button onClick={test}>
        TEST
      </button>
      <ul className="title-row">
        <li className="date">{titles?.date ? titles.date : ''}</li>
        <li className="title">{titles?.title ? titles.title : ''}</li>
      </ul>
      <ul className="header-row">
        <li className="staff-name">{titles?.staffName ? titles.staffName : ''}</li>
        <li className="customer-name">{titles?.customerName ? titles.customerName : ''}</li>
      </ul>
      <table className="worksheet">
        <thead>
          <tr>
            {ths.map((th,idx)=>(
              <th key={`${th}`} className="th">{`${th}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.map((row, idx)=>(
            <tr key={idx}>
              {row.values.map((el, idx)=>{
                if(el &&
                  typeof el === 'object' &&
                  !Array.isArray(el)){
                    return <td key={idx}>obj</td>
                }else if(!el){
                  return <td key={idx}>empty</td>
                }else{
                  return <td key={idx}>{el}</td>
                }

              })}
            </tr>
          ))}
          {/* {content?.map((row,idx)=>(
            <>
              <Table data={row} indexMapping={indexMapping} />
            </>
          ))} */}
        </tbody>
      </table>

      {/* <RowEditor></RowEditor> */}
    </div>
  )
}