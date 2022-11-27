import { Component, OnInit } from '@angular/core';
import {CurrentTabService} from '../current-tab.service';
import {FileModel} from '../file.model';
import {FolderModel} from '../folder.model';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  currentTabIcon: string;
  currentTabName: string;

  constructor(private currentTab: CurrentTabService) {
  }

  ngOnInit(): void {
    this.currentTab.currentTab$.subscribe(tab => {
      this.currentTabName = tab.name;
      this.currentTabIcon = tab.icon;
    });
  }
}
