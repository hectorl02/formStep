import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { SubmitComponent } from './submit/submit.component';

const routes: Routes = [
  {
    path:'',
    component:FormComponent
  },
  {
    path:'submit',
    component:SubmitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
