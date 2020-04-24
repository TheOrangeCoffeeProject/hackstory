import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { loadScreenRoutingModule } from './loadScreen/loadScreen-routing.module';
import { CreditsComponent } from './credits/credits.component';
// import { DetailRoutingModule } from './detail/detail-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loadScreen',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'credits',
    component: CreditsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    loadScreenRoutingModule,
    HomeRoutingModule,
    // DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
