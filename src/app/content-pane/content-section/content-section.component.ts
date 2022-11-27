import {Component, Input, OnInit} from '@angular/core';
import {FileModel} from '../../file.model';
import {FolderModel} from '../../folder.model';
import {sections} from '../../file-data';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.css']
})
export class ContentSectionComponent implements OnInit {
  sectionCount: number;
  @Input() section: FolderModel;
  @Input() sectionedDisplay: boolean;

  constructor() { }

  ngOnInit(): void {
    this.sectionCount = this.section.files.length + this.section.folders.length;
  }
}
