import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {ContentPaneComponent} from './content-pane/content-pane.component';
import {NavigatorComponent} from './navigator/navigator.component';
import {ToolbarNavComponent} from './header/toolbar-nav/toolbar-nav.component';
import {ToolbarComponent} from './header/toolbar/toolbar.component';
import {SearchBarComponent} from './navigator/search-bar/search-bar.component';
import {FilePathComponent} from './navigator/file-path/file-path.component';
import {DropdownListComponent} from './side-bar/dropdown-list/dropdown-list.component';
import {ListItemComponent} from './side-bar/dropdown-list/list-item/list-item.component';
import {FileFolderComponent} from './content-pane/file-folder/file-folder.component';
import {ContentSectionComponent} from './content-pane/content-section/content-section.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SideBarComponent,
        ContentPaneComponent,
        NavigatorComponent,
        ToolbarNavComponent,
        ToolbarComponent,
        SearchBarComponent,
        FilePathComponent,
        DropdownListComponent,
        ListItemComponent,
        FileFolderComponent,
        ContentSectionComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FileExplorer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FileExplorer');
  });
});
