const now = new Date();
const thisROCYear = `${now.getFullYear()-1911}`;
export const EXCEL_EXAMPLE_FILE_PATH = `timesheet/timesheet-example-${thisROCYear}.xlsx`;
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
  return thisROCYear + monthExpression(month);
}

export const ALL_ROWS_LENGTH = 41;
export const ALL_COLUMNS_LENGTH = 10;

export enum ESpecialWorkHour {
  Overtime = 'overtime',
  Dayoff = 'dayoff'
}

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

export enum EOvertimeAwardType {
  Money = 'money',
  Dayoff = 'dayoff'
}

export const MONTHLY_OVERTIME_LIMIT = 46;
export const DAILY_OVERTIME_LIMIT = 8;

export const fieldNames = {
  TITLE: '易勝資訊人員工時表',
  STAFF_NAME: '人員姓名',
  CUSTOMER_NAME: '客戶單位名稱',
  EXPECTED_WORKHOURS: '應計工時',
  ABSENT_WORKHOURS: '缺勤時數',
  ACTUAL_WORKHOURS: '實際工時',
  LEAVE_WORKHOURS: '換休時數',
  OVERTIME_WORKHOURS: '加班時數',
  STAFF_SIGNATURE: '員工簽名',
  CUSTOMER_SIGNATURE: '客戶簽名確認',
}

export enum ETimesheetFieldNames {
  TITLE = '易勝資訊人員工時表',
  STAFF_NAME = '人員姓名',
  CUSTOMER_NAME = '客戶單位名稱',
  EXPECTED_WORKHOURS = '應計工時',
  ABSENT_WORKHOURS = '缺勤時數',
  ACTUAL_WORKHOURS = '實際工時',
  LEAVE_WORKHOURS = '換休時數',
  OVERTIME_WORKHOURS = '加班時數',
  STAFF_SIGNATURE = '員工簽名',
  CUSTOMER_SIGNATURE = '客戶簽名確認',
}


