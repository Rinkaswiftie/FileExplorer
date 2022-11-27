import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {ContentPaneComponent} from './content-pane/content-pane.component';
import {NavigatorComponent} from './navigator/navigator.component';
import {ToolbarNavComponent} from './header/toolbar-nav/toolbar-nav.component';
import {ToolbarComponent} from './header/toolbar/toolbar.component';
import {SearchBarComponent} from './navigator/search-bar/search-bar.component';
import {DropdownListComponent} from './side-bar/dropdown-list/dropdown-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ListItemComponent} from './side-bar/dropdown-list/list-item/list-item.component';
import { FileFolderComponent } from './content-pane/file-folder/file-folder.component';
import { ContentSectionComponent } from './content-pane/content-section/content-section.component';
import {FormsModule} from '@angular/forms';

@NgModule({
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
    DropdownListComponent,
    ListItemComponent,
    FileFolderComponent,
    ContentSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
