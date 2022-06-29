const now = new Date();
const thisYear = `${now.getFullYear()-1911}`;
export const EXCEL_EXAMPLE_FILE_PATH = `timesheet/timesheet-example-${thisYear}.xlsx`;
export const getAllMonth = ()=>{
  const arr = [];
  for(let i=1; i <=12; i++){
    arr.push(i);
  }
  return arr;
};

function monthExpression(month: string | number | undefined = now.getMonth()+1){
  let monthValue = typeof month === 'string' ? month: `${month}`;
  if(parseInt(monthValue)<10){
    monthValue = '0' + monthValue;
  }
  return monthValue;
}

export const getWorksheetName = (month: string | number)=>{
  // monthExpression(month);
  return thisYear + monthExpression(month);
}

export const ALL_ROWS_LENGTH = 41;

// export const TIMESHEET_NAME = '易勝資訊人員工時表';
// export const STAFF_NAME = '人員姓名';
// export const CUSTOMER_UNIT_NAME = '客戶單位名稱';
// export const STAFF_SIGNATURE = '員工簽名';
// export const CUSTOMER_SIGNATURE = '客戶簽名確認';

// export const excelTitlesArr = [TIMESHEET_NAME, STAFF_NAME, CUSTOMER_UNIT_NAME];
// export const excelFooterArr = [STAFF_SIGNATURE, CUSTOMER_SIGNATURE];

// export enum ETimesheetTitle {
//   TITLE = '易勝資訊人員工時表',
//   STAFF_NAME = '人員姓名',
//   CUSTOMER_UNIT_NAME = '客戶單位名稱',
//   // STAFF_SIGNATURE = '員工簽名',
//   // CUSTOMER_SIGNATURE = '客戶簽名確認',
// }

// export enum ETimesheetFooter {
//   STAFF_SIGNATURE = '員工簽名',
//   CUSTOMER_SIGNATURE = '客戶簽名確認',
// }