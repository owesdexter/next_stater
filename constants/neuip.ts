export interface IContactInfo{

  email: string;
  mobile: string;
}

export interface IUserInfo{
  company: string,
  department: string,
  position: string,
  staffId: string,
  username: string,
  s_sn: string,
  u_sn: string,
  d_sn: string,
  c_sn: string,
  loginToken: string,
  nickname?: string,
  contactInfo?: string,
}

export class CUserInfo implements IUserInfo{
  readonly company: string;
  readonly department: string;
  readonly position: string;
  readonly staffId: string;
  readonly username: string;
  readonly s_sn: string;
  readonly u_sn: string;
  readonly d_sn: string;
  readonly c_sn: string;
  readonly loginToken: string

  constructor(props: IUserInfo){
    this.company = props.company;
    this.department = props.department;
    this.position = props.position;
    this.staffId = props.staffId;
    this.username = props.username;
    this.s_sn = props.s_sn;
    this.u_sn = props.u_sn;
    this.d_sn = props.d_sn;
    this.c_sn = props.c_sn;
    this.loginToken = props.loginToken;
  }
}

/* The UserInfo
  CUserInfo {
    company: undefined,
    department: '委外事業一部',
    position: '助理工程師',
    staffId: 'R0203',
    username: '陳居仲',
    s_sn: '208428',
    u_sn: '208996',
    d_sn: '25465',
    c_sn: '6607',
    loginToken: '91327634c768f51e124d5de1d408c37d18c5c7739a26f3d4d161728d8e595052'
  }
*/

const fake = {
  company: "易勝資訊",
  department: "委外事業一部",
  headshotPosition: "助理工程師",
  memberId: "R0203",    // u_no: 通訊錄
  username: "陳居仲"
}

// getUserDeptMap List
const Sns = {
  "208996": {
    "s_sn": "208428",   // StaffId: 操作用這個
    "u_sn": "208996",   // UserId: 假期查詢
    "c_sn": "6607",     // CompanyId: Home
    "d_sn": "25465",    // dept_id:
    "g_sn": "0",
    "u_title": "83594",
    "start_date": "2021-04-01",
    "end_date": "0000-00-00",
    "c_name": "陳居仲",
    "d_name": "委外事業一部",
    "title_name": "助理工程師"
  },
}

const contact = {
  "pic": "<img src=\"/shared/avatar?params=szrpyE856YEy7sVcknG9tJkZiHt3K2OGJXy-PMonZBVkWw-iLLoJZGuIlYznzNHE\" class=\"avatar show-image \" style=\"width: 30px; height: 30px;\" alt=\"avatar\" onerror=\"imgError(this);\">",
  "u_no": "R0203",
  "name": "陳居仲",
  "dept": "委外事業一部",
  "position": "助理工程師",
  "email": "owesdexter2011@gmail.com",
  "mobile": "0928039477"
};

const personal_leave = {
  "usr_name": "陳居仲",
  "u_sn": 208996,
  "u_no": "R0203",
  "dept": "委外事業一部",
  "title": "助理工程師",
}


/*  GET Page 假期查詢
<div id="myinfo" class="hide">
  <input type="hidden" id="my_deptsn" value="208428">
  <input type="hidden" id="my_dept" value="25465">
  <input type="hidden" id="my_cmpny" value="6607">
  <input type="hidden" id="my_sn" value="208996">
  <input type="hidden" id="allowApplyForOther" value="0">
</div>
*/

/* Search Cookies Index
  假期: {
    Search_44_FLayer=6607;
    Search_44_SLayer=6607_25465;
    Search_44_TLayer=6607_25465_208428;
    Search_44_ov2leaveCombineSwitch=on;
    Search_44_ov2leaveCombine=on;
    Search_44_filter_mode=0;
    Search_44_displayDetail=off
  }
  通訊錄: {
    Search_53_FLayer=6607;
    Search_53_SLayer=6607_0;
    Search_53_TLayer=6607_0_0
  }
*/

