import {Component, Input, OnInit} from '@angular/core';
import {FolderModel} from '../../../folder.model';
import {CurrentTabService} from '../../../current-tab.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() folder: FolderModel;
  selectedTab = '';

  constructor(private currentTabService: CurrentTabService) {
  }

  ngOnInit(): void {
    this.currentTabService.getCurrentTabSubject().subscribe(tab => {
      this.selectedTab = tab.name;
    });
  }

  select() {
    this.currentTabService.selectTab(this.folder.name, this.folder.icon);
  }
}
