import {Component, Input, OnInit} from '@angular/core';
import {FolderModel} from '../../folder.model';
import {CurrentTabService} from '../../current-tab.service';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css']
})
export class DropdownListComponent implements OnInit {
  @Input() dropDownList: {
    folders: FolderModel[];
    name: string;
    icon: string;
  };
  selectedTab: string;

  constructor(private currentTabService: CurrentTabService) {
  }

  ngOnInit(): void {
    this.currentTabService.getCurrentTabSubject().subscribe(tab => {
      this.selectedTab = tab.name;
    });
  }

  selectTab() {
    this.currentTabService.selectTab(this.dropDownList.name, this.dropDownList.icon);
  }
}
