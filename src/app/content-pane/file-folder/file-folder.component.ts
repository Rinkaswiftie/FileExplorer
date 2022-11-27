import {Component, Input, OnInit} from '@angular/core';
import {FileSelectionService} from '../file-selection.service';
import {FileExplorerService} from '../../file-explorer.service';
import {CurrentTabService} from '../../current-tab.service';

@Component({
  selector: 'app-file-folder',
  templateUrl: './file-folder.component.html',
  styleUrls: ['./file-folder.component.css']
})
export class FileFolderComponent implements OnInit {
  @Input() fId: string;
  @Input() title: string;
  @Input() icon: string;
  @Input() isFile: boolean;
  selected = false;
  fileRename = false;
  fileName = '';
  private tab: string;

  constructor(private selectionService: FileSelectionService,
              private fileService: FileExplorerService,
              private currentTab: CurrentTabService) {
  }

  ngOnInit(): void {
    this.fileName = this.title;
    this.selectionService.selectedFile().subscribe(fileID => {
      this.selected = fileID === this.fId;
      if (!this.selected) {
        this.fileRename = false;
      }
    });
    this.currentTab.getCurrentTabSubject()
      .subscribe(tab => this.tab = tab.name);
    this.currentTab.getNewFolderObservable().subscribe(id => {
      if (this.title === id) {
        this.selectionService.selectedFile().next(this.fId);
        this.fileRename = true;
      }
    });
  }

  clicked(input: HTMLInputElement) {
    if (this.selected && !this.fileRename) {
      this.fileRename = true;
      input.focus();
    }
    this.selectionService.selectedFile().next(this.fId);
  }

  renameFile() {
    this.fileRename = false;
    const nameChanged = this.fileName !== this.title;
    if (nameChanged) {
      this.fileService.renameFile(this.tab, this.title, this.fileName, this.isFile);
    }
  }

}
