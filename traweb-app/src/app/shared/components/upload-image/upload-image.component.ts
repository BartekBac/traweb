import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  @Input() imgWidth = 300;
  @Input() showContent = true;
  @Input() imageSrc: any = null;
  @Output() imageUploaded = new EventEmitter<File>();
  @ViewChild('uploadControl') uploadControl: FileUpload;

  mode = 'advanced';

  constructor(private toastService: MessageService) {}

  ngOnInit(): void {
    if(this.showContent) {
      this.mode = 'advanced';
    } else {
      this.mode = 'basic';
    }
  }

  onUpload(event: any): void {
    let file: File;
    file = event.files[0];
    const self = this;
    this.imageUploaded.emit(file);
    this.uploadControl.clear();
  }
}
