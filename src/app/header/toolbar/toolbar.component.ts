import {Component, OnInit} from '@angular/core';
import {FileExplorerService} from '../../file-explorer.service';
import {CurrentTabService} from '../../current-tab.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  icon: string;
  title: string;

  constructor(private currentTabService: CurrentTabService,
              private fileService: FileExplorerService) {
  }

  ngOnInit(): void {
    this.currentTabService.getCurrentTabSubject().subscribe(tab => {
      this.title = tab.name;
      this.icon = tab.icon;
    });
  }

  addNewFolder() {
    if (this.fileService.isSectionedTab(this.title)) {
      return;
    }
    this.currentTabService.createNewFolderInTab(this.title, this.icon);
  }
}
