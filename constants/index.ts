const thisYear = '111';
export const excelExampleFileName = 'timesheet/timesheet-example-111.xlsx';
export const getAllMonth = ()=>{
  const arr = [];
  for(let i=1; i <=12; i++){
    arr.push(i);
  }
  return arr;
};

export const getWorksheetName = (month: string | number)=>{
  let monthValue = typeof month === 'string' ? month: `${month}`;
  if(parseInt(monthValue)<10){
    monthValue = '0' + monthValue;
  }
  return thisYear + monthValue;
}