import {Component, OnInit} from '@angular/core';
import {CurrentTabService} from '../../current-tab.service';
import {FileModel} from '../../file.model';
import {FolderModel} from '../../folder.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  currentTabIcon: string;
  currentTabName: string;
  suggestions: { name: string, icon: string }[] = [];
  files: FileModel[];
  folders: FolderModel[];
  searchText = '';

  constructor(private currentTab: CurrentTabService) {
  }

  ngOnInit(): void {
    this.currentTab.getCurrentTabSubject().subscribe(tab => {
      this.suggestions = [];
      this.currentTabName = tab.name;
      this.currentTabIcon = tab.icon;
    });
    this.currentTab.getCurrentTabContent().subscribe(tab => {
      this.files = [] as FileModel[];
      this.folders = [] as FolderModel[];
      tab.sections.forEach(section => {
        this.files = this.files.concat(section.files);
        this.folders = this.folders.concat(section.folders);
      });
    });
  }


  searchFiles() {
    if (this.searchText.trim() === '') {
      this.searchText = '';
      this.suggestions = [];
      return;
    }
    const fileSuggestions = this.fileFilter()
      .map(file => {
        return {name: file.name, icon: file.icon};
      });
    const folderSuggestions = this.folderFilter()
      .map(folder => {
        return {name: folder.name, icon: folder.icon};
      });
    this.suggestions = fileSuggestions.concat(folderSuggestions).slice(0, 5);
  }

  searchForward() {
    this.suggestions = [];
    this.currentTab.selectTab(this.currentTabName, this.currentTabIcon, this.searchText.trim());
  }

  cancelSearch() {
    this.searchText = '';
    this.suggestions = [];
    this.currentTab.selectTab(this.currentTabName, this.currentTabIcon);
  }

  private fileFilter() {
    return this.files
      .filter(file => file.name.toUpperCase()
        .includes(this.searchText.trim().toUpperCase()));
  }

  private folderFilter() {
    return this.folders
      .filter(folder => folder.name.toUpperCase()
        .includes(this.searchText.trim().toUpperCase()));
  }

  suggestionSelect(s: { name: string; icon: string }) {
    this.searchText = s.name;
    this.searchForward();
  }
}
