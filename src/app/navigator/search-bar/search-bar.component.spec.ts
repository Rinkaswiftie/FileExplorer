import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchBarComponent} from './search-bar.component';
import {of} from 'rxjs';
import {FolderModel} from '../../folder.model';
import {filesystem} from '../../file-data';
import {CurrentTabService} from '../../current-tab.service';
import {By} from '@angular/platform-browser';


describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  const tabName = 'Desktop';
  const searchText = '';
  const tabIcon = 'TestIcon';

  function setupService(currentTab) {
    currentTab.getCurrentTabSubject.and.returnValue(of({
      name: tabName,
      icon: tabIcon
    }));
    const tabContent = filesystem.find(f => f.name.toUpperCase() === tabName.toUpperCase());

    const sections: FolderModel[] = [{
      id: '',
      name: '',
      files: tabContent.files
        .filter(f => f.name.toUpperCase()
          .includes(searchText.trim().toUpperCase())),
      folders: tabContent.folders
        .filter(f => f.name.toUpperCase()
          .includes(searchText.trim().toUpperCase()))
    }];
    currentTab.getCurrentTabContent.and.returnValue(of({
      sectionedDisplay: false,
      sections
    }));
  }

  beforeEach(async () => {
    const currentTab = jasmine.createSpyObj('CurrentTabService', ['getCurrentTabSubject', 'getCurrentTabContent', 'selectTab']);
    setupService(currentTab);
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      providers: [{provide: CurrentTabService, useValue: currentTab}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    component.searchText = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display tab name in search bar placeholder', () => {
    const placeholder = fixture.nativeElement.querySelector('#searchBox').placeholder;
    expect(placeholder).toContain(tabName);
  });

  it('should display dropdown with suggestions based on search text', () => {
    component.searchText = 'D';
    fixture.debugElement.query(By.css('#searchBox'))
      .nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.suggestions.length)
      .withContext('suggestions should be filled')
      .toEqual(5);
    const dropdown = fixture.nativeElement.querySelector('#dropdown-content');
    expect(dropdown)
      .withContext('should display a dropdown of suggestions')
      .toBeTruthy();
  });

  it('should display search results when clicked on arrow', () => {
    component.searchText = 'D';
    fixture.detectChanges();
    let arrow = fixture.debugElement.query(By.css('#arrow-icon'));
    expect(arrow)
      .withContext('should display an arrow button when search text is input')
      .toBeTruthy();
    arrow.triggerEventHandler('click', null);
    expect(TestBed.inject(CurrentTabService).selectTab)
      .withContext('should trigger an action to filter the tab results')
      .toHaveBeenCalledWith(tabName, tabIcon, component.searchText.trim());
    component.searchText = '';
    fixture.detectChanges();
    arrow = fixture.debugElement.query(By.css('#arrow-icon'));
    expect(arrow)
      .withContext('should not display an arrow button when search text is empty')
      .toBeNull();
  });

  it('should display cancel search results when clicked on cancel icon', () => {
    component.searchText = 'D';
    fixture.detectChanges();
    const cancelButton = fixture.debugElement.query(By.css('#cancel-search'));
    expect(cancelButton)
      .withContext('should display an cancel button when search text is input')
      .toBeTruthy();
    cancelButton.triggerEventHandler('click', null);
    expect(TestBed.inject(CurrentTabService).selectTab)
      .withContext('should trigger an action to remove the filter on the tab results')
      .toHaveBeenCalledWith(tabName, tabIcon);
    const dropdown = fixture.nativeElement.querySelector('#dropdown-content');
    expect(dropdown)
      .withContext('should not display a dropdown of suggestions')
      .toBeNull();
    expect(component.searchText)
      .withContext('clear search text input')
      .toEqual('');
  });

  it('should trigger a tab filter on clicking on a dropdown suggestion', () => {
    component.searchText = 'D';
    component.suggestionSelect({name: 'Folder 1', icon: 'folder'});
    fixture.detectChanges();
    expect(component.searchText)
      .withContext('should filter tab results')
      .toEqual('Folder 1');
    expect(TestBed.inject(CurrentTabService).selectTab)
      .withContext('should filter tab results')
      .toHaveBeenCalledWith(tabName, tabIcon, 'Folder 1');
  });

  it('should do nothing when searched with an empty string', () => {
    component.searchText = '';
    component.searchFiles();
    fixture.detectChanges();
    expect(component.suggestions.length)
      .withContext('suggestions should be empty')
      .toEqual(0);
    component.searchText = 'file';
    component.searchFiles();
    fixture.detectChanges();
    expect(component.suggestions.length)
      .withContext('suggestions should display files')
      .toBeGreaterThan(0);
  });
});

