/**
 * Created by zezhang on 2017/5/8.
 */

export class BaseReport {
  id: number;
  unit_id : number;
  time :string;
}

export class Report extends BaseReport {

  distance1current : number;
  distance1quota : number;
  distance2current : number;
  distance2quota : number;
  distance3current : number;
  distance3quota : number;
  message : string;
  isalert : boolean;
  ackdetail : string;
  mediaguid : string;
  hasmedia : boolean;
  statusid : number;
  weather : string;


}


export class DeviceReport extends BaseReport {
  temperature: string;
  csq : number;
  mode : number;
  resetcount : number;
  networkstatus  : number;
  protocolversion  : number;
  hardwareversion  : number;
  softwareversion  : number;

  picresolution : string;
  picenable : boolean;
  piclightenhance : boolean;
  highsensitivity: boolean;
  beep: boolean;
  status : boolean;
  powerstatus : boolean;
  gprsstatus : boolean;


}
