/**
 * Created by Administrator on 2017/10/31.
 */
import {Component, OnInit} from "@angular/core";
import {FileItem, FileUploader, FileUploaderOptions} from "ng2-file-upload";

@Component({
    selector: 'app-form-upload-component',
    templateUrl: './form.upload.component.html'
})
export class FormUploadComponent implements OnInit {
    name: string;
    uploader: any;

    constructor() {

    }

    ngOnInit() {
        this.initUploader();
    }

    initUploader() {
        let options: FileUploaderOptions = {
            url: '/rest/xxx',
            autoUpload: false,

        };

        this.uploader = new FileUploader(options);

        this.uploader.onBeforeUploadItem = (file: FileItem) => {
            // let formData = new FormData();
            // formData.append('name', '123');
            // console.log(formData);
            // this.uploader.queue[0].formData.push(formData);

            console.log(file);
        };
    }

    submitClick() {
        this.uploader.setOptions({
            additionalParameter: {
                name: this.name
            }
        });
        this.uploader.uploadAll();
    }
}
