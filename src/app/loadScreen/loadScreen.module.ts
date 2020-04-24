import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { loadScreenRoutingModule } from './loadScreen-routing.module';

import { loadScreenComponent } from './loadScreen.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [loadScreenComponent],
  imports: [CommonModule, SharedModule, loadScreenRoutingModule]
})
export class loadScreenModule {}
