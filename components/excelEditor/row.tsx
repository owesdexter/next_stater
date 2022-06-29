import type { CellValue } from "exceljs";
import { useState, useEffect } from 'react';

type TRowProp ={
  data: string[] | CellValue[];
}
export default function Row({data}: TRowProp){
  // const [titles, setTitles] = useState<TTitles>();

  return(
    <tr>
      {data.map((td,idx)=>{
        if(td && typeof td !== 'object'){
          return (
            <td key={idx}>{`${td}`}</td>
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