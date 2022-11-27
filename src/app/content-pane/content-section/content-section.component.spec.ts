import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContentSectionComponent} from './content-section.component';
import {By} from '@angular/platform-browser';
import {FileFolderComponent} from '../file-folder/file-folder.component';
import {CurrentTabService} from '../../current-tab.service';
import {FileSelectionService} from '../file-selection.service';
import {FileExplorerService} from '../../file-explorer.service';
import {BehaviorSubject, of} from 'rxjs';

describe('ContentSectionComponent', () => {
  let component: ContentSectionComponent;
  let fixture: ComponentFixture<ContentSectionComponent>;
  const sectionTitle = 'Test Section';

  beforeEach(async () => {
    const currentTab = jasmine.createSpyObj('CurrentTabService', ['getCurrentTabSubject']);
    currentTab.getCurrentTabSubject.and.returnValue(of({
      name: 'Test Tab',
      icon: 'TestIcon'
    }));
    const fileSelectionService = jasmine.createSpyObj('FileSelectionService', ['selectedFile']);
    fileSelectionService.selectedFile.and.returnValue(new BehaviorSubject<string>('2'));
    const fileExplorerService = jasmine.createSpyObj('FileExplorerService', ['renameFile']);

    await TestBed.configureTestingModule({
      declarations: [ContentSectionComponent, FileFolderComponent],
      providers: [
        {provide: CurrentTabService, useValue: currentTab},
        {provide: FileSelectionService, useValue: fileSelectionService},
        {provide: FileExplorerService, useValue: fileExplorerService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSectionComponent);
    component = fixture.componentInstance;
    component.section = {
      id: '',
      name: sectionTitle,
      files: [],
      folders: [{
        id: '1',
        name: 'Test folder',
        files: [],
        folders: []
      }]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display sections if not a sectioned display', () => {
    component.sectionedDisplay = false;
    fixture.detectChanges();
    const elem = fixture.debugElement.query(By.css('div.content-header'));
    expect(elem).toBeFalsy();
  });

  it('should display sections if a sectioned display', () => {
    component.sectionedDisplay = true;
    fixture.detectChanges();
    const elem = fixture.debugElement.query(By.css('div.content-header'));
    expect(elem).toBeTruthy();
  });

  it('should display section name and count correctly', () => {
    const expectedTitle = sectionTitle + ` - (1)`;
    component.sectionedDisplay = true;
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('span:last-child')).nativeElement.innerText;
    expect(title).toContain(expectedTitle);
  });
});
