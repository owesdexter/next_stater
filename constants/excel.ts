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
export const ALL_COLUMNS_LENGTH = 11;

export enum EThs {
  Date = 'date',
  Day = 'day',
  CheckInTime = 'checkInTime',
  CheckOutTime = 'checkOutTime',
  NormalWorkHours = 'normalWorkHours',
  AbsentHours = 'absentHours',
  LeaveHours = 'leaveHours',
  OverTimeHours = 'overTimeHours',
  ActualHours = 'actualHours',
  Note = 'note',
};

export interface ITh {
  keyword: string,
  keyName: EThs,
  // col: number
}

export const thKeywordMappingList:ITh[] = [
  {
    keyword: '日期',
    keyName: EThs.Date,
    // col: 1
  },
  {
    keyword: '開始',
    keyName: EThs.CheckInTime,
    // col: 2
  },
  {
    keyword: '結束',
    keyName: EThs.CheckOutTime,
    // col: 2
  },
  {
    keyword: '正常',
    keyName: EThs.NormalWorkHours,
    // col: 3
  },
  {
    keyword: '缺勤',
    keyName: EThs.AbsentHours,
    // col: 4
  },
  {
    keyword: '換休',
    keyName: EThs.LeaveHours,
    // col: 5
  },
  {
    keyword: '加班',
    keyName: EThs.OverTimeHours,
    // col: 6
  },
  {
    keyword: '實際',
    keyName: EThs.ActualHours,
    // col: 7
  },
  {
    keyword: '備註',
    keyName: EThs.Note,
    // col: 8
  },
]

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

// export enum EThKeywords {
//   Date = '日期',
//   Day = '星期',
//   CheckInTime = '開始',
//   CheckOutTime = '結束',
//   NormalWorkHours = '正常',
//   AbsentHours = '缺勤',
//   LeaveHours = '補休',
//   OverTimeHours = '加班',
//   ActualHours = '實際',
//   Note = '備註',
// };

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


// class CThList{
//   constructor(
//     private list: ITh[] = ThList
//   ){}

//   sortByCol(){
//     this.list.sort((pre, cur)=>( pre.col - cur.col ));
//   }

//   findEl(keyword:string){
//     this.list.find(el=>keyword.includes(el.title));
//   }

//   updateEl(title:string, keyword: string, keyname:string, value:string){
//     const target = this.list.find(el=>keyword.includes(el.title));
//     // const target = this.findEl(title);
//     // type ObjectKey = keyof typeof ThList[0];
//     if(target){
//       target = value;
//     }
//   }

// }
