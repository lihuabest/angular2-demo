import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutesModule} from "./app.routers";
import {LoginModule} from "./components/login/login.module";
import {MainModule} from "./components/main/main.module";
import {UiService} from "./services/ui/ui.service";
import {UiConfirmDialogComponent} from "./services/ui/components/confirm/ui.confirm.dialog.component";
import {DataTransferService} from "./services/data.transfer.service";
import {MdDialogModule} from "@angular/material";
import {ModalService} from "./services/modal/modal.module";

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
        AppRoutesModule,
        LoginModule,
        MainModule,
        MdDialogModule
    ],
    providers: [
        UiService,
        DataTransferService,
        ModalService
    ],
    bootstrap: [
        AppComponent,
        UiConfirmDialogComponent
    ],
    entryComponents: []
})
export class AppModule { }
