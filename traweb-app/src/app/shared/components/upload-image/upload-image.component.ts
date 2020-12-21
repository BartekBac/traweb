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
  @Output() imageUploaded = new EventEmitter<any>();
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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const self = this;
    reader.onload = () => {
      self.imageSrc = reader.result;
      self.imageUploaded.emit(reader.result);
    };
    this.imageUploaded.emit(this.imageSrc);
    this.toastService.add({
      severity: 'info',
      summary: 'Image Uploaded',
      detail: 'Name: ' + file.name + '\nSize: ' + file.size / 1000 + ' KB',
      life: 5000,
    });
    this.uploadControl.clear();
  }
}
