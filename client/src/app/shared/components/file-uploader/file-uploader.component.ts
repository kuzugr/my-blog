import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ArticleService } from '../../services/article.service';

export class FileHolder {
  public pending = false;
  public serverResponse: { status: number; response: any };

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Output() uploadFinished = new EventEmitter<FileHolder>();

  disabled: boolean;
  url: String;
  uploadedFiles: Array<String>;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.disabled = false;
    this.uploadedFiles = [];
  }

  onFileChange(files: FileList) {
    if (this.disabled) return;

    this.uploadFiles(files[0]);
  }

  private async uploadFiles(file: File) {
    const img = document.createElement('img');
    img.src = window.URL.createObjectURL(file);

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      (event: any) => {
        const fileHolder: FileHolder = new FileHolder(event.target.result, file);
        this.uploadSingleFile(fileHolder);
      },
      false,
    );
    reader.readAsDataURL(file);
  }

  private uploadSingleFile(fileHolder: FileHolder) {
    fileHolder.pending = true;

    this.articleService.uploadFile(fileHolder.file).subscribe(
      (response) => {
        this.uploadedFiles.push(JSON.parse(response._body).public_url);
        fileHolder.serverResponse = { status: response.status, response };
        fileHolder.pending = false;
        this.uploadFinished.emit(fileHolder);
      },
      (error) => {},
    );
  }
}
