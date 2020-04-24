import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { loadScreenComponent } from './loadScreen.component';

const routes: Routes = [
  {
    path: 'loadScreen',
    component: loadScreenComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class loadScreenRoutingModule {}
