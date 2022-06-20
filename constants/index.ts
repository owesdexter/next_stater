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

export const getWorksheetName = (month: string | number)=>{
  let monthValue = typeof month === 'string' ? month: `${month}`;
  if(parseInt(monthValue)<10){
    monthValue = '0' + monthValue;
  }
  return thisYear + monthValue;
}

export interface IOptions {
  title: string;
  value: string;
}

export enum ESpecialWorkHour {
  Overtime = 'overtime',
  Dayoff = 'dayoff'
}



export const csrfTokenName = 'csrf_token';
export const COMPANY_ID = 'essences';

export enum ELeaveType {
  Annual = 'annual',
  Vaxxed = 'vaxxed',
  Sick = 'sick',
  Personal = 'personal',
  FamilyCare = 'familycare',
  Official = 'Official',
  Marriage  = 'marriage ',
  Funeral = 'funeral',
  Paternity = 'paternity',
}

export const MONTHLY_OVERTIME_LIMIT = 46;
export enum EOvertimeAwardType {
  Money = 'money',
  Dayoff = 'dayoff'
}
