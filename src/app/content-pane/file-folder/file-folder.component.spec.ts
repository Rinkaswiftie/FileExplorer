import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FileFolderComponent} from './file-folder.component';
import {BehaviorSubject, of} from 'rxjs';
import {CurrentTabService} from '../../current-tab.service';
import {FileSelectionService} from '../file-selection.service';
import {FileExplorerService} from '../../file-explorer.service';
import {By} from '@angular/platform-browser';

describe('FileFolderComponent', () => {
  let component: FileFolderComponent;
  let fixture: ComponentFixture<FileFolderComponent>;

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
      declarations: [FileFolderComponent],
      providers: [
        {provide: CurrentTabService, useValue: currentTab},
        {provide: FileSelectionService, useValue: fileSelectionService},
        {provide: FileExplorerService, useValue: fileExplorerService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFolderComponent);
    component = fixture.componentInstance;
    component.fId = '1';
    component.title = 'File 1';
    component.icon = 'file';
    component.isFile = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger a select when clicked', () => {
    fixture.debugElement.query(By.css('div')).triggerEventHandler('click', null);
    expect(TestBed.inject(FileSelectionService).selectedFile)
      .withContext('announce to neighbours that the file has been selected')
      .toHaveBeenCalled();
  });

  it('it should trigger a rename when clicked on a selected file', () => {
    fixture.debugElement.query(By.css('div')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('div')).triggerEventHandler('click', null);
    expect(component.fileRename)
      .withContext('should enable rename for file when clicked')
      .toEqual(true);
    component.fileName = 'New Name';
    fixture.debugElement.query(By.css('input'))
      .nativeElement.dispatchEvent(new Event('focusout'));
    fixture.detectChanges();
    expect(TestBed.inject(FileExplorerService).renameFile)
      .toHaveBeenCalled();

    component.fileName = component.title;
    component.renameFile();
    expect(TestBed.inject(FileExplorerService).renameFile)
      .toHaveBeenCalled();
  });

});
