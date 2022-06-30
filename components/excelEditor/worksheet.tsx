import { useState, useContext, useEffect } from 'react';
import Excel from "exceljs";
import type { Worksheet, CellValue, CellRichTextValue } from "exceljs";
import { ref, getStorage, getBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { ExporterContext } from '../contextProvider/exporter';
import Row, { TThIndexMapping } from './row';
import { storage } from '../../pages/api/firebase/getFile';
import { getWorksheetName, EXCEL_EXAMPLE_FILE_PATH, ALL_ROWS_LENGTH } from '../../constants';

type TTitles = {
  date: string,
  title: string,
  staffName: string,
  customerName: string
};

export default function Preview(){
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
    // const starsRef = ref(storage, EXCEL_EXAMPLE_FILE_PATH);
    // getBytes(starsRef)
    // .then(async res => {
    //   const workbook = new Excel.Workbook();
    //   await workbook.xlsx.load(res);
    //   const worksheet = workbook.getWorksheet(getWorksheetName(generalWorkTime.targetMonth));

      if(worksheet){
        let contentEnd = false;

        const titles: TTitles = {
          date: '',
          title: '',
          staffName: '',
          customerName: ''
        };
        // const thsArr = [];
        const content = [];
        const footersArr = [];

        for(let i = 0; i<ALL_ROWS_LENGTH; i++){
          const values = worksheet.getRow(i).values as CellValue[];
          values.shift();

          if(i===1 || i===2){
            for(let j=0; j<values.length; j++){
              const index = values.indexOf(values[j]);
              if(index !==j){
                continue
              }
              // titles.push(values[j])
              if(`${values[j]}`.includes('年') || `${values[j]}`.includes('月')){
                titles.date = (`${values[j]}`).trim();
              }else if(`${values[j]}`.includes('工時表')){
                titles.title = (`${values[j]}`).trim();
              }else if(`${values[j]}`.includes('姓名')){
                titles.staffName = (`${values[j]}`).trim();
              }else if(`${values[j]}`.includes('客戶')){
                titles.customerName = (`${values[j]}`).trim();
              }
            }

          }else if(i===3){
            for(let j=0; j<values.length; j++){
              if (
                values[j] &&
                typeof values[j] === 'object' &&
                !Array.isArray(values[j])
              ) {
                const obj = values[j] as CellRichTextValue;
                if(obj?.richText){
                  values[j] = obj.richText.reduce((pre, cur)=>pre + cur.text, '');
                  if(`${values[j]}`.includes('日期')){
                    setIndexMapping(pre=>({
                      ...pre,
                      date: j,
                    }))
                  }else if(`${values[j]}`.includes('星期')){
                    setIndexMapping(pre=>({
                      ...pre,
                      day: j,
                    }))
                  }else if(`${values[j]}`.includes('正常')){
                    setIndexMapping(pre=>({
                      ...pre,
                      normalWorkHours: j,
                    }))
                  }else if(`${values[j]}`.includes('備註')){
                    setIndexMapping(pre=>({
                      ...pre,
                      note: j,
                    }))
                  }
                }
              }
            }
            setThs(values);

          }else if(contentEnd){
            if(!values[0]){
              continue
            }
            footersArr.push(values);

          }else{
            if(!values[0]){
              continue;
            }
            if(typeof values[0] !== 'number'){
              contentEnd = true;
              continue;
            }
            for(let j=0; j<values.length; j++){
              if(!values[j]){
                values[j] = '';
              }
            }
            content.push(values);
          }
        }
        setTitles(titles);
        setContent(content);
        setFooters(footersArr);
      }
    // })
    // .catch((error) => {
    //   // A full list of error codes is available at
    //   // https://firebase.google.com/docs/storage/web/handle-errors
    //   switch (error.code) {
    //     case 'storage/object-not-found':
    //       // File doesn't exist
    //       break;
    //     case 'storage/unauthorized':
    //       // User doesn't have permission to access the object
    //       break;
    //     case 'storage/canceled':
    //       // User canceled the upload
    //       break;

    //     // ...

    //     case 'storage/unknown':
    //       // Unknown error occurred, inspect the server response
    //       break;
    //   }
    // });
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
          {content?.map((row,idx)=>(
            <>
              <Row data={row} indexMapping={indexMapping} />
            </>
          ))}
        </tbody>
      </table>
      {/* <RowEditor></RowEditor> */}
    </div>
  )
}