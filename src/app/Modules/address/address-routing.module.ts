import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressFormComponent } from './address-form/address-form.component';
import { AddressListComponent } from './address-list/address-list.component';


const routes: Routes = [
  {
    path: '',children: [
  { path: 'form', component: AddressFormComponent },
  { path: 'form/:id', component: AddressFormComponent },
  { path: 'list', component: AddressListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
