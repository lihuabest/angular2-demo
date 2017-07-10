/**
 * Created by Administrator on 2017/4/13.
 */
import {Routes, RouterModule} from '@angular/router';

import {NgModule} from '@angular/core';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {MainGuard} from "./components/main/main.guard";

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
    {
        path: 'main',
        component: MainComponent,
        // 路由可否被激活
        canActivate: [MainGuard],
        children: [
            {
                path: '',
                redirectTo: 'form',
                pathMatch: 'full'
            }, {
                path: 'form',
                loadChildren: 'app/module/form/form.module#FormModule',
            }, {
                path: 'dynamic',
                loadChildren: 'app/module/dynamic/dynamic.module#DynamicModule',
            }, {
                path: 'canvas',
                loadChildren: 'app/module/canvas/canvas.module#CanvasModule',
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutesModule {}
