/**
 * Created by Administrator on 2017/4/13.
 */
import {Routes, RouterModule} from '@angular/router';

import {NgModule} from '@angular/core';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  // {
  //   path: 'main',
  //   component: MainComponent,
  //   canActivate: [],
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'form',
  //       pathMatch: 'full'
  //     }, {
  //       path: 'form',
  //       loadChildren: 'app/',
  //       pathMatch: 'full',
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutesModule {}
