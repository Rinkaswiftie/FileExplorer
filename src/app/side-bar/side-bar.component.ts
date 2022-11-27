import {Component, OnInit} from '@angular/core';
import {FolderModel} from '../folder.model';
import {CurrentTabService} from '../current-tab.service';
import {FileExplorerService} from '../file-explorer.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  dropdowns: {
    folders: FolderModel[];
    name: string;
    icon: string;
  }[];

  constructor(private fileService: FileExplorerService) {
  }

  ngOnInit(): void {
    this.dropdowns = this.fileService.getDropdowns();
  }
}
