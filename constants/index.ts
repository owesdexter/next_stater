export * from './excel';

// const now = new Date();
// const thisROCYear = `${now.getFullYear()-1911}`;
// export const EXCEL_EXAMPLE_FILE_PATH = `timesheet/timesheet-example-${thisROCYear}.xlsx`;

// export const getWorksheetName = (month: string | number)=>{
//   let monthValue = typeof month === 'string' ? month: `${month}`;
//   if(parseInt(monthValue)<10){
//     monthValue = '0' + monthValue;
//   }
//   return thisROCYear + monthValue;
// }

export interface IOptions {
  title: string;
  value: string;
}

export const csrfTokenName = 'csrf_token';
export const COMPANY_ID = 'essences';



