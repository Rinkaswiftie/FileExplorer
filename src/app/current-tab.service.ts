import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {FolderModel} from './folder.model';
import {FileExplorerService} from './file-explorer.service';
import {v4 as uuidv4} from 'uuid';
import {timeInterval, timeout} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CurrentTabService {

  countInTab$ = new BehaviorSubject<number>(0);
  currentTab$ = new BehaviorSubject<{ name: string, icon: string }>({name: 'Quick Access', icon: 'star'});
  newFolder$ = new Subject<string>();
  currentTabContent$: BehaviorSubject<{
    sectionedDisplay: boolean,
    sections: FolderModel[]
  }>;

  constructor(private folderService: FileExplorerService) {
    const sections: FolderModel[] = this.folderService.getSections('Quick Access');
    this.currentTabContent$ = new BehaviorSubject<{
      sectionedDisplay: boolean,
      sections: FolderModel[]
    }>({
      sectionedDisplay: true,
      sections
    });
    this.announceCount(sections);
  }


  public selectTab(name: string, icon: string, filterText = '') {
    const sectionedPage = filterText === '' && this.folderService.isSectionedTab(name);
    const tabContent = this.folderService.getFilesAndFoldersForAPage(name);

    this.currentTab$.next({name, icon});
    let sections: FolderModel[] = [{
      id: uuidv4(),
      name: '',
      files: tabContent.files
        .filter(f => f.name.toUpperCase()
          .includes(filterText.trim().toUpperCase())),
      folders: tabContent.folders
        .filter(f => f.name.toUpperCase()
          .includes(filterText.trim().toUpperCase()))
    }];

    if (sectionedPage) {
      sections = this.folderService.getSections(name);
    }
    const tabData = {
      sectionedDisplay: sectionedPage,
      sections
    };
    this.currentTabContent$.next(tabData);
    this.announceCount(sections);
  }

  createNewFolderInTab(name: string, icon: string) {
    const newFolderID = this.folderService.createNewFolder(name);
    this.selectTab(name, icon);
    setTimeout(() => {
      this.newFolder$.next(newFolderID);
    });
  }

  getCurrentTabSubject() {
    return this.currentTab$;
  }

  getCountInTab() {
    return this.countInTab$;
  }

  getCurrentTabContent() {
    return this.currentTabContent$;
  }

  getNewFolderObservable() {
    return this.newFolder$;
  }

  private announceCount(sections) {
    let count = 0;
    sections.forEach((section) => {
      count += section.folders.length + section.files.length;
    });
    this.countInTab$.next(count);
  }
}
