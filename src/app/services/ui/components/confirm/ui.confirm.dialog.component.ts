/**
 * Created by Administrator on 2017/6/9.
 */
import {Component, OnInit} from "@angular/core";
import {DataTransferService} from "../../../data.transfer.service";

@Component({
    selector: 'app-ui-confirm-dialog',
    templateUrl: './ui.confirm.dialog.component.html',
    styleUrls: ['./ui.confirm.dialog.component.scss']
})
export class UiConfirmDialogComponent implements OnInit {

    show: boolean = false;
    title: string | void = '提示';
    content: any = '是否确定删除？';

    constructor(private dataTransferService: DataTransferService) {}

    ngOnInit() {
        this.dataTransferService.confirmDialog.subscribe(res => {
            if (res['show']) {
                this.show = true;
                this.content = res['content'];
                this.title = res['title'];
            } else {
                this.show = false;
            }
        });
    }

    ok() {
        this.dataTransferService.confirmDialogData.next(true);
    }

    cancel() {
        this.dataTransferService.confirmDialogData.next(false);
    }
}
