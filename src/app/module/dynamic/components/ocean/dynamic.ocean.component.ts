/**
 * Created by Administrator on 2017/6/6.
 */

import {Component, OnDestroy} from "@angular/core";
import {DataTransferService} from "../../../../services/data.transfer.service";

@Component({
  selector: 'app-dynamic-ocean-component',
  templateUrl: './dynamic.ocean.component.html',
  styleUrls: ['./dynamic.ocean.component.scss']
})
export class AppDynamicOceanComponent implements OnDestroy {
    number = 0;
    input: string;

    unsubscribes = [];

    constructor(private dataTransferService: DataTransferService) {
        let updateNumberSubject = this.dataTransferService.updateNumberSubject.subscribe(data => {
            this.number = data;
        });
        this.unsubscribes.push(updateNumberSubject);
    }

    ngOnDestroy() {
        this.unsubscribes.forEach(u => u.unsubscribe());
    }

    submitClick() {
        debugger
        this.dataTransferService.updateNumber(this.number + Number(this.input));
    }
}
