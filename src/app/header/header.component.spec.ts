import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {CurrentTabService} from '../current-tab.service';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {ToolbarNavComponent} from './toolbar-nav/toolbar-nav.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const currentTab = jasmine.createSpyObj('CurrentTabService', ['getCurrentTabSubject']);
    currentTab.getCurrentTabSubject.and.returnValue(of({
      name: 'Test Tab',
      icon: 'TestIcon'
    }));
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent, ToolbarNavComponent, ToolbarComponent ],
      providers: [{provide: CurrentTabService, useValue: currentTab}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title and icon from input', () => {
    const title = fixture.nativeElement.querySelector('#title').innerText;
    expect(title)
      .withContext('title must match')
      .toEqual('Test Tab');

    const icon = fixture.debugElement.query(By.css('span:first-child')).nativeElement.innerText;
    expect(icon)
      .withContext('title must match')
      .toEqual('TestIcon');
  });
});
