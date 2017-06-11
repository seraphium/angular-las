/**
 * Created by zezhang on 2017/5/8.
 */
import { User } from './user.model';

export class Unit {
  id: number;
  parent : number;
  children : Array<Unit>;
  owner :number;
  unittypes : number;
  type : number;
  name : string;
  voltage : string;
  phonenum : string;
  backphonenum : string;
  backphoneused : boolean;
  sn : string;
  location : string;
  towerfrom : number;
  towerto : number;
  idintower : number;
  identity : string;
  temperature : number;
  protocolversion : number;
  hardwareversion : number;
  lat : number;
  lng : number;
  unsync : boolean;
  active : boolean;
  operators : Array<number>;
  status : number;
  powerstatus : number;
  gprsstatus : number;
  carrier : number;
  backupcarrier : number;
  vendor : number;
  remark : string;

}

export class UnitAlertSettings {
  id: number;
  unit : Unit;
  alertdistance1 : number;
  alertdistance2 : number;
  alertdistance3 : number;
  picresolution : string;
  picenable : boolean;
  piclightenhance : boolean;
  highsensitivity : boolean;
  beep : boolean;
  weather : boolean;
  mode : number;
  camera1mode : number;
  camera1videoduration  : number;
  camera1videoframerate : number;
  camera1mediainterval  : number;
  camera2mode  : number;
  camera2videoduration  : number;
  camera2videoframerate  : number;
  camera2mediainterval  : number;
  camera3mode : number;
  camera3videoduration  : number;
  camera3videoframerate  : number;
  camera3mediainterval  : number;
}

export class UnitNetworkSettings {
  id: number;
  unit : Unit;
  serverip : string;
  serverport : number;
  transfertype  : number;
  networktype  : number;
  apn : string;
  apnusername : string;
  apnpassword : string;
  timeout : number;
  retrycount : number;
  resetcount : number;
  csq : number;
  networkstatus : number;
}
