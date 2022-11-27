import {Component, OnInit} from '@angular/core';
import {CurrentTabService} from '../current-tab.service';
import {FileModel} from '../file.model';
import {FolderModel} from '../folder.model';
import {FileSelectionService} from './file-selection.service';

@Component({
  selector: 'app-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.css'],
  providers: [FileSelectionService]
})
export class ContentPaneComponent implements OnInit {
  sectionedDisplay: boolean = false;
  sections: FolderModel[];

  constructor(private currentTabService: CurrentTabService) {
  }

  ngOnInit(): void {
    this.currentTabService
      .getCurrentTabContent()
      .subscribe(
        currentTab => {
          this.sectionedDisplay = currentTab.sectionedDisplay;
          this.sections = currentTab.sections;
        });
  }
}
