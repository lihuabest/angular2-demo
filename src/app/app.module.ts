import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
// import {HotTableModule} from 'ng2-handsontable';

import {AppComponent} from './app.component';
import {AppRoutesModule} from "./app.routers";
import {LoginModule} from "./components/login/login.module";
import {MainModule} from "./components/main/main.module";
import {UiService} from "./services/ui/ui.service";
import {UiConfirmDialogComponent} from "./services/ui/components/confirm/ui.confirm.dialog.component";
import {DataTransferService} from "./services/data.transfer.service";
// import {MdDialogModule} from "@angular/material";
import {ModalModule} from "./services/modal/modal.module";
import {LogService} from "./services/log.service";
import {RequestService} from "./plugins/request.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptor/token.interceptor";
import {ResponseInterceptor} from "./interceptor/response.interceptor";

/**
 NgModule的主要属性如下：
     declarations：模块内部Components/Directives/Pipes的列表，声明一下这个模块内部成员
     providers：指定应用程序的根级别需要使用的service。（Angular2中没有模块级别的service，所有在NgModule中声明的Provider都是注册在根级别的Dependency Injector中）
     imports：导入其他module，其它module暴露的出的Components、Directives、Pipes等可以在本module的组件中被使用。比如导入CommonModule后就可以使用NgIf、NgFor等指令。
     exports：用来控制将哪些内部成员暴露给外部使用。导入一个module并不意味着会自动导入这个module内部导入的module所暴露出的公共成员。除非导入的这个module把它内部导入的module写到exports中。
     bootstrap：通常是app启动的根组件，一般只有一个component。bootstrap中的组件会自动被放入到entryComponents中。
     entryCompoenents: 不会再模板中被引用到的组件。这个属性一般情况下只有ng自己使用，一般是bootstrap组件或者路由组件，ng会自动把bootstrap、路由组件放入其中。 除非不通过路由动态将component加入到dom中，否则不会用到这个属性。
 */
@NgModule({
    declarations: [
        AppComponent,
        UiConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        AppRoutesModule,
        LoginModule,
        MainModule,
        // MdDialogModule,
        ModalModule
    ],
    providers: [
        UiService,
        DataTransferService,
        LogService,
        RequestService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseInterceptor,
            multi: true
        }
    ],
    bootstrap: [
        AppComponent,
        UiConfirmDialogComponent
    ],
    entryComponents: []
})
export class AppModule { }
