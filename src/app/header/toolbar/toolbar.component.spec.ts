import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolbarComponent} from './toolbar.component';
import {of} from 'rxjs';
import {CurrentTabService} from '../../current-tab.service';
import {FileExplorerService} from '../../file-explorer.service';
import {By} from '@angular/platform-browser';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let fileExplorerService: any;
  let currentTabService: any;

  beforeEach(async () => {
    currentTabService = jasmine.createSpyObj('CurrentTabService', ['getCurrentTabSubject', 'createNewFolderInTab']);
    currentTabService.getCurrentTabSubject.and.returnValue(of({
      name: 'Test Tab',
      icon: 'TestIcon'
    }));
    fileExplorerService = jasmine.createSpyObj('FileExplorerService', ['isSectionedTab'] );
    fileExplorerService.isSectionedTab.and.returnValue(true);
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [{provide: CurrentTabService, useValue: currentTabService},
        {provide: FileExplorerService, useValue: fileExplorerService}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click on new folder should not do anything if it\'s a sectioned tab', () => {
    fixture.debugElement.query(By.css('#add_new_folder')).triggerEventHandler('click', null);
    expect(TestBed.inject(FileExplorerService).isSectionedTab).toHaveBeenCalled();
    expect(TestBed.inject(CurrentTabService).createNewFolderInTab).toHaveBeenCalledTimes(0);

  });

  it('click on new folder create a new folder if it\'s not a sectioned tab', () => {
    fileExplorerService.isSectionedTab.and.returnValue(false);
    fixture.detectChanges();
    fixture.debugElement.query(By.css('#add_new_folder')).triggerEventHandler('click', null);
    expect(TestBed.inject(FileExplorerService).isSectionedTab).toHaveBeenCalled();
    expect(TestBed.inject(CurrentTabService).createNewFolderInTab).toHaveBeenCalledTimes(1);
  });
});
