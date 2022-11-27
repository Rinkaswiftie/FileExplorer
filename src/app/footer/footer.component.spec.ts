import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {of} from 'rxjs';
import {CurrentTabService} from '../current-tab.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    const currentTab = jasmine.createSpyObj('CurrentTabService', ['getCountInTab']);
    currentTab.getCountInTab.and.returnValue(of(2));
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      providers: [{provide: CurrentTabService, useValue: currentTab}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update count based on input', () => {
    expect(component.itemCount).toEqual(2);
  });

  it('should display count on screen', () => {
    const text = fixture.nativeElement.querySelector('footer').innerText;
    expect(text).toEqual('2 items |');
  });
});
