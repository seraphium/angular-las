import {ModuleWithProviders, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReportComponent} from "./report.component";
import {ReportResolver} from "./report-resolver.service";
import {SharedModule} from "../shared/shared.module";
import {ReportService} from "../shared/services/reports.service";

/**
 * Created by zezhang on 2017/5/9.
 */

const reportRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'reports/',
    component: ReportComponent,
    resolve:{
      report: ReportResolver

    }
  }
]);


@NgModule({
  imports: [
    reportRouting,
    SharedModule
  ],
  declarations:  [
  ],
  providers: [
    ReportResolver,
    ReportService
  ]
})
export class ReportModule {}

