/**
 * Created by zezhang on 2017/4/27.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent }from './home.component';
import { SharedModule } from '../shared';
import { HomeAuthResolver } from "./home-auth-resolver.service";
import { UnitbarComponent } from '../shared/unitbar/unitbar.component';
import { UnitService } from '../shared/services/units.service';
import { UnitTypeFilterPipe } from '../shared';
import { UnitParentFilterPipe } from '../shared';
import {ReportModule} from "../reports/report.module";
import {ReportComponent} from "../reports/report.component";
import {UnitinfoComponent} from "../shared/unitinfo/unitinfo.component";
import {SmsService} from "../shared/services";

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path:'',
    component: HomeComponent,
    resolve: {
      isAuthenticated: HomeAuthResolver
    }
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule,
    ReportModule
  ],
  declarations: [
    HomeComponent,
    ReportComponent,
    UnitbarComponent,
    UnitinfoComponent,
    UnitTypeFilterPipe,
    UnitParentFilterPipe
  ],
  providers:[
    UnitService,
    SmsService,
    HomeAuthResolver,
    UnitTypeFilterPipe,
    UnitParentFilterPipe
  ]
})
export class HomeModule{}
