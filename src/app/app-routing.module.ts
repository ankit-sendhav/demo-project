import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { FaceScanComponent } from './face-scan/face-scan.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'add-form',
    pathMatch:'full'
  },
  {
    path:'add-form',
    component:AddFormComponent
  },
  {
    path:'face-scan',
    component:FaceScanComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
