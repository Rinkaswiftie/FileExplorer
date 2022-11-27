import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownListComponent } from './dropdown-list.component';
import {of} from 'rxjs';
import {CurrentTabService} from '../../current-tab.service';
import {ListItemComponent} from './list-item/list-item.component';
import {By} from '@angular/platform-browser';

describe('DropdownListComponent', () => {
  let component: DropdownListComponent;
  let fixture: ComponentFixture<DropdownListComponent>;
  let currentTabSpy: any;

  beforeEach(async () => {
    const currentTab = jasmine.createSpyObj('CurrentTabService', ['getCurrentTabSubject','selectTab']);
    currentTab.getCurrentTabSubject.and.returnValue(of({
      name: 'Test Tab',
      icon: 'TestIcon'
    }));
    await TestBed.configureTestingModule({
      declarations: [ DropdownListComponent, ListItemComponent ],
      providers: [{provide: CurrentTabService, useValue: currentTab}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownListComponent);
    component = fixture.componentInstance;
    component.dropDownList = {
      icon: 'star',
      name: 'Quick Access',
      folders: [{
        id: '1',
        name: 'Test folder',
        files: [],
        folders: []
      }]
    };
    component.selectedTab = 'Random folder';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a tab when clicked', () => {
    fixture.debugElement.query(By.css('.drop-down-caption'))
      .triggerEventHandler('click', null);
    expect(TestBed.inject(CurrentTabService).selectTab)
      .toHaveBeenCalledWith('Quick Access', 'star');
  });
});
