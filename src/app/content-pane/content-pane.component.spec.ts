import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPaneComponent } from './content-pane.component';
import {ContentSectionComponent} from './content-section/content-section.component';
import {FileFolderComponent} from './file-folder/file-folder.component';
import {CurrentTabService} from '../current-tab.service';

describe('ContentPaneComponent', () => {
  let component: ContentPaneComponent;
  let fixture: ComponentFixture<ContentPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPaneComponent, ContentSectionComponent, FileFolderComponent ],
      providers: [CurrentTabService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
