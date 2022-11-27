import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListItemComponent} from './list-item.component';
import {of} from 'rxjs';
import {CurrentTabService} from '../../../current-tab.service';
import {By} from '@angular/platform-browser';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let currentTabSpy: any;

  beforeEach(async () => {
    const currentTab = jasmine.createSpyObj('CurrentTabService', ['getCurrentTabSubject','selectTab']);
    currentTabSpy = currentTab.getCurrentTabSubject.and.returnValue(of({
      name: 'Test Tab',
      icon: 'TestIcon'
    }));

    await TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      providers: [{provide: CurrentTabService, useValue: currentTab}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.folder = {
      id: '1',
      name: 'Test folder',
      icon: 'test',
      files: [],
      folders: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be active when selected', () => {
    component.selectedTab = 'Test Tab';
    fixture.detectChanges();
    const listElement = fixture.debugElement.query(By.css('.active'));
    expect(listElement).toBeDefined();
  });

  it('should be not be active when not selected', () => {
    component.selectedTab = 'Random Tab';
    fixture.detectChanges();
    const listElement = fixture.debugElement.query(By.css('.active'));
    expect(listElement).toBeNull();
  });

  it('should select a tab when clicked', () => {
    fixture.debugElement.query(By.css('li'))
      .triggerEventHandler('click', null);
    expect(TestBed.inject(CurrentTabService).selectTab)
      .toHaveBeenCalledWith('Test folder', 'test');
  });
});
