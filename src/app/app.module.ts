import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddFormComponent } from "./add-form/add-form.component";
import { FaceScanComponent } from "./face-scan/face-scan.component";
import { HeaderComponent } from "./header/header.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AddDataService } from "./add-data.service";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgHttpLoaderModule } from "ng-http-loader";

@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
    FaceScanComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    NgbModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [AddDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
